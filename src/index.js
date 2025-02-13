const { knexConfig, gsaConfig, wbConfig } = require('../config');

const knex = require('knex')(knexConfig.development);
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const https = require('https');

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

// Delay helper
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getWBData = async (key) => {
  // Calculate current date in YYYY-MM-DD format
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];

  const options = {
    hostname: 'common-api.wildberries.ru',
    path: `/api/v1/tariffs/box?date=${dateStr}`,
    method: 'GET',
    headers: { 'Authorization': key }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const dataJson = JSON.parse(data);
          resolve(dataJson.response.data.warehouseList);
        } catch (error) {
          reject(new Error('JSON parse error: ' + error.message));
        }
      });
    });
    req.on('error', error => reject(error));
    req.end();
  });
};

const updateDB = async (key) => {
  try {
    const warehouseList = await getWBData(key);
    // Perform UPSERT: update only changed rows based on warehouseName
    await knex('warehouseList')
      .insert(warehouseList)
      .onConflict('warehouseName')
      .merge({
        boxDeliveryAndStorageExpr: knex.raw('EXCLUDED."boxDeliveryAndStorageExpr"'),
        boxDeliveryBase: knex.raw('EXCLUDED."boxDeliveryBase"'),
        boxDeliveryLiter: knex.raw('EXCLUDED."boxDeliveryLiter"'),
        boxStorageBase: knex.raw('EXCLUDED."boxStorageBase"'),
        boxStorageLiter: knex.raw('EXCLUDED."boxStorageLiter"')
      })
      .whereRaw(`
        "warehouseList"."boxDeliveryAndStorageExpr" IS DISTINCT FROM EXCLUDED."boxDeliveryAndStorageExpr"
        OR "warehouseList"."boxDeliveryBase" IS DISTINCT FROM EXCLUDED."boxDeliveryBase"
        OR "warehouseList"."boxDeliveryLiter" IS DISTINCT FROM EXCLUDED."boxDeliveryLiter"
        OR "warehouseList"."boxStorageBase" IS DISTINCT FROM EXCLUDED."boxStorageBase"
        OR "warehouseList"."boxStorageLiter" IS DISTINCT FROM EXCLUDED."boxStorageLiter"
      `);
    console.log('warehouseList updated in DB');
  } catch (error) {
    console.error('DB error:', error);
  }
};

const updateSheets = async (gsaConfig) => {
  try {
    const rows = await knex('warehouseList').select('*').orderBy('boxDeliveryAndStorageExpr');
    // Add header row
    rows.unshift({
      warehouseName: 'warehouse name',
      boxDeliveryAndStorageExpr: 'box delivery and storage expr',
      boxDeliveryBase: 'box delivery base',
      boxDeliveryLiter: 'box delivery liter',
      boxStorageBase: 'box storage base',
      boxStorageLiter: 'box storage liter'
    });
    for (const sheet of gsaConfig.sheets) {
      const auth = new JWT({
        email: gsaConfig.credentials.client_email,
        key: gsaConfig.credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const sheetsApi = google.sheets({ version: 'v4', auth });
      const values = rows.map(row => Object.values(row));
      const resource = { values };
      await sheetsApi.spreadsheets.values.update({
        spreadsheetId: sheet.spreadsheetId,
        range: `${sheet.sheetName}!A1:${String.fromCharCode(65 + values[0].length - 1)}${values.length}`,
        valueInputOption: 'RAW',
        resource
      });
      console.log('Data written to Google Sheets');
    }
  } catch (error) {
    console.error('Sheets update error:', error);
  }
};

const dbUpdate_loop = async () => {
  while (true) {
    await updateDB(wbConfig.wb_key);
    await sleep(DAY);
  }
};

const sheetsUpdate_loop = async () => {
  while (true) {
    await updateSheets(gsaConfig);
    await sleep(HOUR);   
  }
};

sheetsUpdate_loop();
dbUpdate_loop();
