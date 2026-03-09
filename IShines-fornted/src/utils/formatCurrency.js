// Utility to format numbers as USD currency
export default function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
