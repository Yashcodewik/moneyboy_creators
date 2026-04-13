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
    const player = ref.current?.plyr;
    if (!player) return;

    const video = player.media;

    // ✅ MUST for iOS
    if (video) {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    }

    const container = player.elements?.container;
    if (!container) return;

    const handleClick = (e: any) => {
      const btn = e.target.closest('[data-plyr="fullscreen"]');

      if (!btn) return;

      const v = player.media;

      // ✅ ONLY override on iOS
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;

      if (isIOS && v?.webkitEnterFullscreen) {
        e.preventDefault(); // stop broken default
        v.webkitEnterFullscreen(); // ✅ native iOS fullscreen
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Plyr
      key={src}
      ref={ref}
      source={source}
      options={{
        controls: ["play", "progress", "mute", "fullscreen"], // ✅ default UI
        autoplay: false,
        muted: true,
      }}
      playsInline
    />
  );
});

VideoPlayerFeed.displayName = "VideoPlayerFeed";

export default VideoPlayerFeed;
// "use client";
// import { memo, useRef, useMemo } from "react";
// import { Plyr } from "plyr-react";

// const VideoPlayerFeed = memo(({ src }: { src: string }) => {
//   const ref = useRef<any>(null);

//   const source = useMemo(
//     () => ({
//       type: "video" as const,
//       sources: [{ src, type: "video/mp4" as const }],
//     }),
//     [src]
//   );

//   return (
//     <Plyr
//       ref={ref}
//       source={source}
//       options={{
//         controls: ["play", "progress", "mute", "fullscreen"],
//         autoplay: false,
//       }}
//       playsInline
//     />
//   );
// });

// export default VideoPlayerFeed;