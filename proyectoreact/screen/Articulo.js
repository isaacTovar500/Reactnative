// components/Articulo.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';

export default class Articulo extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {this.state.displayName}
        </Text>

        <View style={styles.button}>
        <Button
          color="#3740FE"
          title="Agregar Articulo"
          onPress={() => this.props.navigation.navigate('AddArticuloScreen')}
        />
      </View>
         <View style={styles.button}>
        <Button
          color="#3740FE"
          title="Lista de Articulos"
          onPress={() => this.props.navigation.navigate('ArticuloScreen')}
        />
      </View>
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20 
  },
  button: {
    marginBottom: 7,
  },
});