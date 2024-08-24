import { fetchCoinGeckoPrice } from './priceFetcher';
import { getBalanceOf } from './tokenContract'
import { xBNB, wGAS10, xBNB_wGAS10Pool } from './const';
import { sleep, getISOTimestamp } from './utils';

async function checkLiquidity() {
  try {
    console.log(`[${getISOTimestamp()}]`);

    const coinIds= ['gas','binancecoin','matic-network'];
    const priceData = await fetchCoinGeckoPrice(coinIds);
    console.log(priceData);

    const xBnbBalance = await getBalanceOf(xBNB, xBNB_wGAS10Pool);
    const wGasBalance = await getBalanceOf(wGAS10, xBNB_wGAS10Pool);
    console.log(`${xBnbBalance} - ${wGasBalance}`);

    const xBNBValue = parseFloat(xBnbBalance) * priceData.binancecoin;
    const wGASValue = parseFloat(wGasBalance) * priceData.gas;
    console.log(`xBNB: ${xBNBValue} / wGAS: ${wGASValue} = ${xBNBValue / wGASValue}\n`);

    // const myAddress = config.MY_ADDRESS as string;
    // const myBalance = await getBalanceOf(xBNB, myAddress);

  } catch (error) {
    console.error("Error in checkLiquidity function:", error);
  }
}

async function main() {
  while(1) {  
    await checkLiquidity();
    await sleep(30 * 1000);
  }
}

main();
