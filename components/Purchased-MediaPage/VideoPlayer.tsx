"use client";
import { memo, useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addPostViewAction } from "@/redux/feed/feedAction";

const VideoPlayer = memo(function VideoPlayer({
  src,
  publicId,
}: {
  src: string;
  publicId: string;
}) {
  // console.log("🎥 VideoPlayer render");
  const dispatch = useDispatch<AppDispatch>();
  const viewed = useSelector((state: RootState) => state.feed.viewed);
  const hasFiredRef = useRef(false); // 🔒 extra safety (no double fire)
  useEffect(() => {
    if (!viewed[publicId]) {
      // console.log("👁 View fired on mount:", publicId);
      dispatch(addPostViewAction(publicId));
    }
  }, [publicId]);

  return (
    <Plyr
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
      onPlay={() => {
        console.log("▶️ onPlay fired for:", publicId);
        // console.log("hasFiredRef:", hasFiredRef.current);
        // console.log("already viewed:", viewed[publicId]);
        if (!viewed[publicId] && !hasFiredRef.current) {
          hasFiredRef.current = true;
          console.log("👁 View fired from VideoPlayer:", publicId);
          dispatch(addPostViewAction(publicId));
        }
      }}
    />
  );
});

export default VideoPlayer;
