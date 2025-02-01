document.addEventListener("DOMContentLoaded", function () {
    const fruitImages = document.querySelectorAll(".fruit");
    const videoContainer = document.getElementById("video-container");
    const youtubeVideo = document.getElementById("youtube-video");

    fruitImages.forEach(fruit => {
        fruit.addEventListener("click", function () {
            const videoId = this.getAttribute("data-video");
            youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // 動画を表示
            videoContainer.style.display = "block";

            // 一定時間（例: 10秒）後に動画を非表示にする
            setTimeout(() => {
                videoContainer.style.display = "none"; // 動画を非表示
                youtubeVideo.src = ""; // 動画をリセット
            }, 49000); // 51秒（10000ミリ秒）後に非表示
        });
    });
});
