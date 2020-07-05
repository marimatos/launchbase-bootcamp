const formDelete = document.querySelector("#form-delete");
  formDelete.addEventListener("submit", function(e) {
    const confirmation = confirm("Confirma a exclusão?")
    if(!confirmation) {
    event.preventDefault();
    }
  })