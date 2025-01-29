function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // Bootstrap Container
  const container = document.createElement("div");
  container.classList.add("container", "mt-4");

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
