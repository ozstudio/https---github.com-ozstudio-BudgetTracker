import { useContext, useLayoutEffect } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import IconButton from '../components/UI/IconButton';
//import { GlobalStyles } from '../../ExpenseApp/assets/constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../assets/store/expenses-context';
import ExpenseForm from '../components/Manageexpense/ExpenseForm';
import { storeExpense } from '../assets/utils/http';

function ManageExpense({route,navigation}) {
    const context = useContext(ExpensesContext);


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


    function deleteExpenseHandler(){
        context.deleteExpense(editedExpensedId);
        navigation.goBack();

    }

    function cancelHandler(){
       
        navigation.goBack();
    }
    function confirmHandler(expenseData){
        if  (isEditing){
            context.updateExpense(editedExpensedId,
                expenseData);
        }
        else {
             storeExpense(expenseData);
             context.addExpense(expenseData)
        }
        navigation.goBack();
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