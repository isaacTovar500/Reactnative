// screens/ProveedorScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../database/firebase';

class ProveedorScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('proveedor');
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = ([]);
    querySnapshot.forEach((res) => {
      const { nombre, direccion, email, telefono  } = res.data();
      userArr.push({
        key: res.id,
        res,
        nombre,
        direccion,
        email,
        telefono,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
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
      <Button
        onPress={() => this.props.navigation.navigate("AddProveedorScreen")}
        title="Create Proveedor"
      />
      {this.state.userArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("ProveedorDetailScreen", {
                userkey: item.key,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Subtitle>{item.telefono}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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

export default ProveedorScreen;