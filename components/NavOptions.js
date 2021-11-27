import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import tw from 'tailwind-react-native-classnames'

import {useNavigation} from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  },{
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'MapScreen'
  }
]

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)

  return (
    <ScrollView horizontal>
      {data.map((item) => (
        <TouchableOpacity key={item.id} style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`} 
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}  
        >
          <View style={tw`${!origin && 'opacity-20'}`}>
            <Image 
              source={{ uri: item.image}}
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <AntDesign name="arrowright" color="white" size={24} style={tw`p-2 bg-black rounded-full w-10 mt-4`} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default NavOptions
