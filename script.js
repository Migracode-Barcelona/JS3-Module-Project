//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
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

window.onload = setup;
