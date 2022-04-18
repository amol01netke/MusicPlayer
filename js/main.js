const musicContainer = document.querySelector('.music-container');
const music = document.querySelector('#audio');
const musicCover = document.querySelector('#music-cover');
const trackTitle = document.querySelector('.track-title');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const next = document.querySelector('#next');

//track titles
const tracks = ['Angrezi Beat', 'Brown Rang', 'Lut Gaye', 'Mockingbird', 'Stan'];

//index of track
let trackIndex = 0;

//initially load a track 
loadTrack(tracks[trackIndex]);

//update track
function loadTrack(track) {
    trackTitle.querySelector('marquee').innerText = track;
    track = track.toLowerCase();
    music.src = `music/${track}.mp3`;
    musicCover.src = `images/${track}.jpg`;
}

//play a track
function playTrack() {
    musicContainer.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');

    music.play();
}

//pause a track
function pauseTrack() {
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');

    music.pause();
}

//play previous track
function playPreviousTrack() {
    trackIndex--;

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    loadTrack(tracks[trackIndex]);
    playTrack();
}

//play next track
function playNextTrack() {
    trackIndex++;

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    loadTrack(tracks[trackIndex]);
    playTrack();
}

//event listeners
play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseTrack();
    }
    else {
        playTrack();
    }
});

previous.addEventListener('click', playPreviousTrack);
next.addEventListener('click', playNextTrack);

music.addEventListener('timeupdate', () => {
    const duration = music.duration;
    let currentTime = music.currentTime;
    let progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    time.querySelector('span').innerText = currentTime;
});

music.addEventListener('ended', playNextTrack);

progressContainer.addEventListener('click', (e) => {
    const click = e.offsetX;
    music.currentTime = click;
});
