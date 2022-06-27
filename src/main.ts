const bodyScroll = (elem: HTMLDivElement | null) => {
  const body = document.querySelector('body')!;
  elem?.classList.contains('active') ? body.style.overflowY = 'hidden' : body.style.overflowY = 'auto';
}

const openMenu = () => {
  const burger_menu: HTMLDivElement = document.querySelector("#nav__toggle")!;
  const modalOverlay: HTMLDivElement = document.querySelector(".nav-bar__modal-overlay")!;

  burger_menu.addEventListener('click', () => {
    burger_menu.classList.toggle('active');
    modalOverlay.classList.toggle('active');
    bodyScroll(modalOverlay);
  })
  
  modalOverlay.addEventListener('click', (event) => {
    const target = event.currentTarget as HTMLDivElement;
    target.classList.remove('active');
    burger_menu.classList.remove('active');
    bodyScroll(modalOverlay);
  })  
}

const resetRadioCardsStyle = () => {
  document.querySelectorAll(".card-modal").forEach( item => {
    item.classList.remove('active');
  })
}

// const openModal = (modalName: HTMLDivElement) => {
//   document.querySelector(`${modalName}`)?.classList.add('active');
// }

// const closeModal = (modalName: HTMLDivElement) => {
//   document.querySelector(`${modalName}`)?.classList.remove('active');
// }


const toggleModal = (modalName: HTMLDivElement | null) => {
  modalName?.classList.toggle('active');
}

const selectedCardRadioButton = () => {
  const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')!;
  radioButtons.forEach( item => {
    item.addEventListener('change', () => {
      resetRadioCardsStyle();
      if(item.checked) 
        item.closest('.card-modal')?.classList.add('active');
    })
  })
}

const toggleModalRewards = () => {
  const modalRewards: HTMLDivElement | null = document.querySelector('.reward-modal');
  const modalCross: HTMLImageElement | null = document.querySelector('.modal__close');
  document.querySelector('.content__bottom button')?.addEventListener('click', () => {
    toggleModal(modalRewards);
  })
  modalCross?.addEventListener('click', () => {
    toggleModal(modalRewards);
  })
}

const bookmarkProject = () => {
  const bookmark: HTMLDivElement = document.querySelector('.bookmark')!;
  const bookmarkText: HTMLDivElement = document.querySelector('.bookmark span')!;
  bookmark.addEventListener('click', () => {
    bookmark.classList.contains('active') ? bookmarkText.textContent = 'Bookmark' : bookmarkText.textContent = 'Bookmarked'; 
    bookmark.classList.toggle('active');  
  })

}

openMenu();
bookmarkProject();
selectedCardRadioButton();
toggleModalRewards();

export {};
