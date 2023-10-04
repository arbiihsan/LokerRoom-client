import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_API_KEY } from '../config/mapApi';

export default function SearchMapsComponents({ onSearch }) {
  const ref = useRef();

  return (
    <View style={{flex: 1, marginTop: 21, padding: 15 , paddingEnd: 56}}>
    <GooglePlacesAutocomplete
      placeholder="Type a place"
        onPress={(data, details = null) => {
          onSearch(details?.geometry?.location?.lat, details?.geometry?.location?.lng, details?.name)
          // console.log(details.geometry.location.lat, details.geometry.location.lng, details.name)
          
        }}
      query={{ key: MAPS_API_KEY }}
      fetchDetails={true}
      onFail={(error) => console.log(error)}
      onNotFound={() => console.log('no results')}
      styles={{
        container: {
          flex: 1,
        },
        textInputContainer: {
          width: '100%',
        },
      }}
      />
      </View>
  );
}
