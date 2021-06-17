// screens/AddClienteScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';
import ClienteScreen from './ClienteScreen';

class AddClienteScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Cliente');
    this.state = {
      apellidoMaterno: '',
      apellidoPaterno: '',
      nombre: '',
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
        apellidoMaterno: this.state.apellidoMaterno,
        apellidoPaterno: this.state.apellidoPaterno,
        nombre: this.state.nombre,
        telefono: this.state.telefono,
      }).then((res) => {
        this.setState({
          apellidoMaterno: '',
          apellidoPaterno: '',
          nombre: '',
          telefono: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ClienteScreen')
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
              placeholder={'Apellido Materno'}
              value={this.state.apellidoMaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoMaterno')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Apellido Paterno'}
              value={this.state.apellidoPaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoPaterno')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
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
            title='Agregar Cliente'
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

export default AddClienteScreen;