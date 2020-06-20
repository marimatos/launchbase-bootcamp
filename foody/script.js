const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function(){
    const imgId = card.getAttribute('id');
    const title = card.querySelector('#title').innerText;
    const chef = card.querySelector('#chef').innerText;
    modalOverlay.classList.add('active');
    modalOverlay.querySelector('img').src=`assets/${imgId}.png`;
    modalOverlay.querySelector('#title-modal').innerText=`${title}`;
    modalOverlay.querySelector('#chef-modal').innerText=`${chef}`;
  })
}

document.querySelector('.close-modal').addEventListener('click', function(){
  modalOverlay.classList.remove('active');
})

