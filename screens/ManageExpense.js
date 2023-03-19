import { useContext, useLayoutEffect,useState } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import IconButton from '../components/UI/IconButton';
//import { GlobalStyles } from '../../ExpenseApp/assets/constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../assets/store/expenses-context';
import ExpenseForm from '../components/Manageexpense/ExpenseForm';
import { storeExpense,updateExpense,deleteExpense } from '../assets/utils/http';
import LoadinOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route,navigation}) {
    const context = useContext(ExpensesContext);
    const [IsSubmitting,setIsSubmitting] = useState(false);
    const [error,setError] = useState();

    const editedExpensedId = route.params?.expenseId;
    console.log("expense ID:" + editedExpensedId);
    const isEditing = !!editedExpensedId;


    const selectedExpense = context.expenses
    .find(expense => expense.id === editedExpensedId);

    useLayoutEffect (()=>{
        navigation.setOptions({
        title : isEditing ? 'Edit expense' : 'Add expense'

    })

    },[navigation,isEditing])


    async function deleteExpenseHandler(){
       
        setIsSubmitting(true);
        try {
              await  deleteExpense(editedExpensedId);
              context.deleteExpense(editedExpensedId);
              navigation.goBack();
      
        } catch (error) {
            setError('Try again later!');
            setIsSubmitting(false);
        }
       
    }

    function cancelHandler(){
       
        navigation.goBack();
    }
   async function confirmHandler(expenseData){
         setIsSubmitting(true);
         try {
             if  (isEditing){
            context.updateExpense(editedExpensedId,
                expenseData);
                updateExpense(editedExpensedId,expenseData);
        }
        else {
        const id = await storeExpense(expenseData);
             context.addExpense({...expenseData,id:id});
             navigation.goBack();
        }
 
         } catch (error) {
            setError('Could not save data');
         }
       setIsSubmitting(false);
       
    }
function errorHandler(){
    setError(null);
}


    if(error && !IsSubmitting){
        return <ErrorOverlay message={error}
        onConfirm={errorHandler}/>
    }
    
    if(IsSubmitting){
      return  <LoadinOverlay/>
    }
    return <View style = {styles.container}> 
            <ExpenseForm
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit = {confirmHandler}
            onCancel = {cancelHandler}
            defaultValues = {selectedExpense}/>
       
    
       {isEditing && (<View
       style = {styles.deleteContainer}><IconButton 
       icon ='trash'
      // color ={GlobalStyles.colors.error500}
       size = {36}
       onPress ={deleteExpenseHandler}
       /></View>)}
    </View>
}
export default ManageExpense;
const styles =StyleSheet.create({
    container :{
        flex:1,
        padding:24,
      //  backgroundColor:GlobalStyles.colors.primary800
    },
   
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderColor:'white',
        alignItems:'center'
    }

});