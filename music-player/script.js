const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const duration = document.querySelector('#duration');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
];

/**
 * Play / pause.
 * @name isPlaying on-load = false
 *
 */
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');

    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

/**
 * Update DOM
 * @param {object} song - from song list
 */
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}

/**
 * Next / prev
 */
let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

/**
 * On-load select first song
 */

loadSong(songs[songIndex]);

/**
 * Update progress bar & time
 */
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

/**
 * Set progress bar on click
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime}
 */
function setProgressBar(e) {
    const width = this.clientWidth;
    const { offsetX } = e;
    const { duration } = music;
    music.currentTime = (offsetX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressContainer.addEventListener('click', setProgressBar);
/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event}
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event}
 */
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
