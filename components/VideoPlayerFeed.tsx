"use client";
import { memo, useRef, useMemo } from "react";
import { Plyr } from "plyr-react";

const VideoPlayerFeed = memo(({ src }: { src: string }) => {
  const ref = useRef<any>(null);

  const source = useMemo(
    () => ({
      type: "video" as const,
      sources: [{ src, type: "video/mp4" as const }],
    }),
    [src]
  );

  return (
    <Plyr
      ref={ref}
      source={source}
      options={{
        controls: ["play", "progress", "mute", "fullscreen"],
        autoplay: false,
      }}
      playsInline
    />
  );
});

export default VideoPlayerFeed;