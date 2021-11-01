import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
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
      height: null,
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
  onH = () => {
      const { navigation } = this.props;
      const { height } = this.state;
      const data = {
        height: height,
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
          navigation.navigate('Screening6',{user: user_uid})
        })   
      .catch(error => {
        const { code, message } = error;
        alert(message);
      });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center'}}>
        <Text style={[styles.title, styles.leftTitle]}>
        คุณมีส่วนสูงเท่าไหร่
        </Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            onChangeText={text => this.setState({ height: text })}
            value={this.state.height}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
          />
        </View>
      </View> 
      <View style={{alignItems: "center",justifyContent: 'center',}}>
      <TouchableOpacity style={[styles.facebookContainer, { marginTop: 330 }]} onPress={() => this.onH()}>
          <Text style={[styles.facebookText]}>Next</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}
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

export default connect(mapStateToProps)(HomeScreen);

