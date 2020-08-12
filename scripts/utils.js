export const showModal = (modal) => {
  modal.classList.toggle('modal_opened');
  if (modal.classList.contains('modal_opened')) {
    document.addEventListener('mousedown', closeModalWithClick);
    document.addEventListener('keydown', closeModalWithEsc);
  } else {
    document.removeEventListener('mousedown', closeModalWithClick);
    document.removeEventListener('keydown', closeModalWithEsc);
  }
};

const closeModalWithClick = (evt) => {
  if (evt.target.classList.contains('modal')) {
    showModal(evt.target);
  }
};

const closeModalWithEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector('.modal_opened');
    if (openedModal) {
      showModal(openedModal);
    }
  }
};
