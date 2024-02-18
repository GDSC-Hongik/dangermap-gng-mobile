import React, {useState, useEffect} from 'react'
import {useIsFocused} from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

import MyPage from '../MyPage/MyPage'
import LoginScreen from '../MyPage/Login'
import LogoutScreen from '../MyPage/Logout'

export default function SettingScreen({navigation}) {
  const [logged, setLogged] = useState(false)
  const [userToken, setUserToken] = useState('')

  const isFocused = useIsFocused()

  const confirmLogged = async () => {
    try {
      const user = auth().currentUser

      if (user) {
        const token = await user.getIdToken()
        if (token) {
          setUserToken(token)
          setLogged(true)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    confirmLogged()
  }, [isFocused])

  const logoutUser = async () => {
    try {
      // 로그아웃 시에 저장된 토큰 제거
      if (userToken) {
        await AsyncStorage.removeItem(userToken)
        await auth().signOut()
        Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다.')
        setLogged(false)
        navigation.navigate('Home', {refresh: true})
        // 추가적으로 필요한 작업 수행}
      }
    } catch (error) {
      console.error('로그아웃 오류:', error.message)
      Alert.alert('로그아웃 오류', '로그아웃 중 오류가 발생했습니다.')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionLine} />
      {logged && (
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('MyPage')}>
          <Text style={styles.font}>내정보</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sectionLine} />
      {logged && (
        <TouchableOpacity style={styles.section} onPress={logoutUser}>
          <Text style={styles.font}>로그아웃</Text>
        </TouchableOpacity>
      )}
      {!logged && (
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            navigation.navigate('Login')
          }}>
          <Text style={styles.font}>로그인</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sectionLine} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 0,
  },
  section: {
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionLine: {
    borderTopWidth: 0.5,
    opacity: 0.5,
  },
  font: {
    fontSize: 16,
    marginLeft: 25,
    marginTop: 18,
    fontWeight: 'bold',
  },
  footer: {
    height: '50%',
    justifyContent: 'center',
  },
  searchBar: {
    height: '10%',
    backgroundColor: 'green',
  },
  content: {
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  weather: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  post: {
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 15,
    color: '#000000',
    fontWeight: 'semi-bold',
    textAlign: 'right',
  },
})
