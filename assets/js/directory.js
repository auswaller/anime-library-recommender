var data = JSON.parse(sessionStorage.getItem("rawShow"));
let titleEl = document.getElementById("title");
let posterEl = document.getElementById("poster");
let synopsisEl = document.getElementById("synopsis");
let reviewsEl = document.getElementById("reviews");
let addInfoEl = document.getElementById("additional-info");
let youtubeEl = document.getElementById("youtube");
let buttonEl = document.getElementById("button");
let randomButtonEl = document.getElementById("random-button");
let libraryItems = [];

buildShowDisplay(data);
libraryItems = loadFromLocalStorage("library") || [];

buttonEl.addEventListener("click", function(event){
    event.preventDefault();
    addToLibrary(data.data.attributes.canonicalTitle, data.data.attributes.posterImage.large);
});

randomButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    getRandomAnime();
});

function addToLibrary(title, poster){
    let newInfo = {title, poster};
    libraryItems.push(newInfo);
    console.log(libraryItems);
    saveToLocalStorage("library", libraryItems);
}

function saveToLocalStorage(type, toSave){
    localStorage.setItem(type, JSON.stringify(toSave));
}

function buildShowDisplay(showRawInfo){
    let showTitle = showRawInfo.data.attributes.canonicalTitle;
    let showSynopsis = showRawInfo.data.attributes.description;
    let showPoster = showRawInfo.data.attributes.posterImage.large;
    let showReviews = showRawInfo.data.attributes.averageRating;
    let showYoutubeID = showRawInfo.data.attributes.youtubeVideoId;

    if(showPoster !== null){
        posterEl.src= showPoster;
    }
    if(showTitle !== null){
        titleEl.innerHTML= showTitle
    }
    if(showSynopsis !== null){
        synopsisEl.innerHTML= showSynopsis;
    }
    if(showReviews !== null){
        reviewsEl.innerHTML= showReviews;
    }
    if(showYoutubeID !== null){
        youtubeEl.href= "https://www.youtube.com/watch?v=" + showYoutubeID;
        youtubeEl.innerHTML= "https://www.youtube.com/watch?v=" + showYoutubeID;
    }
}

function loadFromLocalStorage(type){
    let storedItem = JSON.parse(localStorage.getItem(type));

    if(storedItem !== null){
        return storedItem;
    }
    else{
        console.log("Could not retrieve stored items!");
    }
}

function goToDisplay(showRawInfo){
    sessionStorage.setItem("rawShow", JSON.stringify(showRawInfo));
    location.assign("directory.html");
}

function getRandomAnime(){
    fetch("https://kitsu.io/api/edge/anime/" + Math.floor((Math.random() * 12000) + 1))
    .then(function(response){
        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong with finding a random anime. Trying the search again");
    }).then(function(data){
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
  