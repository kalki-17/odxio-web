document.getElementById('fetchData').addEventListener('click', () => {
  // Example placeholder for Open Banking API call
  const exampleData = {
    accounts: [
      { name: 'Checking', balance: 1500 },
      { name: 'Savings', balance: 3200 }
    ]
  };
  
  document.getElementById('result').textContent = JSON.stringify(exampleData, null, 2);
});
