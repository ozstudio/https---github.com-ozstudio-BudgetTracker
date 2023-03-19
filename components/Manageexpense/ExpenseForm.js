import { useState } from "react";
import { StyleSheet, TextInput, View,Text,Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
//import { GlobalStyles } from "../../assets/constants/styles";

function ExpenseForm({
    submitButtonLabel,
    onCancel,
    onSubmit,
    defaultValues}){
 const [inputs,setInputs]  
 =   useState({
    amount:{
        value: defaultValues ? 
    defaultValues.amount.toString() : '',
    isValid: true},

    date: {value: defaultValues? 
    defaultValues.date
    .toISOString().slice(0,10) : '',
    isValid:true},

    description:{value: defaultValues ? 
    defaultValues.description : '',
    isValid:true}
 })

 function submitHandler(){
    const expenseData = {
        amount: +inputs.amount.value, // + contert to number
        date:new Date(inputs.date.value),
        description:inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount)
    && expenseData.amount > 0;
   // console.log(expenseData);
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description
    .trim().length > 0;
    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
       // Alert.alert('Invalid input','Please check your inputs');
       setInputs((curInputs)=>{
        return {
            amount:{value:curInputs.amount.value,
            isValid:amountIsValid},

            date:{value:curInputs.date.value,
                isValid:dateIsValid},

            description:{value:curInputs.description.value,
                 isValid:descriptionIsValid}
        }

       })
        return;

    }


    onSubmit(expenseData);
 }
  
   function inputChangerHandler(inputIdentifier,
    enteredValue) {
    setInputs((curInputs)=>{
        return {
            ...curInputs,
            [inputIdentifier] : {value:enteredValue,isValid:true}
        }
    }

    );
   }
   const formIsInvalid = 
     !inputs.amount.isValid 
  || !inputs.date.isValid
  || !inputs.description.isValid


    return <View style ={styles.row}>
        <Text style = {styles.title}>Your expense</Text>

        <View style = {styles.inputsRow}>

      
        <Input 
        style={styles.rowInput}
        label='Amount' 
        invalid ={!inputs.amount.isValid}
        textInputConfig={{
            keyboardType:'decimal-pad',
            onChangeText:inputChangerHandler.bind(
                this,
                'amount',
               
            ),
            value:inputs.amount.value
        }} />
        <Input
         style={styles.rowInput}
        label='Date'
        invalid ={!inputs.date.isValid}
         textInputConfig={{
            placeHolder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangerHandler.bind(
                this,
                'date',
               
            ),
            value:inputs.date.value
        }}/>
      
          </View>
        <Input label='Description'
         invalid ={!inputs.description.isValid}
        textInputConfig={{
            multiline:true,
            autoCorrect:false,
            onChangeText:inputChangerHandler.bind(
                this,
                'description',
               
            ),
            value:inputs.description.value
        }}/>
         {formIsInvalid && <Text style={styles.errorText}>
        Invalid input values
        </Text>}
             <View style ={styles.buttonsContainer}>
                <Button
                 mode ='flat' 
                 onPress ={onCancel}
                 style = {styles.button}>
                    Cancel</Button>
                   
                    <Button
                    onPress={submitHandler}
                    style = {styles.button}
                    >{submitButtonLabel}</Button>

            </View>


    </View>

}
export default ExpenseForm;

const styles = StyleSheet.create({
    errorText:{
        textAlign:'center',
     //   color:GlobalStyles.colors.error500,
        margin:8
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
    row:{
        marginTop:40
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24

    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    }

})