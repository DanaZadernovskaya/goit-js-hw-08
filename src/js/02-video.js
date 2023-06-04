import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
    const player = new Vimeo(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });
    player.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  // час відтворення у локальне сховище
  localStorage.setItem('videoplayer-current-time', currentTime);
});
document.addEventListener('DOMContentLoaded', () => {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
});

player.on('timeupdate', throttle((data) => {
  const currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000));
