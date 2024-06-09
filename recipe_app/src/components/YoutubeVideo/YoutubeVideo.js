import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './styles';  

const YoutubeVideo = ({ videoId }) => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <View style={styles.videoContainer}>
      {!videoReady && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
      )}
      <YoutubePlayer
        height={300} 
        play={false}
        videoId={videoId}
        webViewStyle={{ opacity: videoReady ? 1 : 0 }}  
        onReady={() => setVideoReady(true)}
      />
    </View>
  );
};

export default YoutubeVideo;
