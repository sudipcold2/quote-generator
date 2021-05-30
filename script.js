
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
//const twitterBtn = document.getElementById('twitter');
const nativeShareBtn = document.getElementById('native-share');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(){
    showLoadingSpinner();   
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    
    //Check if author exist
    if(!quote.author && quote.author === ''){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    //check for quote length and adjust quote text display
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    fetchCounter = 0;
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


let apiQuotes = [];

let fetchCounter = 0;
async function getQuotes(){
    const API_URL = "https://type.fit/api/quotes";
    try{
        const response = await fetch(API_URL);
        apiQuotes = await response.json();
        newQuote();
    }catch(e){
        if(fetchCounter === 10){
            throw new Error("Couldn't fetch Quotes");
        }else{
            fetchCounter++;
            getQuotes();
        }
    }   
}

getQuotes();
showLoadingSpinner();

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

const shareData = {
    text: `${quoteText.textContent} - ${authorText.textContent}`
}
async function nativeShare() {
    if (navigator.canShare){
        try {
            await navigator.share(shareData)
            console.log('shared');
        } catch(err) {
            console.log('failed to share');
        }
    }else{
        console.log('System doesn\'t support web share');
    }
}

//EventListeners
newQuoteBtn.addEventListener('click', newQuote);
//twitterBtn.addEventListener('click', tweetQuote);
nativeShareBtn.addEventListener('click', nativeShare);