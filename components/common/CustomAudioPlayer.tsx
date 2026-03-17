import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const CustomAudioPlayer = ({ src }: { src: string }) => {
  return (
    <div className="custom-audio-player">
      <AudioPlayer
        src={src}
        autoPlay={false}
        showJumpControls={false}
        showSkipControls={false}
        customAdditionalControls={[]}  // removes extra icons
        customVolumeControls={[]}     // removes volume
        layout="horizontal"
      />
    </div>
  );
};

export default CustomAudioPlayer;