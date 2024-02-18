import React, {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginScreen from './MyPage/Login'
import LogoutScreen from './MyPage/Logout'
import SignUp from './MyPage/SignUp'
import SearchPW from './MyPage/SearchPW'
import MyPage from './MyPage/MyPage'
import MyPageEdit from './MyPage/MyPageEdit'
import AccountDelete from './MyPage/AccountDelete'
import MySafety from './MyPage/MySafety'
import MyPasswordEdit from './MyPage/MyPasswordEdit'

import DangerListScreen from './Danger/DangerListScreen'
import DangerDetailScreen from './Danger/DangerDetailScreen'
import DangerPost from './Danger/DangerPost'
import DangerPostLocation from './Danger/DangerPostLocation'

import HomeScreen from './MainScreen/HomeScreen'
import MapScreen from './MainScreen/MapScreen'
import SettingScreen from './MainScreen/SettingScreen'
import WeatherScreen from './MainScreen/WeatherScreen'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '',
        }}
        activeOpacity={0.8}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{title: '로그아웃'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        activeOpacity={0.5}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SearchPW"
        component={SearchPW}
        options={{title: ''}}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{
          title: '내정보',
        }}
      />
      <Stack.Screen
        name="MyPageEdit"
        component={MyPageEdit}
        options={{title: '내정보 수정'}}
      />
      <Stack.Screen
        name="AccountDelete"
        component={AccountDelete}
        options={{title: ''}}
      />
      <Stack.Screen
        name="MySafety"
        component={MySafety}
        options={{title: '내가 쓴 안전정보'}}
      />
      <Stack.Screen
        name="MyPasswordEdit"
        component={MyPasswordEdit}
        options={{title: '비밀번호 수정'}}
      />
      <Stack.Screen
        name="DangerListScreen"
        component={DangerListScreen}
        options={{title: '위험정보 목록'}}
      />
      <Stack.Screen
        name="DangerPost"
        component={DangerPost}
        options={{title: '위험정보 등록'}}
      />
      <Stack.Screen
        name="DangerDetailScreen"
        component={DangerDetailScreen}
        options={{title: '상세정보'}}
      />
      <Stack.Screen
        name="DangerPostLocation"
        component={DangerPostLocation}
        options={{title: ''}}
      />
    </Stack.Navigator>
  )
}

export default App
