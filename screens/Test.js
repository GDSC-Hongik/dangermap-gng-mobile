import React, {useState, useEffect} from 'react'
import {Platform, PermissionsAndroid} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import {useIsFocused} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import DangerListScreen from './Danger/DangerListScreen'
import WeatherScreen from './MainScreen/WeatherScreen'

import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {reload} from 'firebase/auth'

const Tab = createBottomTabNavigator()

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        tabBarActiveTintColor: '#326CF9',
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          marginTop: 10,
          height: 50,
        },
      }}>
      <Tab.Screen
        name="지도"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="map-sharp"
              style={{color: focused ? '#326CF9' : '#404040'}}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              style={{color: focused ? '#326CF9' : '#404040'}}
              size={24}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="설정"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="settings-sharp"
              style={{color: focused ? '#326CF9' : '#404040'}}
              size={24}
            />
          ),
          unmountOnBlur: true,
        }}></Tab.Screen>
    </Tab.Navigator>
  )
}

/*          <Marker
            coordinate={{
              latitude: 37.556944,
              longitude: 126.923917,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />*/

function MapScreen() {
  const [location, setLocation] = useState()
  const [region, setRegion] = useState()

  const handlePlacePress = place => {
    // 선택된 장소의 위도와 경도 가져오기
    const {lat, lng} = place.geometry.location
    // 지도의 중심을 선택된 장소로 이동
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
  }

  useEffect(() => {
    let isMounted = true // 컴포넌트가 마운트된 상태를 나타내는 변수

    async function fetchLocation() {
      try {
        const granted = await requestPermission()
        if (granted) {
          const currentPosition = await getCurrentLocation()
          if (isMounted) {
            setLocation(currentPosition)
            setRegion(currentPosition)
          }
        }
      } catch (error) {
        console.error('Error fetching location:', error)
      }
    }

    fetchLocation()

    return () => {
      isMounted = false // 컴포넌트가 언마운트되었음을 나타내는 변수를 false로 설정하여 클린업 함수에서 상태 업데이트를 막습니다.
    }
  }, [])

  async function requestPermission() {
    // 사용자의 위치 정보 수집 권한을 요청

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '위치 정보 사용 권한 요청',
            message: '위치 정보를 사용하여 지도를 표시합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거절',
            buttonPositive: '수락',
          },
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation()
        } else {
          console.log('위치 정보 사용 권한이 거부되었습니다.')
        }
      }
    } catch (err) {
      console.warn('여기 에러', err)
    }
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        })
      },
      error => {
        console.warn('Error getting current location:', error)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 3600},
    )
  }
  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="위치 검색"
        onPress={(data, details = null) => {
          // 선택된 장소 정보가 있는 경우 이동 처리
          handlePlacePress(details)
        }}
        query={{key: 'AIzaSyCMkA_ccgrslOQgsfNR2oR9awLZBYnbDNI', language: 'ko'}}
        fetchDetails={true}
        returnKeyType={'default'}
        autoFocus={false}
        minLength={2}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        listEmptyComponent={<Text>No results found</Text>}
        styles={{
          container: {
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          },
          textInputContainer: {
            backgroundColor: 'transparent', // 검색창 배경 투명으로 설정
            borderTopWidth: 0, // 검색창 상단 테두리 제거
            borderBottomWidth: 0, // 검색창 하단 테두리 제거
          },
          textInput: {
            height: 50,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
            paddingHorizontal: 10,
          },
          listView: {
            position: 'absolute',
            top: 50, // 검색창 아래에 표시되도록 설정
            backgroundColor: 'white',
            width: '100%',
            zIndex: 2, // 검색 결과 목록이 검색창 위에 표시되도록 설정
          },
        }}
      />
      {location ? (
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          minZoomLevel={10}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          region={region}>
          {region && <Marker coordinate={region} />}
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={10} // 반지름 설정 (미터 단위)
            fillColor="rgba(0, 0, 255, 0.3)" // 파란색으로 투명도 설정
            strokeColor="rgba(0, 0, 255, 0.3)" // 테두리 색상 설정
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

function HomeScreen({navigation}) {
  const [logged, setLogged] = useState(false)
  const isFocused = useIsFocused()

  const confirmLogged = async () => {
    try {
      const user = auth().currentUser

      if (user) {
        const token = await user.getIdToken()
        if (token) {
          setLogged(true)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    confirmLogged()
  }, [isFocused])
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.map}>
          <MapScreen />
        </TouchableOpacity>
        <View style={styles.weather}>
          <WeatherScreen />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DangerListScreen')}>
          <Text style={styles.list}>위험정보 목록</Text>
        </TouchableOpacity>
        {logged && (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('DangerPost')}>
              <Text style={styles.post}>위험정보 등록</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <DangerListScreen />
    </View>
  )
}

function SettingScreen({navigation}) {
  const [logged, setLogged] = useState(false)
  const [userToken, setUserToken] = useState('')

  const isFocused = useIsFocused()

  const confirmLogged = async () => {
    try {
      const user = auth().currentUser

      if (user) {
        const token = await user.getIdToken()
        if (token) {
          setUserToken(token)
          setLogged(true)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    confirmLogged()
  }, [isFocused])

  const logoutUser = async () => {
    try {
      // 로그아웃 시에 저장된 토큰 제거
      if (userToken) {
        await AsyncStorage.removeItem(userToken)
        await auth().signOut()
        Alert.alert('로그아웃 성공', '성공적으로 로그아웃되었습니다.')
        setLogged(false)
        navigation.navigate('Home', {refresh: true})
        // 추가적으로 필요한 작업 수행}
      }
    } catch (error) {
      console.error('로그아웃 오류:', error.message)
      Alert.alert('로그아웃 오류', '로그아웃 중 오류가 발생했습니다.')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionLine} />
      {logged && (
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('MyPage')}>
          <Text style={styles.font}>내정보</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sectionLine} />
      {logged && (
        <TouchableOpacity style={styles.section} onPress={logoutUser}>
          <Text style={styles.font}>로그아웃</Text>
        </TouchableOpacity>
      )}
      {!logged && (
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            navigation.navigate('Login')
          }}>
          <Text style={styles.font}>로그인</Text>
        </TouchableOpacity>
      )}
      <View style={styles.sectionLine} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 0,
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
  footer: {
    height: '50%',
    justifyContent: 'center',
  },
  searchBar: {
    height: '10%',
    backgroundColor: 'green',
  },
  content: {
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  weather: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  post: {
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 15,
    color: '#000000',
    fontWeight: 'semi-bold',
    textAlign: 'right',
  },
})

export default MainScreen
