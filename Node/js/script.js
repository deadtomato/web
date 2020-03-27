'use strict';

var template = document.querySelector('#zoom').content.querySelector('.zoom');
var article = document.querySelector('.article');
var imgs = article.querySelectorAll('.article__img');
var zoomImg = template.cloneNode(true);
var closeBtn = zoomImg.querySelector('.close');
var element = zoomImg.querySelector('.zoom__img');

var removeZoomImg = function () {
  var element = article.querySelector('.zoom');
  if (element) {
    article.removeChild(element);
  }
  
}

var onImgClick = function (evt) {
  removeZoomImg();
  element.src = evt.target.src;
  element.alt = evt.target.alt;
  article.appendChild(zoomImg);
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

var onCloseBtnClick = function (evt) {
  evt.preventDefault();
  removeZoomImg();
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
} 

var onDocumentKeydown = function (evt) {
  if (evt.key === 'Escape') {
    removeZoomImg();
  }
}

imgs.forEach(function (img) {
  img.addEventListener('click', onImgClick);
});

