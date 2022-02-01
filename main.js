const searchInput = document.querySelector("#search-word");
const searchbtn = document.querySelector("#search-btn");
const meaningContainer = document.querySelector(".meaning-container");
const loadingDiv=document.querySelector('#load')
let audio;

searchbtn.addEventListener("click", (e) => {
 
  loadingDiv.classList.add('load');
 
  if (searchInput.value != "") {
    loadingDiv.classList.add('load');
     meaningContainer.innerHTML = loadingDiv.outerHTML;
    console.log(searchInput.value);
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadingDiv.classList.remove('load');
        meaningContainer.innerHTML = loadingDiv.outerHTML;
        if (data.title) {
          console.log(data.title);
          const wordContainer = document.createElement("div");

          wordContainer.classList.add("word-container");
          meaningContainer.innerHTML=`
          <h2>${data.title}</h2>
          <p class="definition"> ${data.message}</p>
          <p class="definition">${data.resolution}</p>
        `;
        } else 
          meaning(data);

      })
      .catch(() => {
        console.log(data);
        // meaningContainer.innerHTML=`
        //    <h2 class="word"></h2>
        //    <p class="definition"> ${data.message}</p>
        //  `;
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
                <button class="volume">
                <i class="fa fa-volume-up fa-lg" aria-hidden="true"></i>
                </button>
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
                <div class="content">
                <p class="definition">${index+1}. ${definitionsElement.definition}</p>
                <p class="example">"${definitionsElement.example}" </p>
                <p class="similar">similar: ${definitionsElement.synonyms.slice(
                  0,
                  5
                )}</p>
                </div>
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
