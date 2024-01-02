// 1 >> GI ELEMENTS
const loader = document.getElementById('loader');
const imgGallery = document.getElementById('img-gallery');

// 2 >> VARIABLES
let photosArray = []
let count = 15

// 3 >> API CONSTS
const apiKey = 'xZNSVx0q1W3ieDPbpZ3wPDgZTSBs6e1hwDU7qDfi580'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// 6 >> FUNCTION -> SET ATTRS
function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key])
    }
}

// 6 >> FUNCTION -> CREATE ELEMENTS FOR LINKS, PHOTOS, ADD TO DOM
function displayPhotos() {
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

// 5 >> ON-LOAD
getPhotos()