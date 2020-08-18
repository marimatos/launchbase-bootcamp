const recipes = document.querySelectorAll(".recipe");

for (let recipe of recipes) {
  recipe.addEventListener('click', () => {
      const recipeId = recipe.getAttribute(`value`)
      window.location.href = `/recipe/${recipeId}`
  })
}

const viewLink = document.querySelectorAll(".recipe__link");

for (let i = 0; i < viewLink.length; i++) {
  const link = viewLink[i];
  link.addEventListener("click", () => {
    window.location.href = `/admin/recipes/${i}`;
  });
}

const description = document.getElementsByClassName('recipe-description')

for (let i = 0; i < description.length; i++) {
    const span = description[i].querySelector('.span')
    const content = description[i].querySelector('.content')

    span.addEventListener('click', function() {
        if (span.querySelector('span').innerHTML === 'Esconder') {
            content.classList.add('active')
            span.querySelector('span').innerText = 'Mostrar'
        } else {
            content.classList.remove('active')
            span.querySelector('span').innerText = 'Esconder'
        }
    })
}