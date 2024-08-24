import { provider } from './provider';
import { Asset } from './types';

export async function getLiquidity(asset: Asset, ownerAddress: string) {
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
}
