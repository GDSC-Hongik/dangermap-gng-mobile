import React, {useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

function LikeDislikeButtons({date, userEmail}) {
  const API_BASE_URL = 'http://127.0.0.1:8000/posts/'

  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  const handleLikeDislike = async isLike => {
    const url = isLike
      ? `${API_BASE_URL}like/?date=${date}`
      : `${API_BASE_URL}dislike/?date=${date}`

    // 주소를 like / dislike 로 나누지 말고 posts/date~~~/로 구분해서 그 안에 필드를 like, dislike, user_email로 나누는게 나을거 같음

    console.log(`${isLike ? 'Liked' : 'Disliked'} successfully!`)
    console.log(date)
    console.log(userEmail)
    console.log(url)
    isLike ? setLikes(likes + 1) : setDislikes(dislikes + 1)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
        }),
      })
      if (response.ok) {
        console.log('success')
      } else {
        throw new Error('Failed to process like/dislike ')
      }
      const responseData = await response.json()
      return responseData
    } catch (error) {
      console.error('Error:', error.message)
    }
    //   const data = await response.json(); // 서버로부터의 응답 데이터를 JSON으로 파싱
    //   if (response.ok) {
    //     console.log(`${isLike ? 'Liked' : 'Disliked'} successfully!`);
    //     isLike ? setLikes(data.likes) : setDislikes(data.dislikes); // 좋아요/싫어요 수를 서버에서 받아와 업데이트
    //     return data;
    //   } else {
    //     throw new Error(data.error || 'Failed to process like/dislike'); // 서버에서의 오류 메시지를 처리
    //   }
    // } catch (error) {
    //   console.error('Error:', error.message);
    // }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleLikeDislike(true)}
        style={styles.button}>
        <Text>좋아요 ({likes})</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleLikeDislike(false)}
        style={styles.button}>
        <Text>싫어요 ({dislikes})</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
})

export default LikeDislikeButtons
