"use client";

import { memo, useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateVideoProgress } from "@/redux/purchasedMedia/Action";
import { debounce } from "@/libs/helper";

interface VideoPlayerProps { src: string; publicId: string; postId: string; watchedSeconds?: number; duration?: number; }

const VideoPlayer = memo(function VideoPlayer({ src, publicId, postId, watchedSeconds, }: VideoPlayerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const plyrRef = useRef<any>(null);
  const lastSentRef = useRef(0);
  const progressSenderRef = useRef<any>(null);

  /* ================= PROGRESS SENDER ================= */
  useEffect(() => {
    progressSenderRef.current = debounce(() => {
      const player = plyrRef.current;
      if (!player || !player.duration) return;

      dispatch(
        updateVideoProgress({
          postId,
          watchedSeconds: Math.floor(player.currentTime),
          duration: Math.floor(player.duration),
        })
      );
    }, 8000);

    return () => {
      progressSenderRef.current?.flush?.();
    };
  }, [postId, dispatch]);

  /* ================= VISIBILITY (TAB SWITCH) ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        progressSenderRef.current?.flush?.();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  /* ================= PLAYER READY ================= */
  useEffect(() => {
    const player = plyrRef.current;
    if (!player) return;
    const onReady = () => {
      const video = player.media;
      if (video instanceof HTMLVideoElement) {
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        video.muted = true;
      }
      if (watchedSeconds) {
        player.currentTime = watchedSeconds;
      }
    };
    if (player?.on) {
      player.on("ready", onReady);
    }
    return () => {
      if (player?.off) {
        player.off("ready", onReady);
      }
    };
  }, [watchedSeconds]);

  /* ================= EVENTS ================= */
  const handleTimeUpdate = () => { progressSenderRef.current?.(); };
  const handlePause = () => { progressSenderRef.current?.flush?.(); };
  const handleEnded = () => { progressSenderRef.current?.flush?.(); };

  return (
    <Plyr ref={plyrRef} source={{ type: "video", sources: [{ src, type: "video/mp4" }], }} options={{ autoplay: true, muted: true, controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen",], fullscreen: { enabled: true, iosNative: true, }, }} onTimeUpdate={handleTimeUpdate} onPause={handlePause} onEnded={handleEnded} />
  );
});

export default VideoPlayer;