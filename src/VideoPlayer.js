import { useState } from "react";

const assets = {
  grape: {
    image: `${process.env.PUBLIC_URL}/images/grape.png`, 
    video: "${process.env.PUBLIC_URL}/videos/grape2.mp4"
    // video: "https://drive.google.com/uc?id=1gw6a2VyGLkBiEXAkFVRfqVT_GMhAwBer"
  },
  kiwi: {
    image: `${process.env.PUBLIC_URL}/images/kiwi.png`,
    video: "https://drive.google.com/uc?id=1mR3pKG6FEhS2Xyw5tkz0Po0a_-WpngeD"
  },
  melon: {
    image: `${process.env.PUBLIC_URL}/images/melon.png`,
    video: "https://drive.google.com/uc?id=1WtVy6Il4qa2lOFKPDt4BxpC7yKkfSBgT"
  },
  pine: {
    image: `${process.env.PUBLIC_URL}/images/pine.png`, 
    video: "https://drive.google.com/uc?id=1wRhLTMJH2gzKt6Qg7coFkUsybQqUDzB2"  
  },
  raspberry: {
    image: `${process.env.PUBLIC_URL}/images/raspberry.png`,
    video: "https://drive.google.com/uc?id=1rQ9xQqVQWRmWxjbt729QRqn_SYb4HURI"
  },
  strawberry: {
    image: `${process.env.PUBLIC_URL}/images/strawberry.png`,
    video: "https://drive.google.com/uc?id=1b9Fy0Q7bIA8J2wrOVibutdKoSYj4aQBI"
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
            <video key={selectedVideo} controls autoPlay playsInline className="w-full h-full object-contain">
              <source src={selectedVideo} type="video/mp4" />
            </video>
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
