import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import LikeDislikeButtons from './LikeDislikeButtons'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const DangerDetailScreen = ({route}) => {
  const {item} = route.params // 데이터 넘겨 받음

  const [userEmail, setUserEmail] = useState('')
  const [comment, setComment] = useState('')

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

  const postComment = async () => {
    try {
      if (!userEmail || !comment || comment.trim() === '') {
        console.error('User email or comment is missing.')
        return
      }

      const response = await fetch(
        `http://127.0.0.1:8000/posts/comment/?date=${date}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment: comment,
            date: date,
            user_email: userEmail,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to post comment')
      }

      setComment('')
      // 부모 컴포넌트에서 댓글 목록을 다시 불러옵니다.
      onUpdateComments()
    } catch (error) {
      console.error('Error posting comment:', error.message)
    }
  }

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
      <View style={styles.container}>
        {/* 댓글 목록을 출력하는 부분 */}
        {comments.map((comment, index) => (
          <View key={index}>
            <Text>
              {comment.user_email}: {comment.comment}
            </Text>
          </View>
        ))}
        <TextInput
          placeholder="댓글을 입력하세요"
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
          multiline={true}
        />
        <TouchableOpacity onPress={postComment} style={styles.postButton}>
          <Text style={styles.postButtonText}>게시</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  commentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
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
