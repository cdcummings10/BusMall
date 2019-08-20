'use strict';

var imageUrls = [
  '/assets/imgs/bag.jpg',
  '/assets/imgs/banana.jpg',
  '/assets/imgs/bathroom.jpg',
  '/assets/imgs/boots.jpg',
  '/assets/imgs/breakfast.jpg',
  '/assets/imgs/bubblegum.jpg',
  '/assets/imgs/chair.jpg',
  '/assets/imgs/cthulhu.jpg',
  '/assets/imgs/dog-duck.jpg',
  '/assets/imgs/dragon.jpg',
  '/assets/imgs/pen.jpg',
  '/assets/imgs/pet-sweep.jpg',
  '/assets/imgs/scissors.jpg',
  '/assets/imgs/shark.jpg',
  '/assets/imgs/sweep.png',
  '/assets/imgs/tauntaun.jpg',
  '/assets/imgs/unicorn.jpg',
  '/assets/imgs/usb.gif',
  '/assets/imgs/water-can.jpg',
  '/assets/imgs/wine-glass.jpg'
];

var imageNames = [
  'R2D2 Luggage',
  'Banana Cutter',
  'Bathroom Tablet Stand',
  'Toeless Boots',
  'All-in-One Breakfast Maker',
  'Meatball Bubblegum',
  'Hump Chair',
  'Posable Cthulhu',
  'Dog-Duck',
  'Delicious Dragon Meat',
  'Utensil Pen Caps',
  'About-Time Pet Sweep',
  'Pizza Scissors',
  'Shark Simulator',
  'Make-em-Useful Baby Sweep',
  'Life-like Taun Taun',
  'Tasty Unicorn Meat',
  'Not Creepy Tentacle USB',
  'Very Effective Watering Can',
  'Posh Wine Glass'
];

var imageSection = document.getElementById('image_banner');

function Images( name, url ) {
  this.name = name;
  this.src = url;
  this.votes = 0;
  this.shown = 0;
  Images.list.push(this);
}
Images.list = [];

function createImages() {
  for (var i = 0; i < imageUrls.length; i++){
    new Images (imageNames[i], imageUrls[i]);
  }
}

function chooseRandomImage(){
  var randomImage = Math.floor(Math.random() * Images.list.length);
  return Images.list[randomImage];
}

var repeatCheckArray = [];
var figuresArray = [];
var scoresArray = [];
var numberOfLoops = 0;
createImages();
function renderRandomImage(){
  removePreviousImages();
  if (numberOfLoops < 25){
    for (var i = 0; i < 3; i++){
      var randomImage = chooseRandomImage();
      while(repeatCheckArray.includes(randomImage)){
        randomImage = chooseRandomImage();
      }
      
      scoresArray[i] = randomImage;
      randomImage.shown++;
      var newFigure = document.createElement('figure');
      var newImg = document.createElement('img');
      var newCaption = document.createElement('figcaption');
      
      newImg.src = randomImage.src;
      newCaption.textContent = randomImage.name;
      newFigure.appendChild(newImg);
      newFigure.appendChild(newCaption);
      imageSection.appendChild(newFigure);
      repeatCheckArray.push(randomImage);
      figuresArray.push(newFigure);
    }
    if(repeatCheckArray.length >= 6){
      repeatCheckArray.shift();
      repeatCheckArray.shift();
      repeatCheckArray.shift();
    }
    document.getElementsByTagName('figure')[0].addEventListener('click', chosenOne);
    document.getElementsByTagName('figure')[1].addEventListener('click', chosenTwo);
    document.getElementsByTagName('figure')[2].addEventListener('click', chosenThree);
    numberOfLoops++;
  }
  else {
    var elUl = document.createElement('ul');
    elUl.textContent = 'Totals:';
    for (var j = 0; j < Images.list.length; j++){
      var elLi = document.createElement('li');
      elLi.textContent = Images.list[j].votes + ' votes for the ' + Images.list[j].name;
      elUl.appendChild(elLi);
    }
    imageSection.appendChild(elUl);
  }
}
renderRandomImage();


function chosenOne(){
  scoresArray[0].votes++;
  renderRandomImage();
}
function chosenTwo(){
  scoresArray[1].votes++;
  renderRandomImage();
}
function chosenThree(){
  scoresArray[2].votes++;
  renderRandomImage();
}


function removePreviousImages (){
  while (imageSection.firstChild){
    imageSection.removeChild(imageSection.firstChild);
  }
}
