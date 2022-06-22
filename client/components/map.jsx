
import { useLoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import React from 'react';

const libraries = ['places'];
const center = { lat: 48.8584, lng: 2.2945 };

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC4_g24UEAWJDOn0Xe__xbbtahmp7NPGKQ',
    libraries
  });
  if (!isLoaded) {
    return null;
  }
  return (
    <div className='google-map-container'>
      <div>
        <Autocomplete>
          <input/>
        </Autocomplete>
      </div>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }} onCli>
        <Marker position={center}/>
      </GoogleMap>
    </div>
  );
}

export default App;
