import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

const API_KEY = "c631e4bf05cd6360dd895d4faab0094d";

export default class App extends React.Component {
  // 데이터 api를 불러오게되면 이 값은 true가 된다.
  // 로딩 중에는 false
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      } 
    );
  }
  // 노원구 위도, 경도 (37.6541917, 127.05679299999997)
  _getWeather = ( lat, lon ) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json =>{
      console.log(json);
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      })
    });
  };
  render() {
    const { isLoaded, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather 
            weatherName={name} 
            temp = {Math.ceil(temperature - 273.15)}
          />
        ) : (
          <View style = {styles.loading}>
            <Text style = {styles.loadingText}>
              Getting the weather Please Wait
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
    marginBottom: 24
  }
});
