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
    title: "Self-Monitoring",
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
        <Text style={styles.title}>วางเสต็ตโทสโคปค้างไว้ที่จุดที่4</Text>
        <Text style={styles.title}>โปรดกลั้นหายใจระหว่างขั้นตอนนี้</Text>
        <TouchableOpacity 
          onPress={() => {this.props.navigation.navigate('Question')}}>
            <Text style={{ fontSize: 30,color: AppStyles.color.tint, marginTop: 330}}>Record</Text>
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
    padding: Configuration.home.listing_item.offset
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: AppStyles.color.title,
    marginTop: 20,
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
  }
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
