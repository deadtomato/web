const body = document.querySelector('body');
const form = modal.querySelector(`.modal__form`);
const resetFormBtn = modal.querySelector(`.modal__reset`);
const fieldset = form.querySelector(`.modal__fieldset`)
const fields = form.querySelectorAll(`.modal__input`);
const submitBtn = form.querySelector(`.modal__btn`)
const userFirstName = form.querySelector(`#firstNameField`);
const userLastName = form.querySelector(`#lastNameField`);

const REPO_NAME = `cathotel`;
const TIMEOUT = 3000;

const URL = "https://api.github.com/repos/papatomatoe/cathotel/generate";
const OWNER = `papatomatoe`;
const METHOD = `POST`;
const IS_PRIVATE = false;

const Headers = {
  Authorization: `Token 6e43be0e9304d2c7318e051ec80daf691c761e38`,
  Accept: "application/vnd.github.baptiste-preview+json"
};

const Messages = {
  SUCCESS: `Ваш репозиторий готов!`,
  WAITING: `Секундочку...`,
  ERROR: `Произошла ошибка, попробуйте повторить позже...`,
  INPUT_ERROR: `Необходимо заполнить все поля!`
}

const FieldStyles = {
  NORMAL:
  {
    NAME: `normal`,
    STYLE: `border: 1px solid #dedde2 ; box-shadow: none;`
  },

  WARNING: {
    NAME: `warning`,
    STYLE: `border-color: transparent; box-shadow: 0 0 0 2px tomato;`
  }
};

const FieldsetStyles = {
  ENABLE: `opacity: 1;`,
  DISABLE: `opacity: 0.5;`
};

function createAnchor(html_url) {
  const element = document.createElement(`div`);
  element.classList.add(`modal-anchor`);

  const anchor = document.createElement(`a`);
  anchor.classList.add(`message--anchor`);
  anchor.href = html_url;
  anchor.textContent = Messages.SUCCESS;

  element.appendChild(anchor);
  body.appendChild(element);
}

const createMessage = (text) => {
  const template = document.createElement(`p`);
  template.innerText = text;
  template.classList.add(`message`);
  modal.appendChild(template);
}

const setFieldsColor = (status) => {
  let style;
  switch (status) {
    case FieldStyles.NORMAL.NAME:
      style = FieldStyles.NORMAL.STYLE;
      break;
    case FieldStyles.WARNING.NAME:
      style = FieldStyles.WARNING.STYLE;
      break;
  }
  fields.forEach((it) => it.style = style);
}

const makeFieldsDisable = () => {
  if (!fieldset.disabled) {
    fieldset.disabled = true;
    fieldset.style = FieldsetStyles.DISABLE;
  }
  submitBtn.disabled = true;
}

const createWarning = (text) => {
  createMessage(text);
  setFieldsColor(FieldStyles.WARNING.NAME);
}

const createWaiting = (text) => {
  createMessage(text);
  makeFieldsDisable();
}

const clear = () => {
  const message = modal.querySelector(`.message`);
  if (message) {
    message.remove();
    setFieldsColor(FieldStyles.NORMAL.NAME);
  }

  if (fieldset.disabled) {
    fieldset.disabled = false;
    fieldset.style = FieldsetStyles.ENABLE;
  }

  submitBtn.disabled = false;
};

const modalClose = () => {
  modal.classList.remove(`modal--show`);
}

const generateID = () => {
  return Math.floor(Math.random() * 99999);
}

const createRepoFromPrivateTemp = async (evt) => {
  evt.preventDefault();

  clear();

  const date = new Date();

  if (userFirstName.value && userLastName.value) {

    createWaiting(Messages.WAITING);

    const repoTitle = `${date.getDate()}-${date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth()}-${date.getFullYear()}--${generateID()}--${REPO_NAME}`;

    const data = {
      name: repoTitle,
      owner: OWNER,
      description: `${userFirstName.value} ${userLastName.value}`,
      private: IS_PRIVATE
    };

    const response = await fetch(URL, {
      method: METHOD,
      headers: Headers,
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      const link = result.html_url;

      modalClose();
      createAnchor(link);

    } else {
      clear();
      createMessage(Messages.ERROR);
      makeFieldsDisable();
      setTimeout(clear, TIMEOUT);
      return;
    }
  } else {
    createWarning(Messages.INPUT_ERROR);
    setTimeout(clear, TIMEOUT);
  }
}

form.addEventListener(`submit`, createRepoFromPrivateTemp);
fields.forEach((it) => {
  it.addEventListener(`input`, clear);
})
resetFormBtn.addEventListener(`click`, clear);

