const template = document.querySelector('#zoom').content.querySelector('.zoom');
const article = document.querySelector('.article');
const imgs = article.querySelectorAll('.article__img');
const zoomImg = template.cloneNode(true);
const closeBtn = zoomImg.querySelector('.close');
const element = zoomImg.querySelector('.zoom__img');

const removeZoomImg = () => {
  const element = article.querySelector('.zoom');
  if (element) {
    article.removeChild(element);
  }

}

const onImgClick = (evt) => {
  removeZoomImg();
  element.src = evt.target.src;
  element.alt = evt.target.alt;
  article.appendChild(zoomImg);
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseBtnClick = (evt) => {
  evt.preventDefault();
  removeZoomImg();
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    removeZoomImg();
  }
}

imgs.forEach((img) => {
  img.addEventListener('click', onImgClick);
});

