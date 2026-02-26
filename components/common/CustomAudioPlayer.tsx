import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Default styles

const CustomAudioPlayer = ({ src }: { src: string }) => {
  
  return (
    <div className="custom-audio-player">
      <AudioPlayer
        src={src}
        customVolumeControls={[]}
        timeFormat={"mm:ss"}
      />
    </div>
  );
};

export default CustomAudioPlayer;
