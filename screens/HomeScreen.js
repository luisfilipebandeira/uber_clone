import React from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'

import NavOptions from '../components/NavOptions'
import NavFavourites from '../components/NavFavourites'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{width: 100, height: 100}}
          resizeMode="contain"
          source={{ uri: "https://links.papareact.com/gzs"}}
        />

        <GooglePlacesAutocomplete
          placeholder='De onde e para onde?'
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18
            }
          }}
          query={{
            key: 'API_KEY',
            language: 'pt-BR',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
