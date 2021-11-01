import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../../AppStyles";
import { Configuration } from "../../Configuration";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Screening Data",
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fam: "",
    };
  }

  componentDidMount() {
    this.authSubscription = auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
  }
  componentWillUnmount() {
    this.authSubscription && this.authSubscription();
  }
  onYes = () => {
      const { navigation } = this.props;
      const data = {
        fam: 'yes',
      };
      user_uid = user_uid;
      firestore()
        .collection("users")
        .doc(user_uid)
        .update(data);
      firestore()
        .collection("users")
        .doc(user_uid)
        .get()
        .then(function(user) {
          navigation.navigate('done',{user: user_uid})
        })   
      .catch(error => {
        const { code, message } = error;
        alert(message);
      });
  };
  onNo = () => {
    const { navigation } = this.props;
    const data = {
      fam: 'no',
    };
    user_uid = user_uid;
    firestore()
      .collection("users")
      .doc(user_uid)
      .update(data);
    firestore()
      .collection("users")
      .doc(user_uid)
      .get()
      .then(function(user) {
        navigation.navigate('done',{user: user_uid})
      })   
    .catch(error => {
      const { code, message } = error;
      alert(message);
    });
};
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.title, styles.leftTitle]}>
        คนในครอบครัวของคุณเคยมีปัญหาเกี่ยวกับหัวใจหรือไม่
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.rectangle} onPress={() => this.onYes()}></TouchableOpacity>
          <TouchableOpacity style={styles.rectangle} onPress={() => this.onNo()}></TouchableOpacity>
        </View>
      </View>
        <View style={styles.tras}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
      },
    title: {
      fontSize: AppStyles.fontSize.title,
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
    
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);