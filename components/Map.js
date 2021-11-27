import React, { useRef, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

import { useSelector } from 'react-redux'
import { selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import { selectDestination } from '../slices/navSlice'

import tw from 'tailwind-react-native-classnames'
import MapViewDirections from 'react-native-maps-directions'

import { useDispatch } from 'react-redux'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)

  const dispatch = useDispatch()

  const mapRef = useRef(null)

  useEffect(() => {
    if(!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], { 
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination])

  useEffect(() => {
    if(!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${Platform.OS === 'android' ? 
      `${origin.location.lat}%2C${origin.location.lng}` : `${origin.description}`}
      &destinations=${Platform.OS === 'android' ? 
      `${destination.location.lat}%2C${destination.location.lng}` : `${destination.description}`}
      &key=API_KEY`).then((res) => res.json())
      .then(data => {
        console.log(data)
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })
    }

    getTravelTime()
  }, [origin, destination])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`} 
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    > 

      {origin && destination && (
        <MapViewDirections 
          origin={{
            longitude: origin.location.lng,
            latitude: origin.location.lat
          }}
          destination={{
            longitude: destination.location.lng,
            latitude: destination.location.lat
          }}
          apikey={'API_KEY'}
          lineDashPattern={[0]}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})
