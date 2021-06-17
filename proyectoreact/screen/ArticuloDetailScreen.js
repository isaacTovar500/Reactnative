// screens/ArticuloDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';

class ArticuloDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      descripcion: '',
      gramaje: '',
      precio: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('articulo').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          nombre: user.nombre,
          descripcion: user.descripcion,
          gramaje: user.gramaje,
          precio: user.precio,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('articulo').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      gramaje: this.state.gramaje,
      precio: this.state.precio,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        descripcion: '',
        gramaje: '',
        precio: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ClienteScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const dbRef = firebase.firestore().collection('articulo').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('ClienteScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Cliente',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
            title='Update'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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
  },
  button: {
    marginBottom: 7, 
  }
})

export default ArticuloDetailScreen;