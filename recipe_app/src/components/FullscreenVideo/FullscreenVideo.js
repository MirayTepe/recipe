import React from 'react';
import { WebView } from 'react-native-webview';

const FullscreenVideo = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1&playsinline=1&showinfo=0&controls=1&fullscreen=1`;

  return (
    <WebView
      allowsFullscreenVideo
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabled
      source={{ uri: videoUrl }}
    />
  );
};

export default FullscreenVideo;
