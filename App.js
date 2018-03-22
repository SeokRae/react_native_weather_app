import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

export default class App extends React.Component {
  // 데이터 api를 불러오게되면 이 값은 true가 된다.
  // 로딩 중에는 false
  state = {
    isLoaded: true
  };
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather />
        ) : (
          <View style = {styles.loading}>
            <Text style = {styles.loadingText}>
              Getting the weather
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end"
    , paddingLeft: 25
  },
  loadingText: {
    fontSize: 40,
    marginBottom: 100
  }
});
