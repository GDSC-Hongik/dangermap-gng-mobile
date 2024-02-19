import React, {useState, useEffect} from 'react'
import {Platform, PermissionsAndroid, SectionList} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import {useIsFocused} from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import WeatherScreen from './WeatherScreen'
import MapScreen from './MapScreen'
import DangerListScreen from '../Danger/DangerListScreen'
import DangerPost from '../Danger/DangerPost'
import MyPage from '../MyPage/MyPage'
import SettingScreen from './SettingScreen'

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

export function HomeScreen({navigation}) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
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
    paddingBottom: 10,
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  post: {
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 15,
    color: '#000000',
    fontWeight: '100',
    textAlign: 'right',
  },
})

export default MainScreen
