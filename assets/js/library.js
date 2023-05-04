let libraryItems = [];
let libraryEl = document.getElementById("library-container");
let randomButtonEl = document.getElementById("random-button");

libraryItems = loadFromLocalStorage("library");
buildLibraryDisplay();

randomButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    getRandomAnime();
});

function loadFromLocalStorage(type){
    let storedItem = JSON.parse(localStorage.getItem(type));

    if(storedItem !== null){
        return storedItem;
    }
    else{
        console.log("***Could not retrieve stored items!");
    }
}

function buildLibraryDisplay(){
    libraryItems = loadFromLocalStorage("library");

    for(let i = 0; i < libraryItems.length; i++){
        console.log(i);
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");

        let cardImgDiv = document.createElement("div");
        cardImgDiv.setAttribute("class", "card-image");

        let cardFigure = document.createElement("figure");
        cardFigure.setAttribute("class", "image is-4by3");

        let cardImg = document.createElement("img");
        cardImg.src = libraryItems[i].poster;

        let cardContentDiv = document.createElement("div");
        cardContentDiv.setAttribute("class", "card-content");

        let mediaDiv = document.createElement("div");
        mediaDiv.setAttribute("class", "media");

        let mediaContentDiv = document.createElement("div");
        mediaContentDiv.setAttribute("class", "media-content");

        let titleP = document.createElement("p");
        titleP.setAttribute("class", "title is-4");
        titleP.innerHTML = libraryItems[i].title;

        let columnDiv = document.createElement("div");
        columnDiv.setAttribute("class", "column is-one-fifth-desktop is-one-third-tablet");

        cardFigure.appendChild(cardImg);
        cardImgDiv.appendChild(cardFigure);
        cardDiv.appendChild(cardImgDiv);
        mediaContentDiv.appendChild(titleP);
        mediaDiv.appendChild(mediaContentDiv);
        cardContentDiv.appendChild(mediaDiv);
        cardDiv.appendChild(cardContentDiv);
        columnDiv.appendChild(cardDiv);
        libraryEl.appendChild(columnDiv);
    }
}

function goToDisplay(showRawInfo){
    sessionStorage.setItem("rawShow", JSON.stringify(showRawInfo));
    location.assign("directory.html");
}

function getRandomAnime(){
    fetch("https://kitsu.io/api/edge/anime/" + Math.floor((Math.random() * 12000) + 1))
    .then(function(response){
        console.log("----Random Anime Response----");
        console.log(response);

        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong with finding a random anime. Trying the search again");
    }).then(function(data){
        console.log("----Random Anime Data----");
        console.log(data);

        goToDisplay(data);
    }).catch(function(error){
        console.log(error);
        getRandomAnime();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    navbarBurger.addEventListener('click', () => {
      navbarBurger.classList.toggle('is-active');
      document.getElementById(navbarBurger.dataset.target).classList.toggle('is-active');
    });
  
  });
  