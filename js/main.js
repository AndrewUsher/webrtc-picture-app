let width = 500
let height = 0
let filter = 'none'
let streaming = false

const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
const photos = document.querySelector('.images')
const photoButton = document.getElementById('photo-button')
const clearButton = document.getElementById('clear-button')
const photoFilter = document.getElementById('photo-filter')

const options = {
  video: true,
  audio: false
}
navigator.mediaDevices.getUserMedia(options)
  .then(stream => {
    video.srcObject = stream
    video.play()
  })
  .catch(error => {
    console.log(`Error ${error}`)
  })

video.addEventListener('canplay', function (event) {
  if (!streaming) {
    // set canvas height
    height = video.videoHeight / (video.videoWidth / width)


    video.setAttribute('width', width)
    video.setAttribute('height', height)
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    streaming = true;
  }
}, false)

photoButton.addEventListener('click', function (event) {
  takePicture();

  event.preventDefault();
}, false)

clearButton.addEventListener('click', event => {
  photos.textContent = ''
  filter = 'none'
  video.style.filter = filter
  photoFilter.selectedIndex = 0
})

photoFilter.addEventListener('change', event => {
  filter = event.target.value
  video.style.filter = filter

  event.preventDefault()
})

function takePicture() {
  const ctx = canvas.getContext('2d')
  if (width && height) {
    // set canvas props
    canvas.width = width
    canvas.height = height
    // draw image of video onto canvas
    ctx.drawImage(video, 0, 0, width, height)
    // create image from canvas 
    var imgUrl = canvas.toDataURL('image/png')
    // 
    const img = document.createElement('img')
    //
    img.setAttribute('src', imgUrl)

    img.style.filter = filter

    photos.appendChild(img)
  }
}