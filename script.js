document.addEventListener("DOMContentLoaded", function () {
    const fruitImages = document.querySelectorAll(".fruit");
    const videoContainer = document.getElementById("video-container");
    const youtubeVideo = document.getElementById("youtube-video");

    fruitImages.forEach(fruit => {
        fruit.addEventListener("click", function () {
            const videoId = this.getAttribute("data-video");
            youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;

            // 動画を表示
            videoContainer.style.display = "block";

            // YouTube 動画の終了を監視
            let checkVideoInterval = setInterval(() => {
                if (youtubeVideo.contentWindow) {
                    youtubeVideo.contentWindow.postMessage(
                        '{"event":"listening","id":1}', "*"
                    );
                }
            }, 1000);

            // メッセージイベントを監視し、動画が終了したら閉じる
            window.addEventListener("message", function (event) {
                if (typeof event.data === "string" && event.data.includes("onStateChange")) {
                    const state = JSON.parse(event.data).info;
                    if (state === 0) {  // 0 = 動画終了
                        videoContainer.style.display = "none"; // 動画を非表示
                        youtubeVideo.src = "";  // 動画をリセット
                        clearInterval(checkVideoInterval);
                    }
                }
            });
        });
    });
});
