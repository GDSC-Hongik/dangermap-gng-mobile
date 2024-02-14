import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function SearchPW({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      const user = auth().currentUser; // Access the user property directly
      // Now you can use the 'user' object as needed
      const uid = user.uid;
      // 2. Firestore에서 해당 유저의 정보 가져오기
      const userDoc = await firestore().collection('user').doc(uid).get();
      const userData = userDoc.data();
      // 3. userData를 기반으로 필요한 작업 수행
      if (userData) {
        const userEmail = userData.email;
        setEmail(userEmail);
      }
      await auth().sendPasswordResetEmail(email);
      setSubmitted(true);
      setError('');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found');
      } else {
        setError('There was a problem with your request');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>비밀번호 찾기</Text>
        <Text>입력한 이메일로 비밀번호 재설정 주소가 전송됩니다.</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          placeholder={'가입 시 사용한 이메일을 입력하세요.'}
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}></TextInput>
        <TouchableOpacity
          style={styles.Btn}
          activeOpacity={0.8}
          onPress={resetUserPassword}>
          <Text style={{color: '#ffffff', fontSize: 16}}>
            비밀번호 재설정하기
          </Text>
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
  Btn: {
    flex: 0.05,
    backgroundColor: '#326CF9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 80,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    width: 380,
    height: 60,
  },
});
