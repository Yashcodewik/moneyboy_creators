"use client";

import { memo, useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateVideoProgress } from "@/redux/purchasedMedia/Action";
import { debounce } from "@/libs/helper";

interface VideoPlayerProps {
  src: string;
  publicId: string;
  postId: string;
  watchedSeconds?: number;
}

const VideoPlayer = memo(function VideoPlayer({
  src,
  publicId,
  postId,
  watchedSeconds,
}: VideoPlayerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const plyrRef = useRef<any>(null);
  const lastSentRef = useRef(0);
  const progressSenderRef = useRef<any>(null);
  const isPlayerReadyRef = useRef(false);
  const isEndedRef = useRef(false);

  /* ================= PROGRESS SENDER ================= */
  useEffect(() => {
    progressSenderRef.current = debounce(() => {
      if (isEndedRef.current) return;

      const player = plyrRef.current?.plyr;

      if (!player || !isPlayerReadyRef.current) {
        console.log("❌ player not ready");
        return;
      }

      const duration = player.duration || 0;
      const currentTime = player.currentTime || 0;

      if (!duration) return;

      // ✅ AUTO COMPLETE FALLBACK
      if (currentTime >= duration - 1) {
        console.log("🔥 AUTO COMPLETE");

        isEndedRef.current = true;

        dispatch(
          updateVideoProgress({
            postId,
            watchedSeconds: duration,
            duration,
          })
        );

        return;
      }

      // ✅ prevent duplicate / backward
      if (currentTime <= lastSentRef.current) return;

      lastSentRef.current = currentTime;

      console.log("🚀 API CALL");

      dispatch(
        updateVideoProgress({
          postId,
          watchedSeconds: Math.floor(currentTime),
          duration: Math.floor(duration),
        })
      );
    }, 1500);

    return () => {
      progressSenderRef.current?.flush?.();
    };
  }, [postId, dispatch]);

  /* ================= VISIBILITY ================= */
  useEffect(() => {
    const handleVisibility = () => {
      if (isEndedRef.current) return;

      const player = plyrRef.current?.plyr;

      if (document.hidden && player && player.duration) {
        dispatch(
          updateVideoProgress({
            postId,
            watchedSeconds: Math.floor(player.currentTime),
            duration: Math.floor(player.duration),
          })
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [postId, dispatch]);

  /* ================= UNMOUNT SAVE ================= */
  useEffect(() => {
    return () => {
      if (isEndedRef.current) return;

      const player = plyrRef.current?.plyr;

      if (player && player.duration) {
        dispatch(
          updateVideoProgress({
            postId,
            watchedSeconds: Math.floor(player.currentTime),
            duration: Math.floor(player.duration),
          })
        );
      }
    };
  }, [postId, dispatch]);

  /* ================= PLAYER READY + ENDED ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const player = plyrRef.current?.plyr;

      if (player) {
        isPlayerReadyRef.current = true;
        console.log("✅ player ready");

        if (watchedSeconds) {
          player.currentTime = watchedSeconds;
        }

        // ✅ Native Plyr event (REAL FIX)
        const handleEndedEvent = () => {
          console.log("🎬 ENDED FIRED");

          if (isEndedRef.current) return;

          isEndedRef.current = true;

          dispatch(
            updateVideoProgress({
              postId,
              watchedSeconds: player.duration,
              duration: player.duration,
            })
          );
        };

        player.on("ended", handleEndedEvent);

        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);

      const player = plyrRef.current?.plyr;
      if (player) {
        player.off("ended");
      }
    };
  }, [watchedSeconds, postId, dispatch]);

  /* ================= EVENTS ================= */
  const handleTimeUpdate = () => {
    if (isEndedRef.current) return;
    progressSenderRef.current?.();
  };

  const handlePause = () => {
    if (isEndedRef.current) return;
    progressSenderRef.current?.flush?.();
  };

  const handleSeeked = () => {
    if (isEndedRef.current) return;
    progressSenderRef.current?.flush?.();
  };

  const handlePlay = () => {
    if (isEndedRef.current) return;
    progressSenderRef.current?.();
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
        muted: true,
        controls: [
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "fullscreen",
        ],
        fullscreen: { enabled: true, iosNative: true },
      }}
      onTimeUpdate={handleTimeUpdate}
      onPause={handlePause}
      onSeeked={handleSeeked}
      onPlay={handlePlay}
    />
  );
});

export default VideoPlayer;