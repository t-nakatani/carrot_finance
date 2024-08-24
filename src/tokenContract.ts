import { ethers } from 'ethers';
import { provider } from './provider'
import { tokenContractABI } from './abis/tokenABI';

export async function getBalanceOf(contractAddress: string, tokenOwnerAddress: string) {
    const readContract = new ethers.Contract(contractAddress, tokenContractABI, provider);
    const balance = await readContract.balanceOf(tokenOwnerAddress)
    const balanceETH = ethers.utils.formatEther(balance);
    return balanceETH;
}
