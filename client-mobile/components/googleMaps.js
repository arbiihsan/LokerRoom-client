import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';

import { styles } from '../Styles/styles';
import { TouchableOpacity } from 'react-native';

export default function GoogleMaps(
  { region, markers, onLongPress, onClick }
) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        onLongPress={onLongPress ? onLongPress : undefined} // Handle long press events conditionally
      >
        {/* Render markers */}
        {Object.keys(markers).length === 0 ? (
          <></>
        ) : (
          <Marker coordinate={markers?.coordinate} title={markers?.title} onPress={onClick ? onClick : undefined}>
            <FontAwesome name="map-marker" size={40} color="#B12A5B" />
          </Marker>
        )}
      </MapView>
    </View>
  );
}
