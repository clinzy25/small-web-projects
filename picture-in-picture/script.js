const videoElement = document.querySelector('video');
const button = document.querySelector('button');

/**
 * Prompt to select media stream, pass to videoElement, and play video
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices}
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject}
 */
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        console.log('There was an issue fetching the video.');
    }
}

/** Create a method to check if video is playing */
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(
            this.currentTime > 0 &&
            !this.paused &&
            !this.ended &&
            this.readyState > 2
        );
    },
});

/**
 * If the API is sharing a stream with @method playing, open picture in picture
 * Else re-prompt for stream source
 */
button.addEventListener('click', async () => {
    if (videoElement.playing) await videoElement.requestPictureInPicture();
    else selectMediaStream();
});

/** Onload */
selectMediaStream();
