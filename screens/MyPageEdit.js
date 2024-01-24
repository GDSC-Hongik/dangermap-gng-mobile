import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function MyPageEdit({navigation}) {
  const [nickname, setNickname] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Text>사진넣기</Text>
      </View>
      <View style={styles.sectionLine} />
      <TouchableOpacity
        style={styles.section}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('MyNicknameEdit')}>
        <Text style={styles.font}>닉네임 변경</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity
        style={styles.section}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('MyPasswordCheck')}>
        <Text style={styles.font}>비밀번호 변경</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100,
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
});
