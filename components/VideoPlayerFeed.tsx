"use client";
import { memo, useRef, useMemo, useEffect } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayerFeed = memo(({ src }: { src: string }) => {
  const ref = useRef<any>(null);
  const source = useMemo(
    () => ({
      type: "video" as const,
      sources: [{ src, type: "video/mp4" as const }],
    }),
    [src]
  );
  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    const handleReady = () => {
      const video = player.media;
      if (video instanceof HTMLVideoElement) {
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        video.muted = true;
        video.controls = true;
      }
    };
    if (player?.on) {player.on("ready", handleReady);}
    return () => {
      if (player?.off) {player.off("ready", handleReady);}
    };
  }, []);

  return (
    <Plyr ref={ref} source={source} options={{controls: ["play", "progress", "mute", "fullscreen"], autoplay: false, muted: true, fullscreen: {enabled: true, iosNative: true,},}}/>
  );
});

VideoPlayerFeed.displayName = "VideoPlayerFeed";

export default VideoPlayerFeed;