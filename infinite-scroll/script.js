/**
 * @var{number} numImages - Load 5 images first, then 30 @function{loadMoreImages}
 * This increases responsiveness of initial page load on slower connections
 */
let numImages = 5;
const apiKey = "CbYc4FWvszD7yIHkwBVxlNycxcmvEPaiR5WYelN4Ryo";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImages}`;

const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

/**
 * @var{bool} loadMore - Set to true @event scroll
 */
let fetchedPhotos = [];
let loadMore = false;
let imagesLoaded = 0;
let totalImages = 0;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    fetchedPhotos = await response.json();
    displayImages();
  } catch (error) {
    alert("There was an issue fetching the images");
  }
}

/**
 * Called from @event load in @function displayImages
 * Displays loader until all photos fetched
 * Tracks number of images on page
 */
function loadMoreImages() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loadMore = true;
    loader.hidden = true;
    numImages = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numImages}`;
  }
}

/**
 * Iterate through fetched photos and append to imageContainer
 * Set @var totalImages
 */
function displayImages() {
  imagesLoaded = 0;
  totalImages = fetchedPhotos.length;
  fetchedPhotos.forEach((photo) => {
    let link = document.createElement("a");
    link.href = photo.links.html;
    link.target = "_blank";
    let img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;
    img.title = photo.alt_description;
    img.addEventListener("load", loadMoreImages);
    imageContainer.appendChild(link).appendChild(img);
  });
}

/**
 * If user is 1000px from bottom of page, fetch more photos
 */
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    loadMore
  ) {
    loadMore = false;
    getPhotos();
  }
});

/**
 * On-load
 */
getPhotos();
