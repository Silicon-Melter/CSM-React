import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

class SignupScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: "",
      surname: "",
      email: "",
      password: ""
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

  onRegister = () => {
    const { email, password } = this.state;
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const { navigation } = this.props;
        const { name, surname, email, } = this.state;
        const data = {
          email: email,
          name: name,
          surname: surname,
          gender: null,
          birth: null,
          rok1: null,
          rok2: null,
          rok3: null,
          act1: null,
          act2: null,
          act3: null,
          act4: null,
          weight: null,
          height: null,
          fam: null,
          uid: response.user._user.uid,
          appIdentifier: "rn-android-universal-listings"
        };
        user_uid = response.user._user.uid;
        firestore()
          .collection("users")
          .doc(user_uid)
          .set(data);
        firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            navigation.navigate('Screening1',{user: user_uid})
          })
          .catch(function(error) {
            const { code, message } = error;
            alert(message);
          });
      })
      .catch(error => {
        const { code, message } = error;
        alert(message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>??????????????????????????????????????????</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Name"
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Surname"
            onChangeText={text => this.setState({ surname: text })}
            value={this.state.surname}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail Address"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}
          onPress={() => this.onRegister()}
        >
          Next
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
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
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default SignupScreen;
