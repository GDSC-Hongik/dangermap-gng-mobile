// import * as Location from 'expo-location';
// import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import Login from './Login.js';
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

export default function SignUpFinish({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.enter} />
      <View style={styles.header}>
        <Text style={styles.text}>회원가입이 완료되었습니다. 감사합니다.</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}
        style={styles.Btn}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 20,
    color: '#000000',
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
