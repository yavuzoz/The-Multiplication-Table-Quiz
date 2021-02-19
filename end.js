const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");//localstorage ile scoru yazdıracagız
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;//burada kullanıcı ismi girilmemişse kaydet butonu actif olmasın tıklanmasın yapıldıgg
});

saveHighScore = e => {
  console.log("clicked the save button!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);//burada alınan puanları sort ile siralıyoruz
  highScores.splice(10);//splice ile burada 10 scordan fazlasını kesşyoruz
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./index.html");
};
