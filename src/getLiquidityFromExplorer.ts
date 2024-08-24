import fetch, { Response } from 'node-fetch';
import { ethers } from 'ethers'

async function fetchLiquidity(): Promise<any> {
  const url = 'https://xexplorer.neo.org/api/v2/addresses/0x9955433D475Fd3AeCA02EAcF2A16feFA7dc1b446/tokens?type=ERC-20';
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    }
  };

  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData: any = await response.json();
    const data = rawData.items;
    console.log(data[0].token.symbol, ethers.utils.formatEther(data[0].value));
    console.log(data[1].token.symbol, ethers.utils.formatEther(data[1].value));
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
}

fetchLiquidity();
