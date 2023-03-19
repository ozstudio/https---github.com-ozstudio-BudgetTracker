import { useContext,useEffect,useState } from 'react';
import {View,Text} from 'react-native';
import { ExpensesContext } from '../assets/store/expenses-context';
import { getDateMinusDays } from '../assets/utils/date';
import { fetchExpenses } from '../assets/utils/http';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadinOverlay from '../components/UI/LoadingOverlay';

function RecentExpenses() {
const [isFetching,setIsFetching] = useState(true);


    const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses,setFetchedExpenses] = useState([]);

    useEffect(() => {
      setIsFetching(true);
      async function getExpenses(){
       const expenses = await fetchExpenses();
       setIsFetching(false); 
       expensesCtx.setExpenses(expenses);
      }
      getExpenses();
      
    }, [])

if(isFetching){
 return <LoadinOverlay/>
}

  //const recentExpenses = [];
    const recentExpenses = expensesCtx
    .expenses
    .filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);
  
      return (expense.date >= date7DaysAgo) && (expense.date <= today);
    });
  
    return (
      <ExpensesOutput 
      expenses={recentExpenses} 
      expensesPeriod="Last 7 Days"
      fallbackText="Empty for 7 days" />
    );
  }
  
  export default RecentExpenses;