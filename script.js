document.addEventListener("DOMContentLoaded", function () {
    const fruitImages = document.querySelectorAll(".fruit");
    const videoContainer = document.getElementById("video-container");
    const youtubeVideo = document.getElementById("youtube-video");

    fruitImages.forEach(fruit => {
        fruit.addEventListener("click", function () {
            const videoId = this.getAttribute("data-video");
            youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
            videoContainer.style.display = "block";

            // YouTube APIで動画終了を検知
            youtubeVideo.addEventListener("load", function () {
                youtubeVideo.contentWindow.postMessage(
                    JSON.stringify({ event: "listening", id: 1 }),
                    "*"
                );
            });

            window.addEventListener("message", function (event) {
                if (typeof event.data === "string" && event.data.includes('"event":"onStateChange"')) {
                    const data = JSON.parse(event.data);
                    if (data.info === 0) {
                        videoContainer.style.display = "none";
                        youtubeVideo.src = ""; // 動画をリセット
                    }
                }
            });
        });
    });
});
