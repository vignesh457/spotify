//initial declarations
var audio = new Audio("./songs/0.mp3");
let masterPlay = document.getElementById("master-play");
let progressBar = document.getElementById("progress-bar");
let vol = document.getElementById("volume");
let songIndex = 0;
let colorArr = [[255, 88, 58],[255, 144, 50],[254, 221, 15],[75, 150, 62],[35, 67, 159],[86, 20, 117]];
let colorState=0;
let playState=false;
//master play and pause
masterPlay.addEventListener('click',()=>{
  if(audio.paused || audio.duration<=0){
    audio.play();
    disco("play");
    masterPlay.src="./images/pause.png";
    stateToggle(songIndex,"pause","master");
  }
  else{
    audio.pause();
    disco("pause");
    masterPlay.src="./images/play.png";
    stateToggle(songIndex,"play","master");
  }
});
// progress bar updating and seeking
audio.addEventListener('timeupdate',()=>{
  progressBar.value=(audio.currentTime/audio.duration)*100;
  if(progressBar.value==100){
    nextFunction();
  }
});
progressBar.addEventListener('change',()=>{
  let prev = audio.currentTime;
  audio.currentTime=(progressBar.value*audio.duration)/100;
});
//volume control
vol.addEventListener('change',()=>{
  audio.volume=vol.value/10;
});
//Make all play function
function makeAllPlay(){
  Array.from(document.getElementsByClassName("card")).forEach((element)=>{
    let customPlay = element.getElementsByClassName("custom-play")[0];
    customPlay.src="./images/play-g.png";
    element.style.background="rgba(0,0,0,0.25)";
  });
}
//Random play and pause
Array.from(document.getElementsByClassName("card")).forEach((element)=>{
  let customPlay = element.getElementsByClassName("custom-play")[0];
  customPlay.addEventListener('click',()=>{
      let tempIndex=Number.parseInt(element.getAttribute("id"));
      makeAllPlay();
      if(tempIndex!=songIndex)
      {
        audio.src=`./songs/${tempIndex}.mp3`;
        songIndex=tempIndex;
      }
      if(audio.paused ){
        audio.play();
        disco("play");
        customPlay.src="./images/pause-g.png";
        masterPlay.src="./images/pause.png";
      }else
      {
        audio.pause();
        disco("pause");
        customPlay.src="./images/play-g.png";
        masterPlay.src="./images/play.png";
      }
      element.style.background="rgba(150,150,150,0.25)";
      //status post
      let statusPoster = document.getElementById("status-poster");
      let poster = element.getElementsByClassName("poster")[0];
      statusPoster.src=poster.src;
      //status text
      let statusBarText = document.getElementById("status-bar-text");
      let cardText = element.getElementsByClassName("card-text")[0];
      statusBarText.innerHTML=cardText.innerHTML;
  });
});
// previous and next Songs
document.getElementById("previous").addEventListener('click',prevFunction);
document.getElementById("next").addEventListener('click',nextFunction);
//previous and next function
function prevFunction(){
  stateToggle(songIndex,"play");
  songIndex=(songIndex==0)?7:(songIndex-1);
  audio.src=`./songs/${songIndex}.mp3`;
  audio.play();
  disco("play");
  stateToggle(songIndex,"pause","prev");
}
function nextFunction(){
  stateToggle(songIndex,"play");
  songIndex=(songIndex==7)?0:(songIndex+1);
  audio.src=`./songs/${songIndex}.mp3`;
  audio.play();
  disco("play");
  stateToggle(songIndex,"pause","next");
}
// stateToggle function()
function stateToggle(id,state,location){
  let currId = document.getElementById(`${id}`);
  let customPlay = currId.getElementsByClassName("custom-play")[0];
  customPlay.src=`./images/${state}-g.png`;
  currId.style.background = (state=="play" && location!="master")?"rgba(0,0,0,0.25)":"rgba(150,150,150,0.25)";
  //status poster
  let statusPoster = document.getElementById("status-poster");
  let poster = currId.getElementsByClassName("poster")[0];
  statusPoster.src=poster.src;
  //status text
  let statusBarText = document.getElementById("status-bar-text");
  let cardText = currId.getElementsByClassName("card-text")[0];
  statusBarText.innerHTML=cardText.innerHTML;
}
//Disco lighting
function disco(playState){

  var interval=setInterval(()=>{
    let element = document.getElementsByClassName("song-container")[0];
    let r = colorArr[colorState][0];
    let g = colorArr[colorState][1];
    let b = colorArr[colorState][2];
    clearInterval(interval);
    element.style.backgroundImage=`linear-gradient(rgba(${r},${g},${b},0.8) -8%, rgb(18, 18, 18) 70%)`;
    colorState=(colorState+1)%6;
  },1000);
}
