let titleEl = document.getElementById("title");
let posterEl = document.getElementById("poster");
let synopsisEl = document.getElementById("synopsis");
let reviewsEl = document.getElementById("reviews");
let addInfoEl = document.getElementById("additional-info");
let episodesEl = document.getElementById("episodes");
let searchImageButtonEl = document.getElementById("search-image-button");
let searchNameButtonEl = document.getElementById("search-name-button");
let searchNameTextEl = document.getElementById("search-name");
let randomButtonEl = document.getElementById("random-button");
let addToLibraryButtonEl = document.getElementById("add-library");

let libraryItems = {id: "", title: ""};
let imageSearchURL = "https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg";

init();


randomButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    getRandomAnime();
});

searchNameButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    console.log("--Searched manually for: " + searchNameTextEl.value);
    getAnimeByName(searchNameTextEl.value);
    searchNameTextEl.value = "";
});

/* These throw errors since the elements don't exist on page
addToLibraryButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    addToLibrary();
});

searchImageButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    getAnimeByImage();
});
*/

function init(){
    libraryItems = loadFromLocalStorage("library");

    //For testing
    getAnimeByImage();
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

        buildShowDisplay(data);
    }).catch(function(error){
        console.log(error);
        getRandomAnime();
    });
}

function getAnimeByImage(){
    fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(imageSearchURL)}`
    ).then(function(response){
        console.log("----Image Anime Response----");
        console.log(response);

        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong with searching by image. Try the search again");
    }).then(function(data){
        console.log("----Image Anime Data----");
        console.log(data);

        getAnimeByName(data.result[0].anilist.title.romanji);
    }).catch(function(error){
        console.log(error);
    });    
}

function getAnimeByName(searchName){
    fetch("https://kitsu.io/api/edge/anime?filter[text]=" + searchName)
    .then(function(response){
        console.log("----Search Anime Response----");
        console.log(response);

        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong with finding an anime by name. Try the search again");
    }).then(function(data){
        console.log("----Search Anime Data----");
        console.log(data);

        let dataToSend = {data: data.data[0]};
        buildShowDisplay(dataToSend);
    }).catch(function(error){
        console.log(error);
    });
}

function buildShowDisplay(showRawInfo){
    let showId = showRawInfo.data.id;
    let showTitle = showRawInfo.data.attributes.canonicalTitle;
    let showSynopsis = showRawInfo.data.attributes.description;
    let showPoster = showRawInfo.data.attributes.posterImage.large;
    let showReviews = showRawInfo.data.attributes.averageRating;
    let showEpisodes = showRawInfo.data.attributes.episodeCount;
    let showYoutubeID = showRawInfo.data.attributes.youtubeVideoId; //Add "https://www.youtube.com/watch?v=" before this to get the full url

    console.log(showTitle + " | " + showId + " | " + showSynopsis + " | " + showPoster + " | " + showReviews + " | " + showEpisodes + " | " + showYoutubeID);

    //Build out show display page here. Make sure to add "data-" elements with the info for each element in order to save them to library. At least the show title/ID and poster link
    //Be aware that certain elements (ie. reviews) may be null
}

function buildLibraryDisplay(){
    libraryItems = loadFromLocalStorage("library");

    //Build out library display here.
    for(let i = 0; i < libraryItems.id.length; i++){

    }
}

function addToLibrary(id, title){
    libraryItems.id.push() = id;
    libraryItems.title.push() = title;
    saveToLocalStorage("library", libraryItems);
}

function saveToLocalStorage(type, toSave){
    localStorage.setItem(type, JSON.stringify(toSave));
}

function loadFromLocalStorage(type){
    let storedItem = JSON.parse(localStorage.getItem(type));

    if(storedItem !== null){
        return storedItem;
    }
    else{
        console.log("***Could not retrieve stored items!");
    }
}