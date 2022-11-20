const toggleBodyScroll = (elem: HTMLDivElement | null) => {
  const body = document.querySelector('body')!;
  elem?.classList.contains('active') ? body.style.overflowY = 'hidden' : body.style.overflowY = 'auto';
}


const toggleMenu = () => {
  const burger_menu: HTMLDivElement = document.querySelector("#nav__toggle")!;
  const modalOverlay: HTMLDivElement = document.querySelector(".nav-bar__modal-overlay")!;

  burger_menu.addEventListener('click', () => {
    burger_menu.classList.toggle('active');
    modalOverlay.classList.toggle('active');
    toggleBodyScroll(modalOverlay);
  })
  
  modalOverlay.addEventListener('click', (event) => {
    const target = event.currentTarget as HTMLDivElement;
    target.classList.remove('active');
    burger_menu.classList.remove('active');
    toggleBodyScroll(modalOverlay);
  })
}


const resetRadioCardsStyle = () => {
  document.querySelectorAll(".card-modal").forEach( item => {
    item.querySelector('.card-modal__pledge-bottom')?.classList.remove('active');
    item.querySelector('.card-modal__error-message')?.classList.remove('active');
    item.classList.remove('active');
  })
}


// NEED REFACTORING
const toggleModal = (modalName: string) => {
  if(typeof modalName === 'string') {
    const modal: HTMLDivElement | null = document.querySelector(`[data-modal="${modalName}"]`);
    modal?.classList.toggle('active');
    window.addEventListener('click', (event) => {
      if ((event.target as Element).classList.contains('modal-trigger') && modalName ===  "modal-reward") {
        resetInputRewardModal();
        modal?.classList.remove('active');
        toggleBodyScroll(modal);
      } else if ((event.target as Element).classList.contains('modal-trigger')) {
        modal?.classList.remove('active');
        toggleBodyScroll(modal);
      }
    })
    resetInputRewardModal();
    toggleBodyScroll(modal);
  } else {
    throw new Error('Argument must be a string');
  }
}


const convertToInt = (totalString: string) : number => {
  if (typeof totalString === 'string') {
    const totalInt = Number(totalString.split(",").join(''));
    return totalInt;
  } else {
    throw new Error('Argument must be a string');
  }
}

const convertToString = (totalNumber: number) : string => {
  if (typeof totalNumber === 'number') {
    let totalNumberConverted = Array.from(String(totalNumber));
    let swapArray = new Array;
    let counter = 1;
    for(let i = totalNumberConverted.length - 1; i >= 0; i--) {
      if(counter % 3 === 0) {
        swapArray.unshift(`,${totalNumberConverted[i]}`);
      } else {
        swapArray.unshift(totalNumberConverted[i]);
      }
      counter++;
    }
    const arrayToString = swapArray.join('');
    return arrayToString;
  } else {
    throw new Error('Argument must be a number');
  }
}

const addPledge = () => {
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.card-modal__inputNumber');
  const progressionBar: HTMLDivElement = document.querySelector('.actual-progression')!;
  let totalBackers: number = convertToInt(document.querySelector('#totalBackers')?.innerHTML!);
  let totalPledge: number = convertToInt(document.querySelector('#totalPledge')?.innerHTML.slice(1)!);

  forms.forEach( form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const inputPledge: HTMLInputElement | null = form?.querySelector('input[type="number"]');
      const inputValue: number = Number(inputPledge?.value);
      totalPledge += inputValue;
      totalBackers++;
      
      let progress = 100 * totalPledge / 100000;
      if(progress > 100) progress = 100;

      document.querySelector('#totalPledge')!.innerHTML = "$" + convertToString(totalPledge);
      document.querySelector('#totalBackers')!.innerHTML = convertToString(totalBackers);
      progressionBar.style.width = `${progress}%`;
      toggleModal('modal-reward');
      toggleModal('modal-success');
    })
  })
}

const resetInputRewardModal = () => {
  const cardsModal: NodeListOf<HTMLDivElement> =  document.querySelectorAll('.card-modal');
  cardsModal.forEach(card => {
    const inputRadio: HTMLInputElement = card.querySelector('input[type="radio"]')!;
    inputRadio.checked = false;
    const inputValue: HTMLInputElement = card.querySelector('input[type="number"]')!;
    inputValue.value = inputValue.defaultValue;
  })
  resetRadioCardsStyle();
}


const selectedCardRadioButton = () => {
  const radioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')!;
  radioButtons.forEach( radiobutton => {
    radiobutton.addEventListener('change', () => {
      resetRadioCardsStyle();
      if(radiobutton.checked) {
        radiobutton.closest('.card-modal')?.classList.add('active');
        radiobutton.closest('.card-modal')!.querySelector('.card-modal__pledge-bottom')?.classList.add('active');
      }      
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


const init = () => {
  const projectButton: HTMLDivElement | null = document.querySelector(".card-presentation button");
  const rewardButtons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".card-rewards__button");
  projectButton?.addEventListener('click', () => toggleModal("modal-reward"));

  rewardButtons?.forEach( rewardButton => {
    rewardButton.addEventListener('click', () => toggleModal("modal-reward"));
  })
  
  toggleMenu();
  bookmarkProject();
  selectedCardRadioButton();
  addPledge();
}


init();


export {};
