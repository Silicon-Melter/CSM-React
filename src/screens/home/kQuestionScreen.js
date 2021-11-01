import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView
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
    title: "Self-Monitoring",
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
      <ScrollView style={styles.container}>
        <View style={{ alignItems: 'center'}}>
        <Text style={[styles.title, styles.leftTitle]}>
        คุณมีอาการใดต่อไปนี้บ้าง
        </Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>ใจสั่น</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>เจ็บหน้าอก</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>จุกแน่นขึ้นคอ</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>อ่อนเพลีย</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>นอนราบไม่ได้</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>เหนื่อยง่าย</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>เวียนศีรษะ</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>หายใจลำบาก</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>ตัวบวม ขาบวม ท้องอืด</Text>
      </View>
      <View style={styles.check}>
        <CheckBox style={ styles.leftTitle} value={false}/>
        <Text style={{alignSelf: "center", fontSize: AppStyles.fontSize.content,}}>หน้ามืด</Text>
      </View>
      <View style={{alignItems: "center",justifyContent: 'center',}}>
      <TouchableOpacity style={[styles.facebookContainer, { marginTop: 50 }]} onPress={() => {this.props.navigation.navigate('Result')}}>
          <Text style={[styles.facebookText]}>Next</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
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
