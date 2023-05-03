let libraryItems = {};
let libraryEl = document.getElementById("library-container");

libraryItems = loadFromLocalStorage("library");
buildLibraryDisplay();

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
        cardFigure.src = libraryItems[i].posterURL;

        let cardContentDiv = document.createElement("div");
        cardContentDiv.setAttribute("class", "card-content");

        let mediaDiv = document.createElement("div");
        mediaDiv.setAttribute("class", "media");

        let mediaContentDiv = document.createElement("div");
        mediaContentDiv.setAttribute("class", "media-content");

        let titleP = document.createElement("p");
        titleP.setAttribute("class", "title is-4");
        titleP.innerHTML = libraryItems[i].title;

        cardImgDiv.appendChild(cardFigure);
        cardDiv.appendChild(cardImgDiv);

        mediaContentDiv.appendChild(titleP);
        mediaDiv.appendChild(mediaContentDiv);
        cardContentDiv.appendChild(mediaDiv);
        cardDiv.appendChild(cardContentDiv);
        libraryEl.appendChild(cardDiv);
    }
}