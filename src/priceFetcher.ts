import { config } from './config'
import fetch, { Response } from 'node-fetch';

interface PriceData {
  [coinId: string]: number;
}

export async function fetchCoinGeckoPrice(coinIds: string[], vsCurrencies: string = 'usd'): Promise<PriceData> {
  const apiKey = config.COINGECKO_API_KEY;
  if (!apiKey) {
    throw new Error('COINGECKO_API_KEY is not set in .env file');
  }

  const stringIds = coinIds.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=${vsCurrencies}`;
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'x-cg-demo-api-key': apiKey
    }
  };

  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const priceData: PriceData = {};
    const data: any = await response.json();
    coinIds.forEach(coinId => {
      if (data[coinId] && data[coinId].usd !== undefined) {
        priceData[coinId] = data[coinId].usd;
      }
    });
    return priceData;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
}
