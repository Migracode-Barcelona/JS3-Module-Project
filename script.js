async function setup() {
  // Fetch shows
  const showUrl = "https://api.tvmaze.com/shows";
  try {
    const response = await fetch(showUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allShows = await response.json();
     // Sort shows alphabetically
    const sortedShows = allShows.sort((a,b)=>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
     // Create and add the show selector
    createShowSelector(sortedShows);
    // Display episodes for the first show by default
    const firstShowId = sortedShows[0].id;
    await fetchAndDisplayEpisodes(firstShowId);
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
  }

}

function createShowSelector(shows){
  const rootElem = document.getElementById("root");
  // create show selector
  const showSelectedContainer = document.createElement("div");
  showSelectedContainer.id = "show-select-container";
  
  const showSelect = document.createElement("select");
  showSelect.id = "show-selector";
  // drop down for show selector
  const defOption  = document.createElement("option");
  defOption.value = "";
  defOption.textContent = "select option ...";
  showSelect.appendChild(defOption);
  // Populate the selector with show names and their IDs as values
  shows.forEach((show) => {
    const option  = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
    // add click Lisner for change 
    showSelect.addEventListener("change", async (event) => {
      // Get the selected show ID
    const selectedShowId = event.target.value;  
    if (selectedShowId) {
      // Fetch and display episodes for the selected show
      await fetchAndDisplayEpisodes(selectedShowId);
    }
  });

  showSelectedContainer.appendChild(showSelect);
  // Add the selector above the episodes
  rootElem.before(showSelectedContainer);
}
// Object to store cached episode data
const episodeCache = {};

async function fetchAndDisplayEpisodes(showId) {

  if(episodeCache[showId]){
    makePageForEpisodes(episodeCache[showId]);
    createSearchBar(episodeCache[showId]);
    createEpisodeSelector(episodeCache[showId]);
    return;
  }
  // If not cached, fetch episode data
  const episodesUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
  try {
    const episodesResponse = await fetch(episodesUrl);
    if (!episodesResponse.ok) {
      throw new Error(`HTTP error! status: ${episodesResponse.status}`);
    }
    
    const episodes = await episodesResponse.json();
    makePageForEpisodes(episodes);
    createSearchBar(episodes);
    createEpisodeSelector(episodes);
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
  }
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear previous content
  const episodeContainer = document.createElement("div");
  episodeContainer.className = "episode-container";
  
  episodeList.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    episodeContainer.appendChild(episodeCard);
  });
  rootElem.appendChild(episodeContainer);
}


function createEpisodeCard(episode) {
  const card = document.createElement("div");
  card.className = "episode-card";
  
  const episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
    episode.number
  ).padStart(2, "0")}`;

  const titleLink = document.createElement("a");
  titleLink.href = episode.url;
  titleLink.target = "_blank";
  titleLink.className = "episode-title-link";

  const title = document.createElement("h2");
  title.textContent = `${episode.name} - ${episodeCode}`;
  titleLink.appendChild(title);

  const image = document.createElement("img");
  image.src = episode.image.medium;
  image.alt = `Image for ${episode.name}`;

  const description = document.createElement("p");
  description.innerHTML = episode.summary;

  card.appendChild(titleLink);
  card.appendChild(image);
  card.appendChild(description);

  return card;
}

function createSearchBar(allEpisodes) {
   const existingSearchContainer = document.getElementById("search-container");
  if (existingSearchContainer) {
    existingSearchContainer.remove(); // Remove old search bar
  }
  const rootElem = document.getElementById("root");

  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search episodes...";
  searchInput.addEventListener("input", () =>
    handleSearch(searchInput.value, allEpisodes)
  );

  searchContainer.appendChild(searchInput);
  rootElem.before(searchContainer); // Add the search bar above the episodes
}

function handleSearch(searchTerm, allEpisodes) {
  const filteredEpisodes = allEpisodes.filter((episode) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      episode.name.toLowerCase().includes(lowerCaseTerm) ||
      episode.summary.toLowerCase().includes(lowerCaseTerm)
    );
  });

  makePageForEpisodes(filteredEpisodes);
}

function createEpisodeSelector(allEpisodes) {
    const existingSelectContainer = document.getElementById("select-container");
  if (existingSelectContainer) {
    existingSelectContainer.remove(); // Remove old episode selector
  }
  const rootElem = document.getElementById("root");
  // A container for control  
  const selectContainer = document.createElement("div");
  selectContainer.id = "select-container";
  // selector dropDown
  const selectInput = document.createElement("select");
  selectInput.id = "episode-selector";
  
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Show all episodes";
  selectInput.appendChild(defaultOption);
  // show all episodes inside selector option
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    const episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")}`;
    option.value = episodeCode;
    option.textContent = `${episodeCode} - ${episode.name}`;
    selectInput.appendChild(option);
  });
    // select a specific episode
  selectInput.addEventListener("change", () =>
    handleEpisodeSelection(selectInput.value, allEpisodes)
  );

  selectContainer.appendChild(selectInput);
  rootElem.before(selectContainer); // Add the selector above the episodes
}

function handleEpisodeSelection(selectedValue, allEpisodes) {
  if (selectedValue === "all") {
    makePageForEpisodes(allEpisodes);
  } else {
    const selectedEpisode = allEpisodes.find((episode) => {
      const episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
        episode.number
      ).padStart(2, "0")}`;
      return episodeCode === selectedValue;
    });
    makePageForEpisodes(selectedEpisode ? [selectedEpisode] : []);
  }
}

window.onload = setup;
