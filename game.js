const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));//“Array.from ()”, içine yazılan değerleri ayırır. ayırdığı her şeyi bir dizi öğesi olarak tanımlar.
const progressText = document.getElementById('progressText');//bu score gostergesi olacak
const timeText = document.getElementById('timeText');//bu score gostergesi olacak
const timeBarFull = document.getElementById('timeBarFull');
let timeCounter = 0;//
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQueston = {};//ekranda sorulan soru
let acceptingAnswers = false;//verilen cevap
let score = 0;//ekranda 0 dan baslayan bir skor tablosu olacak
let questionCounter = 0;//
let availableQuesions = []; // tekrak aynı soruları sorulmaması icin mevcut sorulardan cıkarılacak

setInterval(() => soruolustur, 1)

soruolustur=()=>{
  const sayi1=Math.round(Math.random()*9)
  const sayi2=Math.round(Math.random()*9)
  const sayitoplam=sayi1*sayi2
  var sayilar = [];
  sayilar[0]= sayitoplam

  do {
    sayilar[1]= Math.round(Math.random()*99)
    sayilar[2]= Math.round(Math.random()*99)
    sayilar[3]= Math.round(Math.random()*99)
   } while ( (sayilar[0] == sayilar[1]) || (sayilar[0] == sayilar[2]) || (sayilar[0] == sayilar[3]) ||
             (sayilar[1] == sayilar[2]) || (sayilar[1] == sayilar[3]) || (sayilar[2] == sayilar[3])  );
   
  //Burda elimizdeki diziyi karıştırmak istiyoruz...
  var choice = [];
  
  do {
    choice[0]= sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[1]= sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[2]= sayilar[Math.floor(Math.random() * sayilar.length)]
    choice[3]= sayilar[Math.floor(Math.random() * sayilar.length)]
   } while ( (choice[0] == choice[1]) || (choice[0] == choice[2]) || (choice[0] == choice[3]) ||
             (choice[1] == choice[2]) || (choice[1] == choice[3]) || (choice[2] == choice[3]) );
   
  for (i=0; i<4; i++){ 
    if(choice[i] == sayitoplam)
      answerIndex = i+1;
  } 
  let k=new Object;
  k={    
  question: sayi1+" "+"*" + " "+sayi2+"   " +"Bu iki sayının carpımı kactır",
   choice1: choice[0],
   choice2: choice[1],
   choice3: choice[2],
   choice4: choice[3],
  answer: answerIndex    //hangi choice sayitoplam'a eşitse onu answera atacağız.
 }
 return k;
}
let questions = [];
for (let k = 0; k < 10; k++) {
  questions.push(soruolustur())
}

let switchA = 0;//müzikle alakalı kısım
document.querySelector("#startstop").addEventListener("click", () => {

  if (switchA == 1) {
    document.querySelector("#muzik").pause();
  } else {
    document.querySelector("#muzik").play();
  }
  switchA = !switchA;
})
//end müzikle alakalı kısım



timerPrint = () => {
  setInterval(() => {
    timeCounter++;
    timeText.innerText = `Time ${timeCounter}/${maxtime}`;
    timeBarFull.style.width = `${(timeCounter / maxtime) * 100}%`;
    if (timeCounter == 10) {
      getNewQuestion()
      timeCounter = 0
    }
  }, 1000)

}
timerPrint();

//contants
const correct_paun = 10; //soru basına puan
const maxQuestions = 10;//soru sorulma adeti
const maxtime = 10;//soru sorulma adeti
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];  //burada Spread Operatör, kullandır yukarıdaki gibi uzun yazmamıza gerek kalmadı
  console.log(availableQuesions);
  getNewQuestion();//cekilen her yeni soru al
};
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter > maxQuestions) {// bunu yapmamım amacı ilerde soru havuzundan soru sorma odevinde kullanmak icin 
    // buradaki if li kısım sorular bittiğinde ve soru sayısı bittiğinde bizi end.html sayfasına yönlendirecek
    localStorage.setItem("mostRecentScore", score);//score degeri belirtir, mostrecentscore ise degerin hangi isimle kaydedeceğidir isimle scor değeri kaydedilir
    // go to the end page
    return window.location.assign('./end.html');
  }

  questionCounter++;//soru sayacını bir arttırma
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;//burada soru counterlarını yaptık

  // update the progress bar
  console.log;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;//burada soru sayısına gore ilerleyen bar yaptık bunu zaman sayacı olarakta kullanabiliriz
  const questionindex = Math.floor(Math.random() * availableQuesions.length);//ileride bu yapıyı kullanmak için zaptım burada availableQuesionsçlength dememizin sebebi soru sayısı sürekli azalacak ve azalan sayıdan random olarak getirecek
  currentQuestion = availableQuesions[questionindex];
  question.innerText = currentQuestion.question; // bu iki satırda soruları innerText metedo ile text seklinde getirdik

  choices.forEach(choice => {//burada foreach ile soru numaralarına ulaşacagız 
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];// bu üc satırla secenekleri soru numarası ile aynı olacak sekilde getirildi
    //currentQuestion ile gelen sorunun sıkları gelmesi sağlandı
  });
  availableQuesions.splice(questionindex, 1);//sorunun doğru yanlıs sorgulaması yapılması
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
    timeCounter = 0;
    acceptingAnswers = false;
    const selectedChoise = e.target;//tıklanan seceneğ, aktarıyoruz
    const selectedAnswer = selectedChoise.dataset['number'];//burada dataset ile choise un numarası alınıyor
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";//burada cevabın doğru yanlış olduğu sorgulaması yapıldı
    if (classToApply === 'correct') {
      incrementScore(correct_paun);
    }
    selectedChoise.parentElement.classList.add(classToApply);//burası seceneklere tıklanınca zemin rengi ekliyor
    setTimeout(() => {
      selectedChoise.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);//her tıklamada bir saniye bekledikten sonra yeni soru gelecek
  });
});
incrementScore = num => {// burada scor tablosunun gosterimi yapıldı
  score += num;
  scoreText.innerText = score;
}
/*tıklama işlemi yapılacak buton*/
var tamEkranButon = document.getElementById("Fullscreen-button");
function Fullscreen() {
  /*tam ekran yapılacak div*/
  var tamEkranDiv = document.getElementById("container2");
  /*tarayıcının tam ekranı destekleyip desteklemediğini kontrol edyiyoruz. Tam ekran yapılacak div ile.*/
  var tamEkranFonk = tamEkranDiv.requestFullscreen ||
    tamEkranDiv.mozRequestFullScreen ||
    tamEkranDiv.msRequestFullscreen ||
    tamEkranDiv.webkitRequestFullScreen;
  tamEkranFonk.call(tamEkranDiv);
}
/*tıklandığında çalıştırılacak fonksiyonu bağlama*/
tamEkranButon.addEventListener('click', Fullscreen);
startGame();
