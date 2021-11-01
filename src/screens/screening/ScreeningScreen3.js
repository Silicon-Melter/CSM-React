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
      gender: "",
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
  onMen = () => {
      const { navigation } = this.props;
      const data = {
        rok1: isSelected,
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
          navigation.navigate('Screening4',{user: user_uid})
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
        คุณมีโรคประจำตัวใดต่อไปนี้บ้าง
        </Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>โรคเบาหวาน</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>โรคความดันโลหิตสูง</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>คอเลสเตอรอลสูง</Text>
      </View>
      <View style={{ alignItems: 'center'}}>
        <Text style={[styles.title, styles.leftTitle]}>
        พฤติกรรมของคุณตรงกับข้อใดบ้าง
        </Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>ทานอาหารไขมันสูงเป็นประจำ</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>สูบบุหรี่เป็นประจำ</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>เครียดเป็นประจำ</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>ออกกำลังกายน้อย</Text>
      </View>
      <View style={{alignItems: "center",justifyContent: 'center',}}>
      <TouchableOpacity style={[styles.facebookContainer, { marginTop: 50 }]} onPress={() => {this.props.navigation.navigate('Screening4',{user: user_uid})}}>
          <Text style={[styles.facebookText]}>Next</Text>
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
