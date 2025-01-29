//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();

  createSearchBar(allEpisodes);
  createEpisodeSelector(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const main = document.createElement("h2");
  main.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(main);

  episodeList.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "episode-card";

    card.innerHTML = `<img src = "${episode.image.medium}"  alt = "${
      episode.name
    }">
    <h3>${episode.name} (S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")})</h3>
    <p>${episode.summary}</p>`;

    rootElem.appendChild(card);
  });
}
function createSearchBar(allEpisodes) {
  const rootElem = document.getElementById("root");

  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search.....";

  searchInput.addEventListener("input", () => {
    searchEpisode(searchInput.value, allEpisodes);
  });
  searchContainer.appendChild(searchInput);
  rootElem.before(searchContainer); // put the search bar at the top of episodes.
}

function searchEpisode(searchTerm, allEpisodes) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      episode.summary.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  makePageForEpisodes(filteredEpisodes);
}

function createEpisodeSelector(allEpisodes) {
  const rootElem = document.getElementById("root");

  const selectorContainer = document.createElement("div");
  selectorContainer.id = "selector-container";

  const selectEpisode = document.createElement("select");
  selectEpisode.id = "select-episode";

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Show All Episodes";
  selectEpisode.appendChild(defaultOption);

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    selectEpisode.appendChild(option);
  });

  //Lets Handle the change
  selectEpisode.addEventListener("change", (e) => {
    const selectTheId = e.target.value;

    if (selectTheId === "all") {
      makePageForEpisodes(allEpisodes);
    } else {
      const selectedEpisode = allEpisodes.find((eps) => eps.id == selectTheId);
      if (selectedEpisode) {
        makePageForEpisodes([selectedEpisode]);
      }
    }
  });
  selectorContainer.appendChild(selectEpisode);
  rootElem.before(selectorContainer);
}

window.onload = setup;
