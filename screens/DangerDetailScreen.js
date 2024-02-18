import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import LikeDislikeButtons from './LikeDislikeButtons'
const DangerDetailScreen = ({route}) => {
  const {item} = route.params // 데이터 넘겨 받음
  const [userEmail, setUserEmail] = useState('')

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
        <TextInput
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={setUserEmail}
          style={{borderWidth: 1, padding: 10, marginBottom: 10}}
        />
        <LikeDislikeButtons date={item.date} userEmail={userEmail} />
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
