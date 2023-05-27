const savedSessionLinks = JSON.parse(localStorage.getItem('savedSessionLinks')) || [];

const sessionList = document.querySelector('#js-saved-sessions');

let formToRender = '';

if (savedSessionLinks.length === 0) {
  sessionList.innerHTML = 'Nothing here yet'
} else {
  renderSaveLinks();
}


function renderSaveLinks() {
  savedSessionLinks.forEach((element, index) => {
    const sessionElement = Object.assign(document.createElement('a'), {
      href: 'save-display.html',
    })
    sessionList.appendChild(sessionElement);
    sessionElement.innerHTML = element;

    const deleteBtn = document.createElement('button');
    sessionList.appendChild(deleteBtn);
    deleteBtn.innerHTML = 'Delete';

    sessionElement.addEventListener('click', () => {
      formToRender = element;
      localStorage.setItem('formToRender', formToRender);
    });
    deleteBtn.addEventListener('click', () => {
      savedSessionLinks.splice(index, 1);
      sessionList.removeChild(sessionElement);
      sessionList.removeChild(deleteBtn);
      localStorage.removeItem(element);
      localStorage.setItem('savedSessionLinks', JSON.stringify(savedSessionLinks));
      if (savedSessionLinks.length === 0) {
        sessionList.innerHTML = 'Nothing here yet'
      } 
    })  
  });
};