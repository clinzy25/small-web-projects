const button = document.querySelector('button');
const audioElement = document.querySelector('audio');

/**
 * Pass joke to VoiceRSS API with @method speech
 * Called from @function getJokes
 */
function tellMe(joke) {
    VoiceRSS.speech({
        key: '5cc9d4cfad324263b629f980d388754a',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

/** Get jokes from joke API */
async function getJokes() {
    let joke = '';
    const apiUrl =
        'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        /** Handle 2-part jokes */
        if (data.setup) joke = `${data.setup} ... ${data.delivery}`;
        else joke = data.joke;
        tellMe(joke);
        toggleButton();
    } catch (e) {
        console.log('whoops', e);
    }
}

function toggleButton() {
    button.disabled = !button.disabled;
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
