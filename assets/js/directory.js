var data = JSON.parse(sessionStorage.getItem("rawShow"));
let titleEl = document.getElementById("title");
let posterEl = document.getElementById("poster");
let synopsisEl = document.getElementById("synopsis");
let reviewsEl = document.getElementById("reviews");
let addInfoEl = document.getElementById("additional-info");
let episodesEl = document.getElementById("episodes");
buildShowDisplay(data);

function buildShowDisplay(showRawInfo){
    console.log(showRawInfo);
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
    posterEl.src= showPoster;
    titleEl.innerHTML= showTitle
    synopsisEl.innerHTML= showSynopsis
    episodesEl.innerHTML= showEpisodes
}