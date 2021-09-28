// seperando a url da api de dicionário
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// recuperando o elemento result
const result = document.getElementById('result');

// recuperando o elemento de sound
const sound = document.getElementById('sound');

// recuperando o botão de search-btn
const btn = document.getElementById('search-btn');

// adicionando um evento de click ao botão
btn.addEventListener("click", () =>{

  // recuperando a palavra que a pessoa digitou
  let inpWord = document.getElementById('inp-word').value;

    // fazendo uma requisição na api com a palavra digitada
    // se existir é extraído as informações necessárias
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
        </p>`;

      sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    // senão existir é exibido uma mensagem informando o erro
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn´t Find The Word</h3>`
  });

});

// função para tocar o áudio da palavra escolhida
function playSound(){
  sound.play();
}