import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function LikeDislikeButtons({date = '', email, likes}) {
  const [postlikes, setPostLikes] = useState(likes)
  const handleLike = async () => {
    try {
      const data = {
        user_email: email,
      }

      const response = await fetch(
        `http://127.0.0.1:8000/posts/like/?date=${date}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      // 서버 응답에 따라 좋아요 및 싫어요 수를 업데이트합니다.
      if (response.ok) {
        setPostLikes(postlikes + 1)
      } else {
        throw new Error('Failed to like the post')
      }
    } catch (error) {
      console.error('Error posting danger like:', error.message)
      throw error
    }
  }

  // 렌더링 함수의 return 문은 여기에 있어야 합니다.
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike} style={styles.button}>
        <Text>좋아요 ({postlikes})</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
})
