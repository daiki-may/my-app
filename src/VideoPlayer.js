import { useState } from "react";
import YouTubeEmbed from "./YouTubeEmbed";

const assets = {
  grape: {
    image: `${process.env.PUBLIC_URL}/images/grape.png`,
    video: "OgP2D-uYY68"
  },
  kiwi: {
    image: `${process.env.PUBLIC_URL}/images/kiwi.png`,
    video: "Fy1M3untphg"
  },
  melon: {
    image: `${process.env.PUBLIC_URL}/images/melon.png`,
    video: "n-gciIGOqE4"
  },
  pine: {
    image: `${process.env.PUBLIC_URL}/images/pine.png`,
    video: "TYRt88u47Do"
  },
  raspberry: {
    image: `${process.env.PUBLIC_URL}/images/raspberry.png`,
    video: "6dsfI6lHnSU"
  },
  strawberry: {
    image: `${process.env.PUBLIC_URL}/images/strawberry.png`,
    video: "HmjLK6ejid8"
  }
};

export default function VideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* 動画表示エリア */}
        <div className="w-full h-64 bg-black flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
          {selectedVideo ? (
            <YouTubeEmbed embedId={selectedVideo} />
          ) : (
            <p className="text-white text-lg">Select a fruit below to see the avatar action!</p>
          )}
        </div>

        {/* 画像ボタン */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {Object.keys(assets).map((fruit) => (
            <button
              key={fruit}
              className="p-2 bg-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setSelectedVideo(assets[fruit].video)}
            >
              <img src={assets[fruit].image} alt={fruit} className="w-24 h-24 object-contain" />
              <p className="text-center mt-2 font-semibold">{fruit}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
