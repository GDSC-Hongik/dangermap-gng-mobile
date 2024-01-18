/* 디비에 있는 admin 아이디/비번 이용해 연동 해보기!! */
// 로그인/로그아웃 상태 확인해야 함 - mypage

import React, {useEffect, useState} from 'react';
import SignUpFinish from './SignUpFinish.js';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

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
    if (password !== password2) {
      alert('비밀번호를 확인해주세요.');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력하세요.');
      return;
    }
    navigation.navigate('SignUpFinish');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>회원가입</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
        <TextInput
          placeholder={'비밀번호 확인'}
          style={styles.input}
          autoCapitalize="none"
          value={password2}
          onChangeText={text => setPassword2(text)}></TextInput>
        <TextInput
          placeholder={'닉네임'}
          style={styles.input}
          autoCapitalize="none"
          value={nickname}
          onChangeText={text => setNickname(text)}></TextInput>
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={{color: '#ffffff', fontSize: 17}}>회원가입</Text>
        </TouchableOpacity>
      </View>
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
  registerBtn: {
    flex: 0.05,
    backgroundColor: '#326CF9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 80,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    width: 380,
    height: 60,
  },
});
