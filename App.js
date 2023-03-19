import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './assets/constants/styles';
import {Ionicons} from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './assets/store/expenses-context';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpenseOverview() {
  return (<BottomTabs.Navigator
  screenOptions={({navigation})=>({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
    headerRight:({tintColor})=>
       <IconButton icon ="add"
       size ={24}
       color ={tintColor}
       onPress ={()=>{
        navigation.navigate('ManageExpense');
       }}/>
    
  })}>
        <BottomTabs.Screen 
        options={{
          title:'Recent expenses',
          tabBarLabel:'Recent',
          tabBarIcon:({color,size})=>
          (<Ionicons 
            name="hourglass" 
            size ={size}
            color ={color}
          />)
        }}
        name= "RecentExpenses" 
        component={RecentExpenses}/>
        

        <BottomTabs.Screen
         options={{
          title:'All Expenses',
          tabBarLabel:'All Expenses',
          tabBarIcon:({color,size})=>
          (<Ionicons 
            name="calendar" 
            size ={size}
            color ={color}
          />)
        }}
         name= "AllExpenses"
          component={AllExpenses}/>
          
         </BottomTabs.Navigator>)
  
}


export default function App() {
  return (
   <> 
   <StatusBar style="auto" />
   <ExpensesContextProvider>

   
   <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white'
    }}>  
    <Stack.Screen name="ExpenseOverview" component={ExpenseOverview}
    options ={{
      headerShown:false
    }}/>
    <Stack.Screen 
    name="ManageExpense" 
    component={ManageExpense}
    options= {{
      presentation:'modal'
    }}
    />
  
    </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
   </>
  );
}

