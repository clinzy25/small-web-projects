let numImages = 5;
const apiKey = 'CbYc4FWvszD7yIHkwBVxlNycxcmvEPaiR5WYelN4Ryo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImages}`;

const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let fetchedPhotos = [];
let loadMore = false;
let imagesLoaded = 0;
let totalImages = 0;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        fetchedPhotos = await response.json();
        displayImages()
    } catch (error) {
        alert('There was an issue fetching the images')
    }
}

function loadMoreImages() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        loadMore = true;
        loader.hidden = true;
        numImages = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImages}`;
    }
}

function displayImages() {
    imagesLoaded = 0;
    totalImages = fetchedPhotos.length;
    fetchedPhotos.forEach(photo => {
        let link = document.createElement('a');
            link.href = photo.links.html;
            link.target = '_blank'
        let img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            img.title = photo.alt_description;
            img.addEventListener('load', loadMoreImages);
        imageContainer.appendChild(link).appendChild(img);
    })
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && loadMore) {
      loadMore = false;
      getPhotos();
    }
});

getPhotos();