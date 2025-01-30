function setup() {
  const allEpisodes = getAllEpisodes();
  selector(allEpisodes);
  searchBox(allEpisodes);
  makePageForEpisodes(allEpisodes);
}
function selector(episodeList) {
  const rootElem = document.getElementById("root");

  // Bootstrap Selector Container
  const selectorContainer = document.createElement("div");
  selectorContainer.classList.add("container", "mt-4");

  // Bootstrap Selector Row
  const selectorRow = document.createElement("div");
  selectorRow.classList.add("row");

  // Bootstrap Col
  const selectorCol = document.createElement("div");
  selectorCol.classList.add("col-md-3", "mb-2");

  // Selector
  const selectorBox = document.createElement("select");
  selectorBox.classList.add("form-control");
  selectorBox.setAttribute("id", "episodeSelect");
  selectorBox.innerHTML = '<option value="">Select Episode</option>';

  // Populate the dropdown with episodes
  episodeList.forEach((episode, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    selectorBox.appendChild(option);
  });

  // Event listener for when an option is selected
  selectorBox.addEventListener("change", (e) => {
    const selectedEpisodeIndex = e.target.value;
    const displayResults = document.querySelector(".result-col p");
    if (selectedEpisodeIndex === "") {
      // Show all episodes and update the result text
      makePageForEpisodes(episodeList);
      if (displayResults)
        displayResults.textContent = `Displaying ${episodeList.length} results`;
    } else {
      // Show only selected episode and clear the result text
      makePageForEpisodes([episodeList[selectedEpisodeIndex]]);
      if (displayResults) displayResults.textContent = "";
    }
  });

  // Append the selector box to the column and row
  selectorCol.appendChild(selectorBox);
  selectorRow.appendChild(selectorCol);
  selectorContainer.appendChild(selectorRow);
  rootElem.appendChild(selectorContainer);
}

//FUNCTION SEARCH BOX

function searchBox(episodeList) {
  const rootElem = document.getElementById("root");
  // Bootstrap Search Container
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("container", "mt-4");

  // Bootstrap Search Row
  const searchRow = document.createElement("div");
  searchRow.classList.add("row");

  //Bootstrap Col
  const searchCol = document.createElement("div");
  searchCol.classList.add("search-col", "col-md-3", "mb-2");

  //Search
  const searchBox = document.createElement("input");
  searchBox.setAttribute("type", "text");
  searchBox.setAttribute("placeholder", "Search");
  searchBox.classList.add("form-control");

  //Results Col
  const resultsCol = document.createElement("div");
  resultsCol.classList.add(
    "result-col",
    "col-md-3",
    "text-md-right",
    "text-muted"
  );

  //Display Results
  const displayResults = document.createElement("p");
  displayResults.textContent = `Displaying ${episodeList.length} results`;

  searchBox.addEventListener("input", () => {
    const searchInputData = searchBox.value.toLowerCase();
    const filterEpisodes = episodeList.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchInputData) ||
        episode.summary.toLowerCase().includes(searchInputData)
      );
    });
    displayResults.textContent = `Displaying ${filterEpisodes.length} / ${episodeList.length}`;
    makePageForEpisodes(filterEpisodes);
  });
  //Append
  rootElem.appendChild(searchContainer);
  searchContainer.appendChild(searchRow);
  searchRow.appendChild(searchCol);
  searchRow.appendChild(resultsCol);
  searchCol.appendChild(searchBox);
  resultsCol.appendChild(displayResults);
}

//---------MAKEPAGEFOREPISODES FUNCTION
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  //remove existing container before rerendering

  const existingContainer = document.querySelector(".episodes-container");
  if (existingContainer) {
    existingContainer.remove();
  }

  // Bootstrap Container
  const container = document.createElement("div");
  container.classList.add("container", "mt-4", "episodes-container");

  // Bootstrap Row
  const row = document.createElement("div");
  row.classList.add("row");

  episodeList.forEach((episode) => {
    // Bootstrap Col
    const col = document.createElement("div");
    col.classList.add("col-md-4", "col-lg-3", "mb-5", "ml-3");

    // Bootstrap Card
    const card = document.createElement("div");
    card.classList.add("episode-card", "h-100");

    // Episode Image
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.classList.add("card-img-top");

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Title
    const episodeTitle = document.createElement("h5");
    episodeTitle.classList.add("card-title");
    episodeTitle.textContent = `${episode.name} - S${String(
      episode.season
    ).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;

    // Summary Title
    const summaryText = document.createElement("h6");
    summaryText.textContent = "Short Summary:";
    summaryText.style.fontWeight = "bold";
    summaryText.style.marginTop = "25px";

    // Summary
    const episodeSummary = document.createElement("p");
    episodeSummary.classList.add("summary");
    episodeSummary.innerHTML = episode.summary;

    // Append elements to card body
    cardBody.appendChild(episodeTitle);
    cardBody.appendChild(summaryText);
    cardBody.appendChild(episodeSummary);

    // Append image and body to card
    card.appendChild(episodeImage);
    card.appendChild(cardBody);

    // Append card to col
    col.appendChild(card);

    // Append col to row
    row.appendChild(col);
  });

  // Append row to container and container to root
  container.appendChild(row);
  rootElem.appendChild(container);
}

window.onload = setup;
