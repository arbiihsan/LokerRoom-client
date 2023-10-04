import { View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SearchMapsComponents from '../components/searchMaps';
import * as Location from 'expo-location';
import GoogleMaps from '../components/googleMaps';
import { Button } from 'react-native';

export default function MapContainer({ navigation }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [region, setRegion] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState({}); // To store markers
  console.log(location);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    if (location) {
      setRegion({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0.00502,
        longitudeDelta: 0.0100,
      });
    }
  }, [location]);
  // console.log(region);

  // const onRegionChange = (newRegion) => {
  //   setRegion(newRegion);
  // };

  const searchByLocationMarker = (lat, lng, title) => {
    console.log(lat, lng, "from map Container");
    const newMarker = { // Generate a unique ID for the marker
      coordinate: { latitude: lat, longitude: lng },
      title: title
    };
    setMarkers(newMarker)
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.00502,
      longitudeDelta: 0.0100,
    });
  }

  const onLongPress = (event) => {
    // Extract latitude and longitude from the event

    const { latitude, longitude } = event?.nativeEvent.coordinate;
    console.log(latitude, longitude);
    const newMarker = {
      coordinate: { latitude, longitude },
      title: `input title`,
    };
    setMarkers(newMarker);

    // Create a new marker object and add it to the markers array
  };

  const onClick = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    navigation.navigate("JobAdd", { latitude, longitude });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'azure' }}>
      <View style={{ flex: 1, marginBottom: 70 }}>
        {/* Google Maps */}
        <GoogleMaps region={region} markers={markers} onLongPress={onLongPress} onClick={onClick} />
      </View>
      {/* Search Maps Component */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <SearchMapsComponents onSearch={searchByLocationMarker}
          onSuggestionsShow={() => setShowSuggestions(true)}
          onSuggestionsHide={() => setShowSuggestions(false)}
        />
      </View>
      {/* Overlay for suggestions */}
      {showSuggestions && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1, // Ensure it's above the Google Maps
          }}
        />
      )}
    </View>
  );
}
