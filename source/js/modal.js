const openModalBtn = document.querySelector(`.page-content__modal-open-btn`);

const modal = document.querySelector(`.modal`);
const bg = document.querySelector(`.bg`);
const modalCloseBtn = modal.querySelector(`.modal__close`);

const onOpenModalBtnClick = (evt) => {
  evt.preventDefault();
  if (!modal.classList.contains(`modal--show`) && !bg.classList.contains(`bg--show`)) {
    modal.classList.add(`modal--show`);
    bg.classList.add('bg--show');
    modalCloseBtn.addEventListener(`click`, onCloseModalBtnClick);
    document.addEventListener(`keydown`, onDocumentKeyDown);
  }
};

const onCloseModalBtnClick = () => {
  if (modal.classList.contains(`modal--show`) && bg.classList.contains(`bg--show`)) {
    modal.classList.remove(`modal--show`);
    bg.classList.remove('bg--show');
    modalCloseBtn.removeEventListener(`click`, onCloseModalBtnClick);
    document.removeEventListener(`keydown`, onDocumentKeyDown);
  }
};

const onDocumentKeyDown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    if (modal.classList.contains(`modal--show`) && bg.classList.contains(`bg--show`)) {
      modal.classList.remove(`modal--show`);
      bg.classList.remove('bg--show');
      modalCloseBtn.removeEventListener(`click`, onCloseModalBtnClick);
      document.removeEventListener(`keydown`, onDocumentKeyDown);
    }
  }
};

openModalBtn.addEventListener(`click`, onOpenModalBtnClick);
