import React, {useEffect, useState} from 'react';
import MyPasswordEdit from './MyPasswordEdit';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function SignUp({navigation}) {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitPress = () => {
    setErrorText('');
    if (!password) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    if (password === password2) {
      alert('현재 비밀번호와 동일한 비밀번호입니다.');
      return;
    }
    navigation.navigate('MyPasswordEdit');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>비밀번호 확인</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          placeholder={'현재 비밀번호를 입력하세요.'}
          style={styles.input}
          autoCapitalize="none"
          value={password}
          onChangeText={text => setPassword(text)}></TextInput>
        <TouchableOpacity
          style={styles.registerBtn}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={{color: '#ffffff', fontSize: 17}}>비밀번호 확인</Text>
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
