const quoteContainter = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

/**
 * @var{array} apiQuotes container for quote fetch populated on-load, once only.
 */
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainter.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainter.hidden = false;
    loader.hidden = true;
}

/**
 * Select random quote from api fetch
 * Populate @element quoteContainer with relevant data
 */
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = '- Unknown';
    } else {
        authorText.textContent = `- ${quote.author}`;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert('There was a problem fetching the quote');
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

/**
 * On-load
 */
getQuotes();
