let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(toys => renderToys(toys))

  const renderToys = toys => {
    for(const toyObj of toys){
      renderToy(toyObj)
    }
  }

  function renderToy(toyObj){
    let div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar">
    <p>${toyObj.likes} Likes</p>
    <button class="like-btn" data-id=${toyObj.id}>Like <3<button>
    `
    document.querySelector('#toy-collection').append(div);
  }


  let toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit' , function(e){
    e.preventDefault();
    name = document.querySelector('input[name="name"]').value
    image = document.querySelector('input[name="image"]').value
    console.log(name)

    let configObj = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "accept":"application/json"
      },
      body: JSON.stringify({
        'name': name,
        'image': image,
        'likes': 0
      })
    }
    fetch(`http://localhost:3000/toys`, configObj)
    .then(response => response.json())
    .then(toyObj => renderToy(toyObj))
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function clickHandler(){
    toyC = document.querySelector('#toy-collection');

    toyC.addEventListener('click', function(e){
      if(e.target.matches('.like-btn')){ 
        let button = e.target;
        let parentDiv = button.parentElement;
        let likeP = parentDiv.querySelector('p');
        let currentLike = parseInt(likeP.textContent);
        let newLike = currentLike +1;
        likeP.textContent = newLike + " Likes";

        // console.log(button.dataset.id)

        let patchConfigObj = {
          method: "PATCH",
          headers: {
            "content-Type": "application/json",
            "accept":"application/json"
          },
          body: JSON.stringify({
            'likes': newLike
          })
        }

        fetch(`http://localhost:3000/toys/${button.dataset.id}`, patchConfigObj)
        .then(response => response.json())
        .then(toyObj => renderToy(toyObj))

      }
    })
  }


  clickHandler();
});

