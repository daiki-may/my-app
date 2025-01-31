import { useEffect, useRef } from "react";

const YouTubeEmbed = ({ embedId, onEnd }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(`youtube-player-${embedId}`, {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                onEnd(); // 動画が終了したら `onEnd()` を呼び出し
              }
            }
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
      tag.onload = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, [embedId, onEnd]);

  return (
    <div className="video-responsive">
      <iframe
        id={`youtube-player-${embedId}`}
        key={embedId} // `key` を指定して、動画が毎回更新されるようにする
        width="100%"
        height="auto"
        style={{ aspectRatio: "16/9" }}
        src={`https://www.youtube.com/embed/${embedId}?enablejsapi=1&rel=0&autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
