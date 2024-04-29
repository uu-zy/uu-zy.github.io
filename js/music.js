const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause-button');
const playIcon = document.querySelector('.play-icon');

let rotationInterval;
let currentRotation = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    clearInterval(rotationInterval);
  } else {
    audio.play();
    startRotation(currentRotation);
  }

  isPlaying = !isPlaying;
}

function startRotation(initialRotation) {
  const rotationSpeed = 2; // 旋转速度，可以根据需要调整

  rotationInterval = setInterval(() => {
    playIcon.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    currentRotation = (currentRotation + rotationSpeed) % 360;
  }, 50); // 更新旋转频率，这里的时间间隔可以根据需要调整
}

playPauseButton.addEventListener('click', togglePlay);

audio.addEventListener('ended', () => {
  clearInterval(rotationInterval);
  playIcon.style.transform = `translate(-50%, -50%) rotate(0deg)`; // 播放结束时将旋转角度重置为0
  isPlaying = false; // 设置播放状态为假，以便重新播放
  audio.currentTime = 0; // 将音频时间设置为0，以便立即重新播放
  audio.play(); // 重新播放音频
});

audio.addEventListener('pause', () => {
  clearInterval(rotationInterval);
});

audio.addEventListener('play', () => {
  if (!isPlaying) {
    startRotation(currentRotation);
    isPlaying = true;
  }
});









