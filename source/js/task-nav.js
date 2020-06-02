const btn = document.querySelector(`.page-content__tasks-nav-btn`);
const taskNav = document.querySelector(`.task-nav`);

const SCROLL_HEIGHT = 478;

const onBtnClick = (evt) => {
  evt.preventDefault();
  taskNav.classList.toggle(`hide`);
  btn.classList.toggle(`rotate`);
};

const showBtn = () => {
  if (!btn.classList.contains(`show`)) {
    btn.classList.add(`show`);
    btn.addEventListener(`click`, onBtnClick);
  }
};

const hideBtn = () => {
  if (btn.classList.contains(`show`)) {
    btn.classList.remove(`show`);
    if (!taskNav.classList.contains(`hide`)) {
      taskNav.classList.add(`hide`);
    }
    btn.removeEventListener(`click`, onBtnClick);
  }
}

window.addEventListener(`scroll`, () => {
  window.scrollY > SCROLL_HEIGHT ? showBtn() : hideBtn();
});