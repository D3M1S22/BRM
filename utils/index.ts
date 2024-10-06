export function cropWalletAddress(address:any) {
    if (!address || address.length < 10) return address; // Return the original if it's too short
    return address.slice(0, 6) + '...' + address.slice(-4);
}
