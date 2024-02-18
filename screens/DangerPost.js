import React, {useState, useEffect} from 'react'
import {
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  images,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage'
import {launchImageLibrary} from 'react-native-image-picker'
import {Picker} from '@react-native-picker/picker'
import {postDangerData} from './api.js'
import {color} from 'react-native-elements/dist/helpers/index.js'

function DangerPost({navigation}) {
  const [images, setImages] = useState([]) // 사진
  const [content, setContent] = useState(null) // 설명
  const [location, setLocation] = useState(null) // 위치
  const [rate, setRate] = useState(null) // 위험도(별점 표시)
  const [type, setType] = useState(null) // 위험 종류
  const [nickname, setNickname] = useState('') // 닉네임
  const [email, setEmail] = useState('') // 이메일 : 키 값
  const [like, setLike] = useState(0) // 좋아요
  const [dislike, serDislike] = useState(0) // 좋아요

  const [response, setResponse] = useState(null)

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
        setNickname(userData.nickname)
        setEmail(userData.email)
      }
    } catch (error) {
      console.error('Error', 'User information not found.', error.message)
    }
  }

  useEffect(() => {
    info()
  }, [])

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
        selectionLimit: 3,
      },
      response => {
        if (!response.didCancel && !response.error) {
          const selectedImages = response.assets.filter(image => image.base64) // base64 속성이 있는 이미지만 필터링
          const imagesWithUri = selectedImages.map(image => ({
            ...image,
            content_pic: image.uri,
          })) // content_pic 속성 추가
          setImages(imagesWithUri)
        }
      },
    )
  }

  function postCheck() {
    if (images === []) {
      Alert.alert('사진을 첨부해주세요.')
    } else if (type === null) {
      Alert.alert('위험 요인을 선택해주세요.')
    } else if (rate === null) {
      Alert.alert('위험도를 선택해주세요.')
    } else if (location === null) {
      Alert.alert('위치정보를 입력해주세요.')
    } else if (content === null) {
      Alert.alert('상세정보를 입력해주세요.')
    } else {
      postDanger()
    }
  }

  async function postDanger() {
    try {
      const timestamp = new Date().getTime()
      const fileName = `image_${timestamp}.jpg`
      const uploadTasks = images.map(async image => {
        const imageRef = storage().ref(`/dangerPic/${image.fileName}`)
        await imageRef.putString(image.base64, 'base64', {
          contentType: image.type,
        })
        return imageRef.getDownloadURL()
      })

      const uploadedUrls = await Promise.all(uploadTasks)

      const postData = {
        content_pics: uploadedUrls,
        content: content,
        location: location,
        danger_rate: rate,
        danger_type: type,
        user_nickname: nickname,
        lat: 53.42,
        lng: -32.112,
        user_email: email,
        date: '2024-02-16T07:19:56.984851Z',
        like: 0,
        dislike: 0,
      }
      postDangerData(postData)
      Alert.alert('안전정보가 등록되었습니다.')
      navigation.navigate('Home')
    } catch (error) {
      //응답 실패
      console.error('응답 실패', error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal>
        {images.map((image, index) => (
          <Image
            style={styles.image}
            key={index}
            source={{uri: image.content_pic}}
          />
        ))}
      </ScrollView>
      <View style={styles.section}>
        <TouchableOpacity style={styles.phohoBtn} onPress={onSelectImage}>
          <Text style={styles.text}>사진 추가하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.type}>
        <Picker
          selectedValue={type}
          onValueChange={itemValue => setType(itemValue)}>
          <Picker.Item label="위험 요인을 선택해주세요" value="" />
          <Picker.Item label="교통사고" value="교통사고" />
          <Picker.Item label="보도블록 공사" value="보도블록 공사" />
          <Picker.Item label="빙판길" value="빙판길" />
          <Picker.Item label="신호등 고장" value="신호등 고장" />
          <Picker.Item label="싱크홀" value="싱크홀" />
          <Picker.Item label="웅덩이" value="웅덩이" />
          <Picker.Item label="지하차도 침수" value="지하차도 침수" />
          <Picker.Item label="차도 공사" value="차도 공사" />
          <Picker.Item label="기타" value="etc" />
        </Picker>
      </View>
      <Picker
        selectedValue={rate}
        onValueChange={itemValue => setRate(itemValue)}>
        <Picker.Item label="위험도를 선택해주세요" value="" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="1" value="1" />
      </Picker>
      <TextInput
        placeholder="위치정보"
        onChangeText={location => setLocation(location)}
        value={location}
        style={{paddingLeft: 10}}
      />
      <TextInput
        placeholder="상세 정보"
        onChangeText={text => setContent(text)}
        value={content}
        style={{paddingLeft: 10}}
      />
      <View style={styles.section}>
        <TouchableOpacity style={styles.submitBtn} onPress={postCheck}>
          <Text style={styles.text}>안전정보 등록</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {flex: 0.3, width: 100, height: 100, marginLeft: 10, marginTop: 20},
  phohoBtn: {
    flex: 0.05,
    width: 150,
    height: 50,
    backgroundColor: '#326CF9',
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    flex: 0.3,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  submitBtn: {
    flex: 0.05,
    width: 150,
    height: 50,
    backgroundColor: '#326CF9',
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {},
})

export default DangerPost
