import React, {useState, useEffect} from 'react'
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import {useNavigation} from '@react-navigation/native'

import {
  Platform,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

export default function MapScreen() {
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
          getCurrentLocation2()
        } else {
          console.log('위치 정보 사용 권한이 거부되었습니다.')
        }
      }
    } catch (err) {
      console.warn(err)
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

  const getCurrentLocation2 = () => {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
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

  const locationInfo = () => {
    return {region}
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
          {region && <Marker coordinate={region} onPress={locationInfo} />}
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
