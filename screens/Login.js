// import * as Location from 'expo-location';
// import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import SignUp from './SignUp.js';
import SearchPW from './SearchPW';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmitPress = () => {
    setErrorText('');
    if (!email) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>로그인</Text>
      </View>
      <TextInput
        placeholder={'이메일 입력'}
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        placeholder={'비밀번호 입력'}
        style={styles.input}
        autoCapitalize="none"
        value={password}
        onChangeText={text => setPassword(text)}></TextInput>
      <View style={styles.IdPw}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchPW')}>
          <Text style={styles.searchPW}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.8}
        onPress={handleSubmitPress}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8}>
        <Text>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SignUp')}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
  input: {
    flex: 0.05,
    backgroundColor: '#CEE4F8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    fontSize: 15,
  },
  loginBtn: {
    flex: 0.05,
    backgroundColor: '#81A0F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
  },
  searchId: {
    flex: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 180,
    marginRight: 10,
  },
  searchPW: {
    flex: 0.3,
    paddingVertical: 15,
    paddingHorizontal: 13,
    marginTop: 20,
    marginLeft: 0,
    marginRight: 90,
  },
  IdPw: {
    flex: 0.3,
    flexDirection: 'row',
  },
  sign: {
    flex: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 180,
    marginRight: 10,
    alignItems: 'center',
    fontSize: 15,
  },
});
