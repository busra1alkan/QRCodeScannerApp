/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View,Text,Vibration,Linking} from 'react-native';
import React, {useState, useEffect} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const App = () => {
  const [data, setData] = useState('QR Kodunuzu Taratınız.')

  const handleScanSuccess = (scannedData) => {
    setData(scannedData.data);
    Vibration.vibrate(200);

    if(scannedData.data.startsWith('http')){
      openURL(scannedData.data);
    }
  };

  const handleScanError = (error) => {
    console.log('QR kod tarama hatası: ',error);
    Vibration.vibrate([0,200,100,200]);
  };


  const openURL = (url) => {
      Linking.openURL(url);
    }

  return(
    <QRCodeScanner
    onRead={handleScanSuccess}
    onScanError={handleScanError}
    reactivate={true}
    reactivateTimeout={500}
    showMarker={true}
    topContent={
      <View>
        <Text style={{
              color: 'black',
              padding: 20,
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10,
              }}>{'QR Kod Okuyucu'}</Text>
      </View>
      }
    bottomContent={
      <View>
        <Text style={{
          color:'black',
          padding:20,
          fontSize:15,
          margin:10,
        }}>{data}</Text>
      </View>
    }
    cameraProps={{captureAudio: false}}
    onCameraError={handleScanError}
  />
  )
}
  

export default App;