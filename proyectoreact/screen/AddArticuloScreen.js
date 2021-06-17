// screens/AddArticuloScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';
import ArticuloScreen from './ArticuloScreen';

class AddArticuloScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('articulo');
    this.state = {
      nombre: '',
      descripcion: '',
      gramaje: '',
      precio: '',
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
        descripcion: this.state.descripcion,
        gramaje: this.state.gramaje,
        precio: this.state.precio,
      }).then((res) => {
        this.setState({
          nombre: '',
          descripcion: '',
          gramaje: '',
          precio: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ArticuloScreen')
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
              placeholder={'Nombre Articulo'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Descripcion'}
              value={this.state.descripcion}
              onChangeText={(val) => this.inputValueUpdate(val, 'descripcion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Gramaje'}
              value={this.state.gramaje}
              onChangeText={(val) => this.inputValueUpdate(val, 'gramaje')}
          />
        </View>
           <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Precio'}
              value={this.state.precio}
              onChangeText={(val) => this.inputValueUpdate(val, 'precio')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Agregar Articulo'
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

export default AddArticuloScreen;