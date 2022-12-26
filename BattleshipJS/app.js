//Global Variables
var isHorizontal = false;
var selectedShip;
var ships = document.querySelectorAll(".ship");
var playerBoard = Array(10).fill().map(()=>Array(10).fill())
var computerBoard = Array(10).fill().map(()=>Array(10).fill())
var playerHitPoint = 17,computerHitPoint = 17
var playerScore = 0;
var isGameStarted = false
var turn = 0; //0 computer 1 player


var placedShipCounter = 0;

//Required Classes
class seaBox {
    constructor(div,x,y) {
        this.div = div
        this.x = x
        this.y = y
        this.isHitted = false;
        this.div.onclick = () => {
            if(!isGameStarted) {
                if(selectedShip) {
                    let shipSize = selectedShip.children.length;
                    let isPlacable = true;
                    let upperLimit;

                    if(isHorizontal) {
                        upperLimit = y + shipSize - 1;
                        if(upperLimit < 10) {
                            for(let i = y ; i <= upperLimit ; i++) {
                                if(playerBoard[x][i].div.children.length !== 0) {
                                    isPlacable = false;
                                }
                            }
                        }
                        else {
                            isPlacable = false;
                        }
                    }
                    else {
                        upperLimit = x + shipSize - 1;
                        if(upperLimit < 10) {
                            for(let i = x ; i <= upperLimit ; i++) {
                                if(playerBoard[i][y].div.children.length !== 0) {
                                    isPlacable = false;
                                }
                            }
                        }
                        else {
                            isPlacable = false;
                        }
                    }

                    if(isPlacable) {
                        if(isHorizontal) {
                            for(let i = y ; i <= upperLimit ; i++) {
                                playerBoard[x][i].div.append(selectedShip.children[0]);
                                playerBoard[x][i].div.classList.add("horizontal")
                            }
                        }
                        else {
                            for(let i = x ; i <= upperLimit ; i++) {
                                playerBoard[i][y].div.append(selectedShip.children[0]);
                            }
                        }
                        isPlacementFinished();
                    }
        
                }
            }
            
        }
    }
}

class computerBox {
    constructor(div,x,y) {
        this.div = div
        this.x = x
        this.y = y
        this.isEmpty = true
        this.isHitted = false
        div.onclick = () => {
            if(isGameStarted) {
                if(!this.isHitted) {
                    const dot = document.createElement('div');
                    dot.style.width = board.clientWidth / 40 + "px"
                    dot.style.height = board.clientHeight / 40 + "px"
                    dot.style.borderRadius = "10px"
                    dot.style.position = "relative"
                    dot.style.top = "35%"
                    dot.style.left = "35%"
                    if(this.isEmpty) {
                        dot.style.backgroundColor = "white";
                        turn = 0;
                        computerHit();
                        playerScore = playerScore - 10;
                    }
                    else {
                        dot.style.backgroundColor = "red";
                        successfulHit(1)
                        playerScore = playerScore + 50;
                    }
                    this.isHitted = true
                    this.div.append(dot)
                    this.div.style.backgroundColor = "rgb(0, 170, 255)"
                    
                }
            }
        }
    }
}


//Creating The Players Board----------------------------------------
const board = document.getElementById("playerBoard")
for(let x = 0 ; x < 10 ; x++) {
    for(let y = 0 ; y < 10 ; y++) {
        let boxColor = "rgb(0, 170, 255)"
        const box = document.createElement('div');
        box.style.width = board.clientWidth / 10 + "px"
        box.style.height = board.clientHeight / 10 + "px"
        box.style.backgroundColor = boxColor;
        box.style.border = "0.5px solid black"
        playerBoard[x][y] = new seaBox(box,x,y);
        board.append(box);
    }
}
//Creating The Computers Board--------------------------------------
const cBoard = document.getElementById("computerBoard")
for(let x = 0 ; x < 10 ; x++) {
    for(let y = 0 ; y < 10 ; y++) {
        let boxColor = "rgb(0, 170, 255)"
        const box = document.createElement('div');
        box.style.width = board.clientWidth / 10 + "px"
        box.style.height = board.clientHeight / 10 + "px"
        box.style.backgroundColor = boxColor;
        box.style.border = "0.5px solid black"
        computerBoard[x][y] = new computerBox(box,x,y);
        cBoard.append(box);
    }
}
//Filling Computer Board
let shipSizes = [5,4,3,3,2]
for(let i = 0 ; i < shipSizes.length ; i++) {
    while(true) {
        let isPlacable = true
        let horizontalDecision = Math.floor(Math.random() * 2);
        if(horizontalDecision) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * (10-shipSizes[i]+1));
            for(let j = y ; j <= y+shipSizes[i]-1 ; j++) {
                if(!computerBoard[x][j].isEmpty) {
                    isPlacable = false;
                }
            }
            if(isPlacable) {
                for(let j = y ; j <= y+shipSizes[i]-1 ; j++) {
                    computerBoard[x][j].isEmpty = false
                    //computerBoard[x][j].div.style.backgroundColor = "red"
                }
                break;
            }
        }
        else {
            let x = Math.floor(Math.random() * (10-shipSizes[i]+1));
            let y = Math.floor(Math.random() * 10);
            for(let j = x ; j <= x+shipSizes[i]-1 ; j++) {
                if(!computerBoard[j][y].isEmpty) {
                    isPlacable = false;
                }
            }
            if(isPlacable) {
                for(let j = x ; j <= x+shipSizes[i]-1 ; j++) {
                    computerBoard[j][y].isEmpty = false
                    //computerBoard[j][y].div.style.backgroundColor = "red"
                }
                break;
            }
        }
    }
}

//Successful Hit----------------------------------------------------
function successfulHit(ix) {
    //ix = 1 player successful hit
    //ix = 0 computer sucessful hit
    if(ix) {
        if(--computerHitPoint === 0) {
            let pbText = document.getElementById("pbText");
            let cbText = document.getElementById("cbText");
            pbText.innerText = "You Won"
            pbText.style.color = "red"
            cbText.innerText = "You Won"
            cbText.style.color = "red"
            alert("You Won The Game! Your Total Score is: "+playerScore)
            isGameStarted = false;
        }
    }
    else {
        if(--playerHitPoint === 0) {
            let pbText = document.getElementById("pbText");
            let cbText = document.getElementById("cbText");
            pbText.innerText = "You Lost"
            pbText.style.color = "red"
            cbText.innerText = "You Lost"
            cbText.style.color = "red"   
            alert("You Lost The Game... Your Total Score is: "+playerScore  )
            isGameStarted = false;
        }
        else {
            computerHit();
        }
        
    }
}

//Selecting wanted ship---------------------------------------------
for(let x = 0 ; x < ships.length ; x++) {
    ships[x].onclick = () => {
        selectedShip = ships[x];
    }
}

//Reversing Boats---------------------------------------------------
const reverseButton = document.getElementById("reverseButton");
reverseButton.onclick = () => {
    const shipContainer = document.getElementById("shipContainer");
    if(isHorizontal) {
        shipContainer.classList.remove("horizontal");
        isHorizontal = false
    }
    else {
        shipContainer.classList.add("horizontal");
        isHorizontal = true
    }
}

//Computer Random Hit
function computerHit() {
    if(isGameStarted) {
        let x;
        let y;
        while(true) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            if(!playerBoard[x][y].isHitted) {
                break;
            }
        }
        const dot = document.createElement('div');
        dot.style.width = board.clientWidth / 40 + "px"
        dot.style.height = board.clientHeight / 40 + "px"
        dot.style.borderRadius = "10px"
        dot.style.position = "relative"
        dot.style.left = "35%"
        dot.style.top = "35%"

        playerBoard[x][y].isHitted = true;
        if(playerBoard[x][y].div.children.length !== 0) {
            successfulHit(0);
            dot.style.backgroundColor = "red";
            playerBoard[x][y].div.children[0].append(dot)
        }
        else {
            dot.style.backgroundColor = "white";
            playerBoard[x][y].div.append(dot)
            turn = 1;
        }
        
        
    }
    
}

//Check Placement If Placement Finished And Starts The Game---------
function isPlacementFinished() {
    selectedShip = null;
    if(++placedShipCounter === 5) {
        console.log("placement finished");
        let btn = document.getElementById("reverseButton");
        let shipCont = document.getElementById("shipContainer");
        btn.classList.add("displayNone");
        shipCont.classList.add("displayNone");

        let compBoard = document.getElementById("cbDiv");
        compBoard.classList.remove("displayNone");
        
        isGameStarted = true;
        computerHit();
    } 
}

//adding hint button
let hintButton = document.getElementById("hintButton");
hintButton.onclick = () => {
    for(let x = 0 ; x < 10 ; x++) {
        for(let y = 0 ; y < 10 ; y++) {
            if(!computerBoard[x][y].isHitted && !computerBoard[x][y].isEmpty) {
                computerBoard[x][y].div.style.backgroundColor = "red";
                return;
            }
        }
    }
    
}

//PWA 
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("ServiceWorker.js")
			.then((res) => console.log("service worker registered", res))
			.catch((err) => console.log("service worker not registered", err));
	});
}
