// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, Foundation } from 'react-native-vector-icons';
import RegistrarPizza from '../RegistrarPizza';
import Pizza from '../Pizza';
import Admin from '../Admin';



function StackNavigator() {
  
const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
       <Tab.Navigator
        screenOptions={({ route }) => ({
      tabBarStyle:{
        backgroundColor: 'black',
        color: '',
      },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'RinRinPizza') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
                return  <FontAwesome5 name="pizza-slice" size={24} color="red" />;
            } else if (route.name === 'RinRinRegistrar') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
              return  <FontAwesome5 name="kiwi-bird" size={24} color="red" />
            }else if (route.name === 'Kushiroo Sushi'){
              return <Foundation name="database" size={24} color="red" />
            }else if (route.name === 'Pedidos'){
              return <Ionicons name="ios-reorder-three-sharp" size={24} color="red" />
            }

            // You can return any component that you like here!
           
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'white'
        })}
      >
           <Tab.Screen  name="RinRinPizza" component={Admin} />
        {/* <Tab.Screen  name="RinRinPizza" component={Pizza} />
        <Tab.Screen  name="RinRinRegistrar" component={RegistrarPizza} /> */}
       
    

        
      </Tab.Navigator>

    </NavigationContainer>
  );
}

export default StackNavigator;