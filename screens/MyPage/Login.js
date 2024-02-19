import React, {useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

import SignUp from './SignUp'
import SearchPW from './SearchPW'

import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

const saveToken = async token => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (error) {
    console.error('토큰 저장 오류:', error.message)
  }
}

export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: `46052954576-pq6859lajcmttoajnrkj2sbp00n8s04o.apps.googleusercontent.com`,
    })
  }, [])

  const signIn = async () => {
    // 1. Firebase Authentication을 사용하여 로그인
    await auth().signInWithEmailAndPassword(email, password)

    Alert.alert('로그인 성공', '성공적으로 로그인되었습니다.')
    navigation.navigate('Home')
  }

  let isSignInInProgress = false

  const onPressGoogleBtn = async () => {
    try {
      // 구글 로그인 시도
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      // Firebase에 구글 계정으로 인증을 시도하여 로그인
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      )
      await auth().signInWithCredential(googleCredential)

      Alert.alert('로그인 성공', '성공적으로 로그인되었습니다.')
      navigation.navigate('Home')
    } catch (error) {
      console.error('구글 로그인 오류:', error.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>로그인</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          placeholder={'이메일'}
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}></TextInput>
        <TextInput
          placeholder={'비밀번호'}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={text => setPassword(text)}></TextInput>
      </View>
      <View style={styles.search}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchPW')}>
          <Text>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={signIn}>
          <Text style={{color: '#ffffff', fontSize: 16}}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.sectionLine} />
        <TouchableOpacity
          style={styles.google}
          activeOpacity={0.8}
          onPress={onPressGoogleBtn}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 150,
              overflow: 'hidden',
              borderWidth: 3,
            }}
            source={require('../../resource/Images/Icons/Google1.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          FlexDirection: 'row',
        }}>
        <Text>아직 회원이 아니신가요?</Text>
        <TouchableOpacity
          style={styles.register}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={{color: '#326CF9'}}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  text: {
    flex: 0.4,
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    flex: 0.05,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 5,
    marginTop: 20,
    fontSize: 15,
    width: 380,
    height: 60,
  },
  search: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 13,
  },
  loginBtn: {
    flex: 0.05,
    backgroundColor: '#326CF9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    width: 380,
    height: 60,
  },
  sectionLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#DADADA',
    width: 380,
    marginTop: 40,
  },
  google: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  register: {flex: 0.05, paddingBottom: 50},
})
