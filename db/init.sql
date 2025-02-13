CREATE TABLE IF NOT EXISTS "warehouseList" (
  "warehouseName" VARCHAR(255) PRIMARY KEY,
  "boxDeliveryAndStorageExpr" BIGINT,
  "boxDeliveryBase" VARCHAR(255),
  "boxDeliveryLiter" VARCHAR(255),
  "boxStorageBase" VARCHAR(255),
  "boxStorageLiter" VARCHAR(255)
);
