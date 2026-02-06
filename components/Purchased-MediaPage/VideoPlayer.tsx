"use client";
import { memo, useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addPostViewAction } from "@/redux/feed/feedAction";
import { updateVideoProgress } from "@/redux/purchasedMedia/Action";
import { debounce } from "@/libs/helper";

interface VideoPlayerProps {
  src: string;
  publicId: string;   // 👁 views
  postId: string;     // ▶️ progress (DB)
  watchedSeconds?: number;
  duration?: number;
}

const VideoPlayer = memo(function VideoPlayer({
  src,
  publicId,
  postId,
  watchedSeconds,
}: VideoPlayerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const viewed = useSelector((state: RootState) => state.feed.viewed);
  const plyrRef = useRef<any>(null);
  const lastSentRef = useRef(0);
  const hasViewedRef = useRef(false);
  const progressSenderRef = useRef<any>(null);

  /* 👁 View count (publicId based) */
  useEffect(() => {
    if (!viewed[publicId]) {
      dispatch(addPostViewAction(publicId));
    }
  }, [publicId]);

  useEffect(() => {
  progressSenderRef.current = debounce(() => {
    const player = plyrRef.current?.plyr;
    if (!player || !player.duration) return;

    dispatch(
      updateVideoProgress({
        postId,
        watchedSeconds: Math.floor(player.currentTime),
        duration: Math.floor(player.duration),
      })
    );
  }, 8000); // ✅ 8 seconds
}, [postId]);

useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      progressSenderRef.current?.flush();
    }
  };

  document.addEventListener("visibilitychange", handleVisibility);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibility);
    progressSenderRef.current?.flush();
  };
}, []);


  /* 💾 Progress sender (throttled) */
  const sendProgress = (force = false) => {
    const player = plyrRef.current?.plyr;
    if (!player || !player.duration) return;

    const current = Math.floor(player.currentTime);

    if (!force && Math.abs(current - lastSentRef.current) < 5) return;

    lastSentRef.current = current;

    dispatch(
      updateVideoProgress({
        postId, // ✅ DB ID
        watchedSeconds: current,
        duration: Math.floor(player.duration),
      })
    );
  };

  return (
   <Plyr
  ref={plyrRef}
  source={{
    type: "video",
    sources: [{ src, type: "video/mp4" }],
  }}
  options={{
    autoplay: true,
    controls: [
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "fullscreen",
    ],
  }}
  onLoadedMetadata={() => {
    const player = plyrRef.current?.plyr;
    if (player && watchedSeconds) {
      player.currentTime = watchedSeconds;
    }
  }}
  onTimeUpdate={() => {
    progressSenderRef.current?.();
  }}
  onPause={() => {
    progressSenderRef.current?.flush();
  }}
  onEnded={() => {
    progressSenderRef.current?.flush();
  }}
/>


  );
});

export default VideoPlayer;
