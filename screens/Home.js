import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

import DangerListScreen from './Danger/DangerListScreen'
import WeatherScreen from './MainScreen/WeatherScreen'
import MapScreen from './MainScreen/MapScreen'
import HomeScreen from './MainScreen/HomeScreen'
import SettingScreen from './MainScreen/SettingScreen'

const Tab = createBottomTabNavigator()

function Home() {
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

export default Home
