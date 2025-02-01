// document.addEventListener("DOMContentLoaded", function () {
//     const fruitImages = document.querySelectorAll(".fruit");
//     const videoContainer = document.getElementById("video-container");
//     const youtubeVideo = document.getElementById("youtube-video");
//     let hideTimeout;  // 動画を非表示にするタイマー

//     fruitImages.forEach(fruit => {
//         fruit.addEventListener("click", function () {
//             const videoId = this.getAttribute("data-video");
//             const duration = parseInt(this.getAttribute("data-duration"), 10) || 50000; // デフォルト50秒

//             youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

//             // 動画を表示
//             videoContainer.style.display = "block";

//             // すでにセットされている非表示タイマーをクリア（連続クリック対策）
//             if (hideTimeout) {
//                 clearTimeout(hideTimeout);
//             }

//             // 指定時間後に動画を非表示
//             hideTimeout = setTimeout(() => {
//                 videoContainer.style.display = "none";
//                 youtubeVideo.src = ""; // 動画をリセット
//             }, duration);
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const fruitImages = document.querySelectorAll(".fruit");
    const videoContainer = document.getElementById("video-container");
    const youtubeVideo = document.getElementById("youtube-video");
    const experimentButtons = document.querySelectorAll(".experiment-btn");
    let selectedExperiment = "experiment1"; // 初期値
    let hideTimeout; // 動画非表示タイマー

    // Experiment 切り替えボタンのイベント
    experimentButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedExperiment = this.getAttribute("data-experiment");

            // ボタンのスタイルを更新
            experimentButtons.forEach(btn => btn.style.opacity = "0.6");
            this.style.opacity = "1"; 
        });
    });

    // 🍓 フルーツ画像のクリックイベント
    fruitImages.forEach(fruit => {
        fruit.addEventListener("click", function () {
            const videoId = this.getAttribute(`data-video-${selectedExperiment}`);
            const duration = parseInt(this.getAttribute(`data-duration-${selectedExperiment}`), 10) || 50000;

            if (!videoId) return;

            youtubeVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

            // 動画を表示
            videoContainer.style.display = "block";

            // 🔴 クリックしたフルーツの範囲を一時的に赤枠で表示
            fruitImages.forEach(f => f.style.border = "2px solid transparent"); // 他の枠をリセット
            this.style.border = "2px solid red"; 
            setTimeout(() => {
                this.style.border = "2px solid transparent"; // 1秒後に戻す
            }, 1000);

            // 既存のタイマーをクリア（連続クリック対策）
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }

            // 指定時間後に動画を非表示
            hideTimeout = setTimeout(() => {
                videoContainer.style.display = "none";
                youtubeVideo.src = ""; // 動画をリセット
            }, duration);
        });
    });
});

