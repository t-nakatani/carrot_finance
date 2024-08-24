export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
export function getISOTimestamp(): string {
    return new Date().toISOString();
}
