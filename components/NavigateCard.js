import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'tailwind-react-native-classnames'

import {useNavigation} from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'

import {useDispatch} from 'react-redux'
import { setDestination } from '../slices/navSlice'
import NavFavourites from './NavFavourites'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl`}>Good day, Luis</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete 
              placeholder="Para onde?"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
              fetchDetails={true}
              enablePoweredByContainer={false}
              styles={toInputBoxStyles}
              query={{
                key: 'API_KEY',
                language: 'pt-BR',
              }}
              onPress={(data, details = null) => {
                dispatch(setDestination({
                  location: details.geometry.location,
                  description: data.description
                }))

                navigation.navigate('RideOptionsCard')
              }}
            />
          </View>

          <NavFavourites />
        </View>

        <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
          <TouchableOpacity 
            style={tw`flex flex-row justify-between px-4 bg-black w-24 py-3 rounded-full`}
            onPress={() => navigation.navigate('RideOptionsCard')}
          >
            <FontAwesome name="car" size={16} color="white" />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={tw`flex flex-row bg-white w-24 py-3 justify-between px-4 rounded-full`}
            onPress={() => navigation.navigate('RideOptionsCard')}
          >
            <FontAwesome name="car" size={16} color="black" />
            <Text style={tw`text-black text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
})
