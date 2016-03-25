/* 
	Created By: Oniel Toledo
	On: 09/2/2014
	javascript file for in-between card game functionality
*/
var randDeck = new Array();
var deckTrack;
var wager;
var currentHoldings;
var gamesPlayed;

//when loaded for the first time
function initLoad() {
    document.getElementById("info").innerHTML = "To start please enter a whole dollar amount wager and then press 'Start New Game'";  
    document.getElementById("wonOrLost").innerHTML = "";
    document.getElementById("currentHoldings").innerHTML = "";
    document.getElementById("gamesPlayed").innerHTML = "";
}

function startAGame(){
    wager = document.getElementById("initialWager").value;
    if(wager==""){
         alert("Please enter a starting wager before starting a game");
    } else if(isNaN(wager) || (wager.indexOf(".") > -1) ) {
        alert("That is not a valid wager, please enter a whole dollar amount");
    } else { 
        randomizeDeck();
        currentHoldings = parseInt(wager);
        gamesPlayed=0;
        document.getElementById("currentHoldings").innerHTML = currentHoldings;
        document.getElementById("gamesPlayed").innerHTML = gamesPlayed;
        document.getElementById("info").innerHTML = "Deck has been shuffled, select one of the 'play' buttons above to continue";
    }
}

//randomize the deck
function randomizeDeck(){
       //for a valid entered wager shuffle the deck
    for(var i=0; i <52; i++)
        randDeck[i] = Math.floor((Math.random() * 13) + 1);
    deckTrack = 0; 
}

//play 1 game
function playAHand(){
    if(deckTrack >= 51){
        randomizeDeck();
    }
    //card chosen: int
    var c1,c2,c3;
    
    //get 3 cards from the deck
    c1=randDeck[deckTrack];
    deckTrack++;
    c2=randDeck[deckTrack];
    deckTrack++;
    c3=randDeck[deckTrack];
    deckTrack++;

    //pick a card class from one of the four suites
    var class1 = getCardClass(c1);
    var class2 = getCardClass(c2);
    var class3 = getCardClass(c3);

    //update the card classes
    document.getElementById("dealerCard1").className = class1;
    document.getElementById("dealerCard2").className = class2;
    document.getElementById("playerCard").className = class3;

    //if won
    if(c3>c1 && c3<c2){
        currentHoldings++;
        document.getElementById("wonOrLost").innerHTML = "WON!";
    //if lost
    } else {
        currentHoldings--;
        document.getElementById("wonOrLost").innerHTML = "LOST!";
    }
    gamesPlayed++;
    document.getElementById("currentHoldings").innerHTML = currentHoldings;
    document.getElementById("gamesPlayed").innerHTML = gamesPlayed;
}


//play 10,000 games
function play10000Games(){
    //play 10,000 games then output the results
    for(i=0; i < 10000; i++){
        if(deckTrack >= 51){
            randomizeDeck();
        }  
        //pick 3 cards out from the deck
        var c1 = randDeck[deckTrack];
        deckTrack++;
        var c2 = randDeck[deckTrack];
        deckTrack++;
        var c3 = randDeck[deckTrack];
        deckTrack++;
        
        if(c3>c1 && c3<c2) {
            currentHoldings++;
        } else {
            currentHoldings--;
        }
        gamesPlayed++;
    }
    //display the last cards played
    var class1 = getCardClass(c1);
    var class2 = getCardClass(c2);
    var class3 = getCardClass(c3);

    //update the card classes
    document.getElementById("dealerCard1").className = class1;
    document.getElementById("dealerCard2").className = class2;
    document.getElementById("playerCard").className = class3;
    
    document.getElementById("wonOrLost").innerHTML = "10,000 Games Have Been Played!";
    document.getElementById("currentHoldings").innerHTML = currentHoldings;
    document.getElementById("gamesPlayed").innerHTML = gamesPlayed;
    
}

//play until all money is lost
function playTillLose(){
    //repeat until player has 0 dollars left
    while(parseInt(currentHoldings) > 0){
        if(deckTrack >= 51){
            randomizeDeck();
            deckTrack=0;
        }  
        //pick 3 cards out from the deck
        var c1 = randDeck[deckTrack];
        deckTrack++;
        var c2 = randDeck[deckTrack];
        deckTrack++;
        var c3 = randDeck[deckTrack];
        deckTrack++;
        
        if(c3>c1 && c3<c2) {
            currentHoldings++;
        } else {
            currentHoldings--;
        }
        gamesPlayed++;   
    }
    //display the last cards played
    var class1 = getCardClass(c1);
    var class2 = getCardClass(c2);
    var class3 = getCardClass(c3);

    //update the card classes
    document.getElementById("dealerCard1").className = class1;
    document.getElementById("dealerCard2").className = class2;
    document.getElementById("playerCard").className = class3;
    
    document.getElementById("wonOrLost").innerHTML = "You have lost all your money!";
    document.getElementById("currentHoldings").innerHTML = currentHoldings;
    document.getElementById("gamesPlayed").innerHTML = gamesPlayed;
    
}

//function to pick a card from class
function getCardClass(cardNumber) {
    var rand4 = Math.floor((Math.random() * 4) + 1); //for picking a random suite
    var className="";
   switch(cardNumber){
    case 1:
        className = "ace"; 
        break;
   case 2:
        className = "two";
        break;
   case 3:
           className = "three";
        break;
   case 4:
           className = "four";
        break;
   case 5:
           className = "five";
        break;
   case 6:
           className = "six";
        break;
   case 7:
           className = "seven";
       break;
   case 8:
           className = "eight";
       break;
   case 9:
           className = "nine";
       break;
   case 10:
           className = "ten";
       break;
   case 11:
           className = "jack";
       break;
   case 12:
           className = "queen";
       break;
   case 13:
           className = "king";
       break;   
   }
    className += rand4.toString();
    return className; //return the class name
}