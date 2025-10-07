// Sample sandbox data
const sandboxAccounts = [
  { name: "Checking", balance: 1500 },
  { name: "Savings", balance: 3200 },
  { name: "Credit Card", balance: -200 }
];

const sandboxTransactions = [
  { date: "2025-10-01", description: "Starbucks", amount: -5.5 },
  { date: "2025-10-03", description: "Salary", amount: 3000 },
  { date: "2025-10-05", description: "Rent", amount: -1200 }
];

// Fetch accounts
document.getElementById('fetchAccounts').addEventListener('click', () => {
  document.getElementById('accountsResult').textContent = JSON.stringify(sandboxAccounts, null, 2);
});

// Fetch transactions
document.getElementById('fetchTransactions').addEventListener('click', () => {
  document.getElementById('transactionsResult').textContent = JSON.stringify(sandboxTransactions, null, 2);
});
