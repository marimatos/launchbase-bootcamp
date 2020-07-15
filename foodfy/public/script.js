
const cards = document.querySelectorAll('.card');
const ul = document.querySelector('.hide-ingredientes')
const p1 = document.querySelector('.hide-prepare')
const p2 = document.querySelector('.hide-information')

for (let i = 0; i < cards.length; i++){
  let recipeId = i;
  cards[i].addEventListener('click', function() {
    window.location.href=`/recipes/${recipeId}`;
  })
}

const description = document.getElementsByClassName('recipe-description')

for (let i = 0; i < description.length; i++) {
    const span = description[i].querySelector('.span')
    const content = description[i].querySelector('.description')
  
    span.addEventListener('click', e => {
      if (span.innerHTML == 'Esconder') {
        span.innerHTML = 'Mostrar'
        content.classList.add('hide')
      } else {
        span.innerHTML = 'Esconder'
        content.classList.remove('hide')
      }
    })
  }