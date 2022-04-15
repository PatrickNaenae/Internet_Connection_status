const statusDisplay = document.getElementById('status');
const image = document.getElementById('image');
const bgColor = document.querySelector('.main');

function setColor() {
  bgColor.classList.add('online');
}

async function connectionStatus() {
  try {
    const fetchResult = await fetch('https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' + (new Date()).getTime());
    image.src = './image/online.png';
    setColor();
    return fetchResult.status >= 200 && fetchResult.status < 300;
  } catch (e) {
    statusDisplay.textContent = 'OOOPS!!!, Your Internet connection is down';
    image.src = './image/offline.png';
    bgColor.classList.remove('online');
  }
}

// Monitor the Connection
setInterval(async () => {
  const result = await connectionStatus();
  if (result) {
    statusDisplay.textContent = 'You are Online, Connection looks good';
    setColor();
  }
}, 5000)

// Check connection onload
window.addEventListener('load', async () => {
  if (connectionStatus()) {
    statusDisplay.textContent = 'You are Online, Connection looks good';
    image.src = "./image/online.png";
    setColor();
  } else {
    statusDisplay.textContent = 'OOOPS!!!, Your Internet connection is down';
    image.src = './image/offline.png';
    bgColor.classList.remove('online');
  }
})