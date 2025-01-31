import { useState } from "react";
import YouTubeEmbed from "./YouTubeEmbed";

const assets = {
  grape: {
    image: `${process.env.PUBLIC_URL}/images/grape.png`,
    video: "OgP2D-uYY68",
    position: { left: "40%", bottom: "30%" }
  },
  kiwi: {
    image: `${process.env.PUBLIC_URL}/images/kiwi.png`,
    video: "Fy1M3untphg",
    position: { left: "50%", bottom: "35%" }
  },
  melon: {
    image: `${process.env.PUBLIC_URL}/images/melon.png`,
    video: "n-gciIGOqE4",
    position: { left: "60%", bottom: "30%" }
  },
  pine: {
    image: `${process.env.PUBLIC_URL}/images/pine.png`,
    video: "TYRt88u47Do",
    position: { left: "30%", bottom: "40%" }
  },
  raspberry: {
    image: `${process.env.PUBLIC_URL}/images/raspberry.png`,
    video: "6dsfI6lHnSU",
    position: { left: "70%", bottom: "40%" }
  },
  strawberry: {
    image: `${process.env.PUBLIC_URL}/images/strawberry.png`,
    video: "HmjLK6ejid8",
    position: { left: "50%", bottom: "65%" }
  }
};

export default function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const fruitSize = 150; // フルーツ画像の静的サイズ（変更可能）
  const plateSize = 1200; // 皿画像の静的サイズ（変更可能）
  const platePositionX = 120; // 皿のX軸位置調整
  const platePositionY = 600; // 皿の位置調整
  const buttonSize = 100; // クリック可能範囲のサイズ
  const buttonOffsetY = -120; // ボタンの位置を少し上に調整

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen h-screen bg-white bg-no-repeat bg-cover"
         style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/front.png)`,
                  backgroundPosition: "top center",
                  backgroundSize: "contain" }}>
      <div className="relative w-full max-w-screen-lg h-full flex flex-col items-center justify-center">
        {/* 動画表示エリア（フルーツ選択時に表示） */}
        {selectedVideo && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/5 flex items-center justify-center bg-black shadow-lg rounded-lg">
            <YouTubeEmbed embedId={selectedVideo} />
          </div>
        )}
      </div>

      {/* 皿画像（plate.png）を追加 */}
      <div className="absolute bottom-0 w-full flex justify-center" style={{ transform: `translate(${platePositionX}px, ${platePositionY}px)` }}>
        <img src={`${process.env.PUBLIC_URL}/images/plate.png`} alt="Plate" style={{ width: `${plateSize}px`, height: "auto" }} className="object-contain" />
      </div>

      {/* フルーツ画像を皿の上に配置（Gridレイアウトを適用） */}
      {Object.keys(assets).map((fruit) => (
        <div key={fruit} style={{
          position: "absolute",
          left: assets[fruit].position.left,
          bottom: assets[fruit].position.bottom,
          display: "grid",
          placeItems: "center",
          width: `${fruitSize}px`,
          height: `${fruitSize}px`,
        }}>
          <img src={assets[fruit].image} alt={fruit}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "none"
            }}
            className="object-contain filter drop-shadow-none"
          />
          <button onClick={() => setSelectedVideo(assets[fruit].video)}
            className="p-0 border-none hover:scale-105 transition-transform"
            style={{
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
              backgroundColor: "transparent",
              boxShadow: "none",
              cursor: "pointer",
              border: "none", // ボタンの枠線を透明にする
              transform: `translateY(${buttonOffsetY}px)` // ボタンを少し上に移動
            }}
          />
        </div>
      ))}
    </div>
  );
}
