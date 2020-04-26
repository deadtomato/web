
const openMenuBtn = document.querySelector('.page-header__btn--open');
const siteMenu = document.querySelector('.site-menu');
const closeMenuBtn = siteMenu.querySelector('.page-header__btn--close');

const onOpenMenuBtnClick = (evt) => {
  evt.preventDefault();
  if (!siteMenu.classList.contains('show')) {
    siteMenu.classList.add('show');
    closeMenuBtn.addEventListener('click', oncloseMenuBtnClick);
  }
};

const oncloseMenuBtnClick = (evt) => {
  evt.preventDefault();
  if (siteMenu.classList.contains('show')) {
    siteMenu.classList.remove('show');
    closeMenuBtn.removeEventListener('click', oncloseMenuBtnClick);
  }
}

openMenuBtn.addEventListener('click', onOpenMenuBtnClick);