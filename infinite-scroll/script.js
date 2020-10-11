const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0
let totalImages = 0
let photoArray = []

// Unsplash API
const count = 5
const apiKey = '3PUX0hCWOqk4mvbMqGhOoizJFEpb4ICboDBW7_RDMQw'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
        count = 30;
    }
}

// Helper function to Set Attributers on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photoArray.length
    
    // run function for each object in photoArray
    photoArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create img for phote
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        displayPhotos()
    } catch (err) {
        // catch error
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// on load
getPhotos()