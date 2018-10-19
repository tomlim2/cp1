var chime;

var sounds = [];

function preload() {
  soundFormats('m4a');
  for (var i = 0; i < 15; i++) {
    let sound = loadSound('glockenspiel.m4a');
    sound.rate(0.5 * pow(2, i / 12)); // 12-semitone exponential scale

    sounds.push(sound);
  }
}

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);
  noStroke();

  for (var i = 0; i < sounds.length; i++) {
    let sound = sounds[i];
    if (sound.isPlaying()) {
      fill(map(sound.currentTime(), 0, sound.duration(), 255, 220));
      rect(width / sounds.length * (i + 0.5), height / 2, 25, 70);
    }
  }
}

function keyPressed() {
  if (key == 'a') {
    sounds[0].play();
  }
  if (key == 'w') {
    sounds[1].play();
  }
  if (key == 's') {
    sounds[2].play();
  }
  if (key == 'e') {
    sounds[3].play();
  }
  if (key == 'd') {
    sounds[4].play();
  }
  if (key == 'f') {
    sounds[5].play();
  }
  if (key == 't') {
    sounds[6].play();
  }
  if (key == 'g') {
    sounds[7].play();
  }
  if (key == 'y') {
    sounds[8].play();
  }
  if (key == 'h') {
    sounds[9].play();
  }
  if (key == 'u') {
    sounds[10].play();
  }
  if (key == 'j') {
    sounds[11].play();
  }
  if (key == 'k') {
    sounds[12].play();
  }
  if (key == 'o') {
    sounds[13].play();
  }
  if (key == 'l') {
    sounds[14].play();
  }
}