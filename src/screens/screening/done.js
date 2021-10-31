import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../../AppStyles";
import { Configuration } from "../../Configuration";


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Screening Data",
  });
  
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center'}}>
        <Text style={[styles.title, styles.leftTitle]}>
        Sign up done!
        </Text>
      </View> 
      <View style={{alignItems: "center",justifyContent: 'center',}}>
      <TouchableOpacity style={[styles.facebookContainer, { marginTop: 400 }]} onPress={() => {this.props.navigation.navigate('Welcome')}}>
          <Text style={[styles.facebookText]}>ไปที่หน้าเข้าสู่ระบบ</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
