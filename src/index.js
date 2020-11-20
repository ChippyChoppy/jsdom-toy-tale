let addToy = false;
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
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

  // fetch toyData
  fetch('http://localhost:3000/toys/')
    .then(r => r.json())
    .then(toyData => {
      console.log(toyData)
      renderAllToys(toyData)
    })

  function renderAllToys(toyData) {
    toyData.forEach(renderOneToy)
  }

  function renderOneToy(toyData) {
    const toyCard = document.createElement("div")
    toyCard.innerHTML = `
    <div class="card">
      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p>Likes: ${toyData.likes} </p>
      <button class="like-btn">Like <3</button>
    </div>
    `
    toyCollection.append(toyCard)
    console.log(toyCard)
  }

  // Create Toy

  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", handleToyFormSubmit)

  function handleToyFormSubmit(event) {
    event.preventDefault()
    const toyObj = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0  
      
    }

    function createToy() {
      fetch("http://localhost:3000/toys", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": toyObj.name,
          "image": toyObj.image,
          "likes": 0
        })
      })
        .then(r => r.json())
        .then(newToyObj => {
          renderOneToy(newToyObj)
          console.log('success:', newToyObj)
        })
      // event.target.reset() 

    }
    createToy(toyObj)
  }



})








// iterate through toyData array and create an individual toyCard for each array index
  // // Artisanal version of .innerHTML
    // toyCard.className = "card"
    // const toyH2 = document.createElement("h2")
    // const toyImg = document.createElement("img")
    // const toyLikes = document.createElement("p")
    // const likeBtn = document.createElement("button")
    // toyH2.textContent = toyData.name
    // toyImg.src = toyData.image
    // toyImg.className = "toy-avatar"
    // toyLikes.textContent = toyData.likes
    // likeBtn.className = "like-btn"
    // likeBtn.textContent = "Like <3"
    // toyCard.append(toyH2, toyImg, toyLikes, likeBtn)

// render each card on the page

// add and submit new toys

// increase/count toy likes 