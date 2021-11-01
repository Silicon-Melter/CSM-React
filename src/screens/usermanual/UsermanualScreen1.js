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



class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "User Manual",
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          {navigation.state.params && navigation.state.params.menuIcon ? (
            <FastImage
              style={styles.userPhoto}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: navigation.state.params.menuIcon }}
            />
          ) : (
            <FastImage
              style={styles.userPhoto}
              resizeMode={FastImage.resizeMode.cover}
              source={AppIcon.images.defaultUser}
            />
          )}
        </TouchableOpacity>
      );
    }
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
        ทำอย่างนี้
        </Text>
      </View> 
      <View style={{alignItems: "center",justifyContent: 'center',}}>
      <TouchableOpacity style={[styles.facebookContainer, { marginTop: 420 }]} onPress={() => {this.props.navigation.navigate('UserManual2')}}>
          <Text style={[styles.facebookText]}>Next</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.title,
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
