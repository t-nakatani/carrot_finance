import dotenv from 'dotenv';

dotenv.config();

export const config = {
  RPC_URL: process.env.RPC_URL,
  WS_URL: process.env.WS_URL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  MY_ADDRESS: process.env.MY_ADDRESS,
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
};
