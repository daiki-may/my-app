import { useState, useEffect } from "react";
import YouTubeEmbed from "./YouTubeEmbed";

const assets = {
  grape: {
    image: `${process.env.PUBLIC_URL}/images/grape.png`,
    video: "OgP2D-uYY68",
    position: { left: "42%", bottom: "16%" }
  },
  kiwi: {
    image: `${process.env.PUBLIC_URL}/images/kiwi.png`,
    video: "Fy1M3untphg",
    position: { left: "50%", bottom: "15%" }
  },
  melon: {
    image: `${process.env.PUBLIC_URL}/images/melon.png`,
    video: "n-gciIGOqE4",
    position: { left: "54%", bottom: "9%" }
  },
  pine: {
    image: `${process.env.PUBLIC_URL}/images/pine.png`,
    video: "TYRt88u47Do",
    position: { left: "37%", bottom: "12%" }
  },
  raspberry: {
    image: `${process.env.PUBLIC_URL}/images/raspberry.png`,
    video: "6dsfI6lHnSU",
    position: { left: "56%", bottom: "16%" }
  },
  strawberry: {
    image: `${process.env.PUBLIC_URL}/images/strawberry.png`,
    video: "HmjLK6ejid8",
    position: { left: "47%", bottom: "9%" }
  }
};

export default function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoKey, setVideoKey] = useState(0);

  const fruitSize = 100; // フルーツ画像の静的サイズ（変更可能）
  const plateSize = 1000; // 皿画像の静的サイズ（変更可能）
  const platePositionX = 350; // 皿のX軸位置調整
  const platePositionY = -30; // 皿の位置調整
  const frontSize = 800; // front.pngのサイズ調整
  const frontPositionX = 450; // front.pngのX軸位置調整
  const frontPositionY = 0; // front.pngのY軸位置調整
  const videoSize = 1050; // 動画のサイズ調整
  const videoPositionX = 325; // 動画のX軸位置調整
  const videoPositionY = -618; // 動画のY軸位置調整
  const buttonSize = 80; // クリック可能範囲のサイズ
  const buttonOffsetY = -120; // ボタンの位置を少し上に調整

  useEffect(() => {
    if (selectedVideo === null) {
      setVideoKey((prevKey) => prevKey + 1);
    }
  }, [selectedVideo]);

  const handleVideoEnd = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen h-screen bg-black">
      <div className="absolute w-full flex justify-center" style={{ transform: `translate(${frontPositionX}px, ${frontPositionY}px)`, zIndex: 5 }}>
        <img src={`${process.env.PUBLIC_URL}/images/front.png`} alt="Front" style={{ width: `${frontSize}px`, height: "auto" }} className="object-contain" />
      </div>

      {selectedVideo && (
        <div className="absolute w-full flex justify-center" style={{ transform: `translate(${videoPositionX}px, ${videoPositionY}px)`, zIndex: 10, position: "fixed" }}>
          <div style={{ width: `${videoSize}px`, height: "auto" }}>
            <YouTubeEmbed key={selectedVideo} embedId={selectedVideo} onEnd={() => setSelectedVideo(null)} />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full flex justify-center" style={{ transform: `translate(${platePositionX}px, ${platePositionY}px)`, zIndex: 2}}>
        <img src={`${process.env.PUBLIC_URL}/images/plate.png`} alt="Plate" style={{ width: `${plateSize}px`, height: "auto" }} className="object-contain" />
      </div>


      {Object.keys(assets).map((fruit) => (
        <div key={fruit} style={{
          position: "absolute",
          left: assets[fruit].position.left,
          bottom: assets[fruit].position.bottom,
          display: "grid",
          placeItems: "center",
          width: `${fruitSize}px`,
          height: `${fruitSize}px`,
          zIndex: 3
        }}
        onClick={() => {
          setSelectedVideo(assets[fruit].video);
          setVideoKey((prevKey) => prevKey + 1); // クリック時に強制リロード
        }}>
          <img src={assets[fruit].image} alt={fruit}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none",
              cursor: "pointer"
            }}
            className="object-contain filter drop-shadow-none"
          />
        </div>
      ))}
    </div>
  );
}