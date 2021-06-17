// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebase';

class EmpleadoDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      apellidoPaterno: '',
      apellidoMaterno: '',
      nombre: '',
      direccion: '',
      telefono: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Empleado').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          apellidoPaterno: user.apellidoPaterno,
          apellidoMaterno: user.apellidoMaterno,
          nombre: user.nombre,
          direccion: user.direccion,
          telefono: user.telefono,
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
    const updateDBRef = firebase.firestore().collection('Empleado').doc(this.state.key);
    updateDBRef.set({
      apellidoPaterno: this.state.apellidoPaterno,
      apellidoMaterno: this.state.apellidoMaterno,
      nombre: this.state.nombre,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
    }).then((docRef) => {
      this.setState({
        key: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombre: '',
        direccion: '',
        telefono: '',
        isLoading: false,
      });
      this.props.navigation.navigate('EmpleadoScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const dbRef = firebase.firestore().collection('Empleado').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('EmpleadoScreen');
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
              placeholder={'Apellido Paterno'}
              value={this.state.apellidoPaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoPaterno')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Apellido Materno'}
              value={this.state.apellidoMaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoMaterno')}
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
               multiline={true}
              numberOfLines={4}
              placeholder={'Dirección'}
              value={this.state.direccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'direccion')}
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

export default EmpleadoDetailScreen;