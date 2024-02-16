import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewRef = createRef<WebView>()
  const [connected, setConnected] = useState<boolean>()

  useEffect(()=>{
    const messageData = {
      source: "react-native-web-view",
      message: "Hello from React Native"
    }

    if(connected) webViewRef.current.postMessage(JSON.stringify(messageData))
  },[connected])

  return (
    <View style={styles.container}>
      <WebView 
        ref={webViewRef}
        source={{ uri: "http://localhost:5173/" }} 
        style={styles.webView} 
        onError={(e)=> console.error(e)}
        onMessage={(event)=>{
          console.log("Received message -",event.nativeEvent.data)
          setConnected(true)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'blue',
  }
});
