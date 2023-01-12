const heures = document.getElementById('heures');
const minutes = document.getElementById('minutes');
const secondes = document.getElementById('secondes');
const btnLancer = document.querySelector('.lancer');
const btnActualiser = document.querySelector('.actualiser');
const tempsRestant = document.querySelector('.reste');
let seconde;
let minute;
let heure;
let audio = new Audio('song.mp3');


//ecouter les secondes
secondes.addEventListener('input', (e) => {
     seconde = e.target.value;
});

//ecouter les minutes
minutes.addEventListener('input', (e) => {
     minute = e.target.value;
});

//ecouter les heures
heures.addEventListener('input', (e) => {
     heure = e.target.value;
});


//ecouter le click et lancer le minuteur
let lock = false;
btnLancer.addEventListener('click', handleTime);
function handleTime() {
     // stopSong();
     lock = true;
     
     tempsRestant.innerHTML = heure + "h " + minute + "min " + seconde + "s";
     
     const interval = setInterval(() => {
          goTime();
     }, 1000);
     
     if (heure === 0 && minute === 0 && seconde === 0){
          clearInterval(interval);
          tempsRestant.innerHTML = "Temps écoulé";
          playSong()
     };
     
     //clearInterval
     btnActualiser.addEventListener('click', () => {
          tempsRestant.innerHTML = "Temps restant";
          clearInterval(interval);
          btnLancer.addEventListener('click', handleTime)
     })

     //eviter de casser le minuteur
     if(lock) {
          btnLancer.removeEventListener('click', handleTime)
     }
}

function goTime() {
     if(seconde <= 60 && seconde >= 1) {
          tempsRestant.innerHTML = heure + "h " + minute + "min " + seconde-- +"s";
          secondes.value = "";
          minutes.value = "";
          heures.value = "";
     }else if(minute > 0 && seconde === 0){
          tempsRestant.innerHTML = heure + "h " + minute-- + "min " + seconde + "s";
          seconde = 59;
     } else if (heure > 0 && minute === 0 && seconde === 0){
          tempsRestant.innerHTML = heure-- + "h " + minute + "min " + seconde + "s";
          seconde = 59;
          minute = 59;
     } else if (heure === 0 && minute === 0 && seconde === 0){
          tempsRestant.innerHTML = "Temps écoulé";
          playSong();
     } else {
          tempsRestant.innerHTML = "Temps écoulé";
          playSong();
     }
};

function playSong() {
     audio.play();
     setTimeout(() => {
          audio.pause()
     }, 1000)
}


//pour afficher la date en temps réel
const horloge = function(){
     let date = new Date();

     let h = date.getHours();
     let m = date.getMinutes();
     let s = date.getSeconds();

     if(s < 10){
          s = "0" + s;
     }
     if(m < 10){
          m = "0" + m;
     }

     let affichage = h + ":" + m + ":" + s;

     document.getElementById('horloge').innerHTML = affichage;
};
setInterval(horloge, 1000);
