export const CURRENCY = {
  symbol: "Rs.",
  code: "PKR",
};

export function formatPrice(price: number): string {
  return `${CURRENCY.symbol} ${price.toLocaleString()}`;
}
