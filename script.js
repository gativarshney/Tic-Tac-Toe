let boxes = document.querySelectorAll('.box');
let reset_button = document.getElementById("reset-button");
let newButton = document.getElementById("newButton");
let winGif = document.getElementById("winGif");
let msg = document.getElementById("msg");
let msgContainer = document.querySelector(".msgContainer");
let bgMusicButton = document.getElementById("bgMusic");

let tingSound = document.getElementById("tingSound");
let gameoverSound = document.getElementById("gameover");
let musicSound = document.getElementById("musicSound");
musicSound.volume = 0.5;

const musicControl = (()=>{
    bgMusicButton.addEventListener("click", ()=>{
        if(musicSound.paused){      //auto detect kr lega
            bgMusicButton.innerHTML = "Tap to Pause Music";
            musicSound.play();
        }
        else{
            bgMusicButton.innerHTML = "Tap to Play Music";
            musicSound.pause();
        }   
    });
});
let turnO = true;   // 2 Players - PlayerX & PlayerO
// winPatterns --> 2D Array 
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
const resetGame = (()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
})
let count = 0;
boxes.forEach((box) =>{
    musicControl();
    box.addEventListener("click", ()=>{
        console.log("Box was Clicked");
        if(turnO){      //Player O Turn
            box.style.color = "red";
            box.innerHTML = "O";
            turnO = false;  //X turn 
        }
        else{           // Player X turn
            box.style.color = "blue";
            box.innerHTML = "X";
            turnO = true;   //O turn
        }
        box.disabled = true;
        count++; 
        console.log(count);   
        // jisse ki double tap krein to cheeze change na ho
        checkWinner();
    })
})
const checkWinner = (() =>{
    for (let pattern of winPatterns) {
        
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner " + pos1Val);
                showWinner(pos1Val);
            }
            if(count == 9){
                console.log("Game Draw!");
                gameDraw();
                tingSound.play();
            }        
        }
    }
})
const showWinner = ((winner)=>{
    gameoverSound.play();
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
})
const disableBoxes = (() =>{
    for (let box of boxes) {
        box.disabled = true;
    }
})
const enableBoxes = (()=>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
})
const gameDraw = (()=>{
    document.getElementById("msg").innerHTML = "Game is Draw!";
    msgContainer.classList.remove("hide");
    count = 0;
})
resetButton.addEventListener("click", resetGame);
newButton.addEventListener("click", resetGame);

