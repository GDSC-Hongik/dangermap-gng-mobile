import React from 'react';
import MyPage from './MyPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

function MapScreen({navigation}) {
  return <Text>지도지도지도</Text>;
}

function HomeScreen({navigation}) {
  return <Text>Home 꾸미긲꾸미기</Text>;
}

function SettingScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Text>사진넣기</Text>
      </View>
      <View style={styles.sectionLine} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('MyPage')}>
        <Text style={styles.font}>내정보</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity style={styles.section}>
        <Text style={styles.font}>알림받기</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity style={styles.section}>
        <Text style={styles.font}>약관 및 정책</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity style={styles.section}>
        <Text style={styles.font}>로그아웃</Text>
      </TouchableOpacity>
      <View style={styles.sectionLine} />
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.font}>임시 로그인</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
  profile: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100,
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
});

export default MainScreen;
