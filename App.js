import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

export default class App extends React.Component {
  // 데이터 api를 불러오게되면 이 값은 true가 된다.
  // 로딩 중에는 false
  state = {
    isLoaded: false,
    error: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          isLoaded: true
        });
      },
      error => {
        this.setState({
          error: error
        })
      } 
    );
  }
  render() {
    const { isLoaded, error } = this.state;
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: "#FDF6AA",
    justifyContent: "flex-end", 
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 35,
    marginBottom: 100
  }
});
