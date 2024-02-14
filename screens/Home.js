import React, {useState, useEffect} from 'react'
import MyPage from './MyPage'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import {useIsFocused} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

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

function MapScreen({navigation}) {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const hongikRegion = {
    latitude: 37.552635722509,
    longitude: 126.92436042413,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLogitude] = useState(null)

  // const geoLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const latitude = JSON.stringify(position.coords.latitude);
  //       const longitude = JSON.stringify(position.coords.longitude);

  //       setLatitude(latitude);
  //       setLogitude(longitude);
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        // annotations={markers}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        // followsUserLocation={true}
        // showsCompass={true}
        // scrollEnabled={true}
        // zoomEnabled={true}
        // pitchEnabled={true}
        // rotateEnabled={true}
        onRegionChangeComplete={region => setRegion(region)}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={10}
        initialRegion={{
          latitude: 37.552635722509,
          longitude: 126.92436042413,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={hongikRegion} />
        <Marker
          coordinate={{
            latitude: 37.556944,
            longitude: 126.923917,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>
      <View>
        {/* <Text> latitude: {latitude} </Text>
        <Text> longitude: {longitude} </Text> */}
        {/* <TouchableOpacity
        onPress={() => geoLocation()}
        style={{backgroundColor: '#89B2E9'}}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Get GeoLocation Button
        </Text>
      </TouchableOpacity> */}
      </View>
    </View>
  )
}

function HomeScreen({navigation}) {
  function navigateToDangerList() {
    navigation.navigate('DangerList')
  }
  function navigateToTest() {
    navigation.navigate('Test')
  }
  return (
    <View>
      <Button title="위험리스트로 이동" onPress={navigateToDangerList} />
      <Button title="Test" onPress={() => navigation.navigate('Test')} />
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
      <TouchableOpacity style={styles.section}>
        <Text style={styles.font}>알림받기</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity style={styles.section}>
        <Text style={styles.font}>약관 및 정책</Text>
      </TouchableOpacity>
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

// 처음 어플 키면 홈 화면 보이게끔
// 설정 탭 드가서 내 정보 눌렀을 때
// 1. 로그인 되어 있으면 내정보수정화면으로
// 2. 로그인 안 되어 있으면 로그인 화면으로
// 로그아웃 버튼 누를 시 바로 로그아웃되게

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
})

export default MainScreen
