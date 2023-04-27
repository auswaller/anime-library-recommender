let titleEl = document.getElementById("title");
let posterEl = document.getElementById("poster");
let synopsisEl = document.getElementById("synopsis");
let reviewsEl = document.getElementById("reviews");
let addInfoEl = document.getElementById("additional-info");
let episodesEl = document.getElementById("episodes");

let searchButtonEl = document.getElementById("search-button");
let randomButtonEl = document.getElementById("random-button");

getAnimeByImage();

randomButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    getRandomAnime();
});

function getRandomAnime(){
    fetch("https://kitsu.io/api/edge/anime/" + Math.floor((Math.random() * 12000) + 1))
    .then(function(response){
        console.log("----Random Anime Response----");
        console.log(response);

        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong");
    }).then(function(data){
        console.log("----Random Anime Data----");
        console.log(data);
    }).catch(function(error){
        console.log(error);
    });
}

function getAnimeByImage(){
    fetch(`https://api.trace.moe/search?url=${encodeURIComponent("https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg")}`
    ).then(function(response){
        console.log("----Image Anime Response----");
        console.log(response);

        if(response.status === 200){
            return response.json();
        }

        throw new Error("Something went wrong");
    }).then(function(data){
        console.log("----Image Anime Data----");
        console.log(data);
    }).catch(function(error){
        console.log(error);
    });    
}