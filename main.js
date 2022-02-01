const searchInput = document.querySelector("#search-word");
const searchbtn = document.querySelector("#search-btn");
const meaningContainer = document.querySelector(".meaning-container");
let audio;
searchbtn.addEventListener("click", (e) => {
  meaningContainer.innerHTML = "";
  if (searchInput.value != "") {
    console.log(searchInput.value);
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.title) {
          console.log("not found");
        } else {
          meaning(data);
        }
      })
      .catch(() => {
        console.log("not found");
      });
  }

  e.preventDefault();
});

function meaning(data) {
  console.log(data);
  //   data.forEach((element) => {
  const wordContainer = document.createElement("div");

  wordContainer.classList.add("word-container");
  console.log(wordContainer);
  wordContainer.innerHTML = `
                <h2 class="word">${data[0].word}</h2>
                <div class="audio-phonetic">
                <button class="volume">Audio</button>
                <p class="phonetic">/${data[0].phonetic}/</p>
                </div>
                
        `;

  data[0].meanings.forEach((meaningElement) => {
    wordContainer.innerHTML += `
            <div class="meaning">
                    <p class="partOfSpeech">${meaningElement.partOfSpeech}</p>
 
                
            `;
    meaningElement.definitions.forEach((definitionsElement,index) => {
      wordContainer.innerHTML += `
                <p class="definition">${index+1}. ${definitionsElement.definition}</p>
                <p class="example">example: ${definitionsElement.example} </p>
                <p class="similar">similar: ${definitionsElement.synonyms.slice(
                  0,
                  5
                )}</p>
                <br>
                </div>
                `;
    });
  });

  console.log(wordContainer);
  meaningContainer.appendChild(wordContainer);
  const volume = meaningContainer.querySelector(".volume");
  volume.addEventListener("click", () => {
    console.log(data[0].phonetics[0].audio);
    audio = new Audio("https:" + data[0].phonetics[0].audio);
    audio.play();
  });
  //   });
}
