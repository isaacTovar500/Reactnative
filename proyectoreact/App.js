// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';

import AddUserScreen from './screen/AddUserScreen';
import UserScreen from './screen/UserScreen';
import UserDetailScreen from './screen/UserDetailScreen';

import AddClienteScreen from './screen/AddClienteScreen';
import ClienteScreen from './screen/ClienteScreen';
import ClienteDetailScreen from './screen/ClienteDetailScreen';

import Cliente from './screen/Cliente';
import Usuario from './screen/Usuario';
import Empleado from './screen/Empleado';
import Articulo from './screen/Articulo';
import Proveedor from './screen/Proveedor';

import AddEmpleadoScreen from './screen/AddEmpleadoScreen';
import EmpleadoScreen from './screen/EmpleadoScreen';
import EmpleadoDetailScreen from './screen/EmpleadoDetailScreen';

import AddArticuloScreen from './screen/AddArticuloScreen';
import ArticuloScreen from './screen/ArticuloScreen';
import ArticuloDetailScreen from './screen/ArticuloDetailScreen';

import AddProveedorScreen from './screen/AddProveedorScreen';
import ProveedorScreen from './screen/ProveedorScreen';
import ProveedorDetailScreen from './screen/ProveedorDetailScreen';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      />
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Users List' }}
      />
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
          <Stack.Screen 
        name="AddClienteScreen" 
        component={AddClienteScreen} 
        options={{ title: 'Agregar Cliente' }}
      />
      <Stack.Screen 
        name="ClienteScreen" 
        component={ClienteScreen} 
        options={{ title: 'Cliente List' }}
      />
      <Stack.Screen 
       name="ClienteDetailScreen" 
       component={ClienteDetailScreen} 
       options={{ title: 'Cliente Detail' }}
      />
      <Stack.Screen 
        name="AddEmpleadoScreen" 
        component={AddEmpleadoScreen} 
        options={{ title: 'Agregar Empleado' }}
      />
      <Stack.Screen 
        name="EmpleadoScreen" 
        component={EmpleadoScreen} 
        options={{ title: 'Empleado List' }}
      />
      <Stack.Screen 
       name="EmpleadoDetailScreen" 
       component={EmpleadoDetailScreen} 
       options={{ title: 'Empleado Detail' }}
      />
        <Stack.Screen 
        name="AddArticuloScreen" 
        component={AddArticuloScreen} 
        options={{ title: 'Agregar Articulo' }}
      />
      <Stack.Screen 
        name="ArticuloScreen" 
        component={ArticuloScreen} 
        options={{ title: 'Articulo List' }}
      />
      <Stack.Screen 
       name="ArticuloDetailScreen" 
       component={ArticuloDetailScreen} 
       options={{ title: 'Articulo Detail' }}
      />
            <Stack.Screen 
        name="AddProveedorScreen" 
        component={AddProveedorScreen} 
        options={{ title: 'Agregar Proveedor' }}
      />
      <Stack.Screen 
        name="ProveedorScreen" 
        component={ProveedorScreen} 
        options={{ title: 'Proveedor List' }}
      />
      <Stack.Screen 
       name="ProveedorDetailScreen" 
       component={ProveedorDetailScreen} 
       options={{ title: 'Proveedor Detail' }}
      />
      <Stack.Screen 
       name="Cliente" 
       component={Cliente} 
       options={{ title: 'Cliente' }}
      />
      <Stack.Screen 
       name="Usuario" 
       component={Usuario} 
       options={{ title: 'Usuario' }}
      />
      <Stack.Screen 
       name="Empleado" 
       component={Empleado} 
       options={{ title: 'Empleado' }}
      />
      <Stack.Screen 
       name="Articulo" 
       component={Articulo} 
       options={{ title: 'Articulo' }}
      />
      <Stack.Screen 
       name="Proveedor" 
       component={Proveedor} 
       options={{ title: 'Proveedor' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
