// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5, Foundation } from "react-native-vector-icons";
import RegistrarPizza from "../RegistrarPizza";
import Pizza from "../Pizza";
import Admin from "../Admin";
import DetalleProducto from "../DetalleProducto";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const Tab = createBottomTabNavigator();

  function Home() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#1C252C",
            color: "",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "RinRinPizza") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
              return <FontAwesome5 name="pizza-slice" size={24} color="red" />;
            } else if (route.name === "RinRinRegistrar") {
              iconName = focused ? "ios-list-box" : "ios-list";
              return <FontAwesome5 name="kiwi-bird" size={24} color="red" />;
            } else if (route.name === "Kushiroo Sushi") {
              return <Foundation name="database" size={24} color="red" />;
            } else if (route.name === "Pedidos") {
              return (
                <Ionicons
                  name="ios-reorder-three-sharp"
                  size={24}
                  color="red"
                />
              );
            }

            // You can return any component that you like here!
          },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen name="Feed" component={DetalleProducto} />
        <Tab.Screen name="Messages" component={Pizza} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, headerStyle:{backgroundColor: '#1C252C'} }}
        />
        <Stack.Screen name="RinRinPizza" component={Pizza} options={{ headerStyle: {
            backgroundColor: '#f4511e',
          },}}/>
        {/* <Tab.Screen  name="RinRinPizza" component={Pizza} />
        <Tab.Screen  name="RinRinRegistrar" component={RegistrarPizza} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
