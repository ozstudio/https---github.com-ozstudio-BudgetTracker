import { useContext,useEffect,useState } from 'react';
import {View,Text} from 'react-native';
import { ExpensesContext } from '../assets/store/expenses-context';
import { getDateMinusDays } from '../assets/utils/date';
import { fetchExpenses } from '../assets/utils/http';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadinOverlay from '../components/UI/LoadingOverlay';

function RecentExpenses() {
const [isFetching,setIsFetching] = useState(true);
const [error,setError]  = useState();


    const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses,setFetchedExpenses] = useState([]);

    useEffect(() => {
      
      async function getExpenses(){
      setIsFetching(true);
      try {
          const expenses = await fetchExpenses();
          expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses');
      }
       setIsFetching(false); 
      
      }
      getExpenses();
      
    }, [])
function errorHandler(){
  setError(null);
}


      if(error && !isFetching){
        return <ErrorOverlay 
        message = {error}
        onConfirm = {errorHandler}/>
        
      }
      
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