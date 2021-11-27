import React, { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'

import { FontAwesome } from "@expo/vector-icons"
import tw from 'tailwind-react-native-classnames'

import 'intl';

import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },{
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber Lux',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  }
]

const SURGE_CHARGE_PRUICE = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)

  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="chevron-left" size={18} />
          </TouchableOpacity>
          <Text style={tw`text-center py-5 text-xl`}>
            Select a ride - {travelTimeInformation?.distance?.text}
          </Text>
        </View>

        {data.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={tw`flex-row justify-between items-center px-10
            ${item.id === selected?.id && `bg-gray-200`}`}
            onPress={() => setSelected(item)}
          >
            <Image 
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
              source={{ uri: item.image}}
            />

            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text style={{maxWidth: 180}}>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>R${((travelTimeInformation?.duration?.value * SURGE_CHARGE_PRUICE * item.multiplier) / 100).toFixed(2)}</Text>
          </TouchableOpacity>
        ))}

        <View style={tw`mt-auto border-t border-gray-200`}>
          <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`} activeOpacity={0.7}>
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RideOptionsCard
