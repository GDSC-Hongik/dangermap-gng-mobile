import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ViewBase,
} from 'react-native'
import LikeDislikeButtons from './LikeDislikeButtons'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const DangerDetailScreen = ({route}) => {
  const {item} = route.params // 데이터 넘겨 받음

  const [userEmail, setUserEmail] = useState()

  const info = async () => {
    try {
      const user = auth().currentUser // Access the user property directly

      // Now you can use the 'user' object as needed
      const uid = user.uid

      // 2. Firestore에서 해당 유저의 정보 가져오기
      const userDoc = await firestore().collection('user').doc(uid).get()
      const userData = userDoc.data()

      // 3. userData를 기반으로 필요한 작업 수행
      if (userData) {
        const userEmail = userData.email
        setUserEmail(userEmail)
      }
    } catch (error) {
      console.error('Error', 'User information not found.', error.message)
    }
  }

  useEffect(() => {
    info()
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.dangerType}>{item.danger_type}</Text>
      <View style={{flexDirection: 'row', paddingBottom: 10}}>
        <Text style={styles.date}>{item.display_date}</Text>
        <Text style={styles.rate}>위험수치 {item.danger_rate}</Text>
      </View>

      {item.content_pics.map((pic, index) => (
        <Image
          key={index}
          style={styles.image}
          source={{uri: pic}} // 각 URL에 대해 이미지 컴포넌트 생성
        />
      ))}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LikeDislikeButtons
          date={item.date}
          email={userEmail}
          likes={item.like}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 100, // ScrollView 내용의 하단 여백 설정
  },
  dangerType: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 10,
    color: '#000000',
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
    paddingLeft: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  rate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FA5858',
    paddingLeft: 20,
  },
  content: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    color: '#000000',
    flexShrink: 1,
  },
})

export default DangerDetailScreen
