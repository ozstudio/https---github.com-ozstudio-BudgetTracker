import axios from 'axios';

export function storeExpense(expenseData){
  axios
  .post('https://react-native-expense-efeef-default-rtdb.firebaseio.com/expenses.json',
  expenseData);
}