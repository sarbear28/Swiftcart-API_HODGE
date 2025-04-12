require('dotenv').config();

module.exports = {
  "development": {
    "username": "neondb_owner",
    "password": "npg_8YkopjznAwq6",
    "database": "neondb",
    "host": "ep-nameless-rain-a5egw714-pooler.us-east-2.aws.neon.tech",
    "dialect": "postgres",
    "port": 5432,
    "dialectOptions": {
      ssl: {
        rejectUnauthorized: false, 
      },
    },
    "url": "postgresql://neondb_owner:npg_8YkopjznAwq6@ep-nameless-rain-a5egw714-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"  
  }
};
