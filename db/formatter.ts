const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NumberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
});

export function formatNumber(number: number) {
  return NumberFormatter.format(number);
}
