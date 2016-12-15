var confVideos = [];

var videos = document.getElementsByTagName("video");
var qtdVideos = videos.length;

for (var i = 0; i < qtdVideos; i++) {

    var id = videos[i].id;

    if (!confVideos[id])
        confVideos[id] = {
            id: id,
            started: false
        };
}


function playNextVideo() {

    var qtdVideos = confVideos.length;

    for (var i = 0; i < qtdVideos; i++) {

        var isVisible = videoIsVisible(confVideos[i].id);
        var started = confVideos[i].started;
        var hasPlaying = hasVideoPlaying();

        if (hasPlaying)
            break;

        if (isVisible && !started) {
            var video = document.getElementById(confVideos[i].id);

            confVideos[i].started = true;

            video.addEventListener("ended", function () {
                playNextVideo();
            }, false)

            playPause(video.parentElement);

            break;
        }
    }
};

function videoIsVisible(id) {
    var video = document.getElementById(id);

    if (video == null)
        return;

    var pos = video.getBoundingClientRect();

    if (pos.bottom <= window.innerHeight)
        return true;
    else
        return false;
};

function stopAllVideos() {

    var videos = document.getElementsByTagName("video");
    var qtdVideos = videos.length;

    for (var i = 0; i < qtdVideos; i++) {
        if (!videos[i].paused) {
            var parent = videos[i].parentElement;
            var playVideo = parent.lastElementChild;

            playVideo.style.display = "flex";
            videos[i].pause();
        }
    }
};

function hasVideoPlaying() {
    var videos = document.getElementsByTagName("video");
    var qtdVideos = videos.length;

    for (var i = 0; i < qtdVideos; i++) {
        if (!videos[i].paused)
            return true;
    }
};

function playPause(containerVideo, stopAll) {

    // Element video
    var video = containerVideo.firstElementChild;

    // Div play buttom
    var playVideo = containerVideo.lastElementChild;

    // If finish, show play buttom
    video.addEventListener("ended", function () {
        playVideo.style.display = "flex";
    }, false);


    if (video.paused) {

        // All stopped
        if (stopAll)
            stopAllVideos();

        // Hide play button
        playVideo.style.display = "none";

        video.play();

        for (var i = 0; i < confVideos.length; i++) {
            if (confVideos[i].id == video.id)
                confVideos[i].started = true;
        }

    } else {
        video.pause();
        playVideo.style.display = "flex";
    }
};