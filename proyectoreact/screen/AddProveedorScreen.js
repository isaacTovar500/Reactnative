// screens/AddProveedorScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';
import ProveedorScreen from './ArticuloScreen';

class AddProveedorScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('proveedor');
    this.state = {
      nombre: '',
      direccion: '',
      email: '',
      telefono: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        direccion: this.state.direccion,
        email: this.state.email,
        telefono: this.state.telefono,
      }).then((res) => {
        this.setState({
          nombre: '',
          direccion: '',
          email: '',
          telefono: '',
          isLoading: false,
        });
        this.props.navigation.navigate('proveedorScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre Proveedor'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Direccion'}
              value={this.state.direccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'direccion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
           <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Telefono'}
              value={this.state.telefono}
              onChangeText={(val) => this.inputValueUpdate(val, 'telefono')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agregar Proveedor'
            onPress={() => this.storeUser()} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddProveedorScreen;