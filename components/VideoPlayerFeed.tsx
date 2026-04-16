"use client";
import { memo, useRef, useMemo, useEffect } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayerFeed = memo(({ src }: { src: string }) => {
  const ref = useRef<any>(null);

  const source = useMemo(
    () => ({
      type: "video" as const, sources: [{ src, type: "video/mp4" as const }],
    }),
    [src]
  );

  useEffect(() => {
    const getPlayer = () => ref.current?.plyr ?? ref.current;

    const handleReady = () => {
      const player = getPlayer(); if (!player) return;
      const video = player.media as HTMLVideoElement | null; if (!video) return;
      video.setAttribute("playsinline", "true"); video.setAttribute("webkit-playsinline", "true"); video.muted = true; player.muted = true;
    };

    const handleEnterFullscreen = () => {
      const player = getPlayer();
      if (!player) return;
      setTimeout(() => {
        const video = player.media as HTMLVideoElement | null;
        if (!video) return;
        video.muted = false;
        player.muted = false;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            player.play();
          });
        }
      }, 100);
    };

    const handleExitFullscreen = () => {
      const player = getPlayer();
      if (!player) return;

      player.pause();
      player.muted = true;

      const video = player.media as HTMLVideoElement | null;
      if (video) video.muted = true;
    };
    const attachEvents = () => {
      const player = getPlayer();
      if (!player?.on) return;
      player.on("ready", handleReady);
      player.on("enterfullscreen", handleEnterFullscreen);
      player.on("exitfullscreen", handleExitFullscreen);
    };

    const timer = setTimeout(attachEvents, 0);
    return () => {
      clearTimeout(timer);
      const player = getPlayer();
      if (!player?.off) return;
      player.off("ready", handleReady);
      player.off("enterfullscreen", handleEnterFullscreen);
      player.off("exitfullscreen", handleExitFullscreen);
    };
  }, []);

  return (
    <Plyr ref={ref} source={source} options={{ controls: ["play", "progress", "mute", "fullscreen"], autoplay: false, muted: true, fullscreen: { enabled: true, iosNative: true, }, }} />
  );
});

VideoPlayerFeed.displayName = "VideoPlayerFeed";

export default VideoPlayerFeed;