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
import CalendarPicker from 'react-native-calendar-picker';
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
      selectedStartDate: null,
      birth: "",
    };
    this.onDateChange = this.onDateChange.bind(this);
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
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  onBirth = () => {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      const { navigation } = this.props;
      const data = {
        birth: startDate,
      };
      firestore()
        .collection("users")
        .doc(user_uid)
        .update(data);
      firestore()
        .collection("users")
        .doc(user_uid)
        .get()
        .then(function(user) {
          navigation.navigate('Screening3',{user: user_uid})
        })   
      .catch(error => {
        const { code, message } = error;
        alert(message);
      });
  };

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>
        คุณเกิดวันที่เท่าไหร่
        </Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>

        <TouchableOpacity style={[styles.facebookContainer, { marginTop: 50 }]} onPress={() => this.onBirth()}>
          <Text style={[styles.facebookText]}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
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
    backgroundColor: '#E6FFF5',
    width: 100,
    height: 120,
  },
  rectangle:{
    padding: 5,
    width: 200,
    height: 240,
    backgroundColor: '#696969',
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
