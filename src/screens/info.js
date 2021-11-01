import React, {useEffect, useState} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";
import { Configuration } from "../Configuration";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const profiles = [
  {
    email: null,
    name: 'hi',
    surname: 'there',
    gender: null,
    birth: null,
    weight: null,
    height: null,
    fam: null,
    rok1: null,
    rok2: null,
    rok3: null,
    act1: null,
    act2: null,
    act3: null,
    act4: null,
    uid: null
  }
]

const info = () => {
  const[profile, setProfile] = useState(null);
  const[loading, setLoading] = useState(true);

  const getuser = async() => {
    try{
      const list = [];
      await firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(user => {
            const {email, name, surname, gender, height, weight , birth, fam, rok1, rok2, rok3, act1, act2, act3, act4, uid} = user.data();
            list.push({
              email: email,
              name: name,
              surname: surname,
              gender: gender,
              birth: birth,
              weight: weight,
              height: height,
              fam: fam,
              rok1: rok1,
              rok2: rok2,
              rok3: rok3,
              act1: act1,
              act2: act2,
              act3: act3,
              act4: act4,
              uid: uid
            });
          });
        });

        setProfile(list);

        if (loading) {
          setLoading(false);
        }
      } catch(e) {
        console.log(e);
      }
    };


  useEffect(() => {
    getuser();
  }, []);

  return (

    <FlatList
    data={profile}
    renderItem={({item}) => (
      <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.uid}</Text>
          <Text>User Name: {item.name}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id}
  />
      
  );
};

const styles = StyleSheet.create({
    InputContainer: {
      width: AppStyles.textInputWidth.main,
      marginTop: 30,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: AppStyles.color.grey,
      borderRadius: AppStyles.borderRadius.main
    },
    check: {
        flexDirection: "row", 
        padding: 5
    },
    container: {
        backgroundColor: "white",
        flex: 1,
      },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: AppStyles.color.tint,
      marginTop: 20,
      marginBottom: 20
    },
    leftTitle: {
      alignSelf: "stretch",
      textAlign: "left",
      marginLeft: 20
    },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  },
  tras:{
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 120,
  },
  rectangle:{
    padding: 5,
    width: 200,
    height: 240,
    backgroundColor: AppStyles.color.tint,
    marginHorizontal: 5
    
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    alignItems: "center",
    justifyContent: 'center',
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
  });
  
  const mapStateToProps = state => ({
    user: state.auth.user
  });
  
  export default info;