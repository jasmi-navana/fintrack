export const getTransactions = async () => {
  const response = await fetch(
    "http://localhost:5000/api/transactions"
  );

  return response.json();
};