const bodyScroll = (elem: HTMLDivElement | null) => {
  const body = document.querySelector('body')!;
  elem?.classList.contains('active') ? body.style.overflowY = 'hidden' : body.style.overflowY = 'auto';
}

const navToggle = () => {
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

const selectedCardRadioButton = () => {
  const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"')!;
  radioButtons.forEach( item => {
    item.addEventListener('change', () => {
      item.checked ? item.closest('.card-modal')?.classList.add("active") : item.closest('.card-modal')?.classList.remove('active');
    })
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

navToggle();
bookmarkProject();
selectedCardRadioButton();

export {};
