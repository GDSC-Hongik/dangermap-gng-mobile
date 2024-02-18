import React, {useEffect, useState} from 'react'
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native'
import Geolocation from '@react-native-community/geolocation'

function WeatherScreen() {
  const API_KEY = 'a42ee9ef2cbe12c75c1b5c11bb9e32b8'
  const [weather, setWeather] = useState({
    name: '',
    description: '',
    temp: '',
    icon: '',
    loading: true,
    error: null,
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords
        getWeather(latitude, longitude)
      },
      error => {
        setWeather(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }))
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    )
  }, [])

  const getWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      const data = await response.json()
      const weatherDesc = data.weather[0].description
      const weatherIcon = data.weather[0].icon
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      const temp = Math.round(data.main.temp)

      setWeather({
        name: data.name,
        description: weatherDesc,
        temp: temp,
        icon: weatherIconAdrs,
        loading: false,
        error: null,
      })
    } catch (error) {
      setWeather(prevState => ({
        ...prevState,
        loading: false,
        error: error.message,
      }))
    }
  }

  if (weather.loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (weather.error) {
    return (
      <View style={styles.container}>
        <Text>Error: {weather.error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{weather.name}</Text>
      <Text style={styles.text}>{weather.description}</Text>
      <Text style={styles.text}>{weather.temp}°C</Text>
      <Image style={styles.image} source={{uri: weather.icon}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // 배경색을 흰색으로 지정
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경 투명도 추가
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
})

export default WeatherScreen
