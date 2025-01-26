function setup() {
  const allEpisodes = getAllEpisodes();
  createSearchBar(allEpisodes);
  createEpisodeSelector(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear previous content

//  const searchInfo = document.createElement("p");
//  searchInfo.id = "search-info";
//  searchInfo.textContent = `Displaying ${episodeList.length} episode(s)`;
//  rootElem.appendChild(searchInfo);

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
  const rootElem = document.getElementById("root");

  const selectContainer = document.createElement("div");
  selectContainer.id = "select-container";

  const selectInput = document.createElement("select");
  selectInput.id = "episode-selector";

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Show all episodes";
  selectInput.appendChild(defaultOption);

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    const episodeCode = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")}`;
    option.value = episodeCode;
    option.textContent = `${episodeCode} - ${episode.name}`;
    selectInput.appendChild(option);
  });

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
