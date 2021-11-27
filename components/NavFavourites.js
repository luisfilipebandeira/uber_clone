import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import tw from 'tailwind-react-native-classnames'

const data = [
  {
    id: '123',
    icon: 'home-outline',
    location: 'Home',
    destination: 'Code Street, London, UK'
  },{
    id: '456',
    icon: 'briefcase-outline',
    location: 'Work',
    destination: 'London Eye, London, UK'
  }
]

const NavFavourites = () => {
  return (
    <View>
      {data.map((item) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`} key={item.id}>
          <Ionicons name={item.icon} size={25} style={tw`mr-4 rounded-full bg-gray-300 p-3`} />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default NavFavourites

const styles = StyleSheet.create({})
