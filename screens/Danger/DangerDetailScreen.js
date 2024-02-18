import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
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
    <ScrollView style={styles.container}>
      <Text style={styles.dangerType}>{item.danger_type}</Text>
      <Text style={styles.date}>{item.date}</Text>
      {item.content_pics.length > 0 && (
        <Image
          style={styles.image}
          source={{uri: item.content_pics[0]}} // 첫 번째 URL만 사용
        />
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LikeDislikeButtons date={item.date} email={userEmail} />
      </View>
      <Text style={styles.rate}>위험수치 {item.danger_rate}</Text>
      <Text>{item.content}</Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dangerType: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
    backgroundColor: 'gray',
  },
})

export default DangerDetailScreen
