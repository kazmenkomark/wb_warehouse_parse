module.exports = {
  gsaConfig: {
    sheets: [
      {
        spreadsheetId: '1M6f-Pcswhpj8LHb_0weh4lEGKgA6Or_9_icF__TEdAs',
        sheetName: 'stocks_coefs'
      },
      // other sheets
    ],
    // Credentials for logging into the Google service account.
    credentials: {
      client_email: 'wb-parser@main-beanbag-450022-p7.iam.gserviceaccount.com',
      private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvwKcKS+C2FDeW\n4VWNbUh0cradPdUM2yoJA3K5hqZ+TF4HekFM4eAhOD3N34q8ITkLYdbsn1+JFciR\nLZpnibRk8zMN/TB76asmP5AgYEVQsKP8R1OvWJp3ae62HUn8lry67iOOxyH2MI4b\nLMlxTRi81necpC3YXIAr9tUvj2/li5DI/CmRR5xYSavAK9eB4LPoFmF9pV1Ne+ow\nIDKgvzHxL3GLV6QGKczG72PSu0VksQWyxDRL+MxEI48dpfyF7fBuLxqgWaGdWbqI\nP07HG9KYeO7IwjvDhCs/e3Zw9m3ImxehEiFiQMRP9weylcFVXyH0anJp3YE5Ol/V\nTKb5qGYLAgMBAAECggEAKDjQYbhczH7S/ApE0JGWl+Pa7CCG/iK4O4jY/CGXP+dN\nS6vMfwJgj2m2J0QGFakKy5KQI+YTcKWWGbeUkyZ+LO5FnGl565neC+pXGzm9E0rh\ntK5ENihybWrGcVJBqPd8aNFwPNBQ8u1I0GpPDcmFpE324NfoEBCXWrhqMLDEfIUy\nqxW5N7SMhqqgNjRP5iD5ddRNRPXImJ8HU4riQMtK8qYVAUj6rcb3c50e5mDZBDlg\n3uiyUcWelYwdioZADAdPMUZS9e4fiI91LeNUnD1rzbamFaoMV2a7avVvkAb70wvQ\nKsyMENwqGn7EztNUjikrUlPiK/1af4eQz6nI3R3MqQKBgQD2HPXlUmRUFN2ug5Pd\nl2sHtxk1YUKYIX5dcb6jfz2V7raZIdMaEfx43L/y6xC+WPR6vSQjAwIByrQLVXci\n/IQrOwNSutWSCG6//pcTwOsl3Y+L8d/0I8cbY+xzkLzvjEGne32ru10ic685kneQ\n4mnxZmfxs8r3pyxmI9ckef+IiQKBgQC20Bmva0/vgz8Vms1Y5wFmvlYSPUIz6b72\nAMyQcS5Ae0OxGyGpk78ughEnKTrkxF3sM53PgzgsfJTQ8hkT7ERg1h9cDeGSEPiR\nzN9LDNik0z5SXyFDEU07qQ5KK81z7QnwQGYys+q96wv74CkOKKnxrMWjEECy8j4I\nuf3XyoBs8wKBgQDCuptcvNohJPlZsUX3mGzZB+hsMe5NDIM9UFg0aOLDlMLpWrf6\n8qw+vPsrKw5ubVfTHYBQK3sVC9t09ER1bDLvOZwhgy6kgwON6dSDjqr/pNSFN/Wo\n5/4MD/3wWl8DcogoCi+fB3pjXgEQnnD4NAz7Mbmgpk87sAwTLNx3QggLcQKBgDWn\nCYLEOeePW1pZ3l5zHaQrxFMCC4X02giU33Sc4vgltQ4raku8guWBYstdfF1bjD0g\nQPaACmJ0BbD0/IsuUjshXH7FzCf0Nx+DQx1hnctx+95s8PQgBcy2puz5wgh9zubl\n35iN2Rz3+MJpXWM8Z/P3wuFCidp64d3pyCgm1F4lAoGBAOFaL7hyVJk5pXk51t1j\n/63xUm/ylZ/sydyE7z/9YTNY9HpWhROx6UnussaA+Vi/lQ0sntlRXBHI/ZSfg+lG\nHPdJ1Uib3tpjxLw6ThhlXuGJ5QdQqXWxHJL73sFMtrrCmHnw/MQ299buh82MkiiL\nDkuUyMDZfukDSl0CcBQ1dMsu\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n')
    }
  },
  wbConfig: {
    wb_key: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQxMDE2djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTc0NjA2ODAxNywiaWQiOiIwMTkyZGRlYS1mOWU2LTcxNzItODk0Ny1iMjE1Y2I5MmU5NDgiLCJpaWQiOjQ1OTExNjA5LCJvaWQiOjExMzA0NiwicyI6MTA3Mzc0MTgzMiwic2lkIjoiOTMyYzE3NmEtNTA4NS01YzZmLWJjMzMtNGU4NGNkZjU4ZDdlIiwidCI6ZmFsc2UsInVpZCI6NDU5MTE2MDl9.l2C-kGr-1YptJ5iyp_q1RYSxDOgENHXfGepnmo709g2UsGDnT90NnBt5K-nVLVH14XaEFi81dcmeZvF6qz-oxQ'
  },

  knexConfig: {
    development: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'mydb'
      },
      migrations: {
        directory: './migrations'
      }
    }
  }
}