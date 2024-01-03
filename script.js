// 1 >> GI ELEMENTS
const loaderFirst = document.getElementById('loader-first');
const loaderMore = document.getElementById('loader-more');
const imgGallery = document.getElementById('img-gallery');

// 2 >> VARIABLES
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// 3 >> API CONSTS
let count = 30
const apiKey = 'xZNSVx0q1W3ieDPbpZ3wPDgZTSBs6e1hwDU7qDfi580'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 6 >> FUNCTION -> SET ATTRS
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// 7 >> FUNCTION -> CHECK IF ALL IMAGES IS LOADED
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loaderFirst.hidden = true
    }
}

// 5 >> FUNCTION -> CREATE ELEMENTS FOR LINKS, PHOTOS, ADD TO DOM
function displayPhotos() {
    //7
    imagesLoaded = 0
    totalImages = photosArray.length
    //5
    photosArray.forEach(photo => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const imgWrap = document.createElement('div')
        setAttributes(imgWrap, {
            class: 'img-wrap'
        })
        const img = document.createElement('img')
        setAttributes(img, {
            class: 'img',
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //7
        img.addEventListener('load', imageLoaded);
        //5
        imgWrap.appendChild(img)
        item.appendChild(imgWrap)
        imgGallery.appendChild(item)
    });
}

// 4 >> GET PHOTOS ON UNSPLASH.COM API 
async function getPhotos() {
    try {
        const res = await fetch(apiUrl)
        photosArray = await res.json()
        displayPhotos()
    } catch (error) {
        throw error
    }
}

// 8 >> LOAD IMAGES NEAR SCROLLING FROM BOTTOM OF SCREEN
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// 5 >> ON-LOAD
getPhotos()