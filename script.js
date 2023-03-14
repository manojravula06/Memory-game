const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableBoard= false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableBoard) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableBoard = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        let cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 6) {
            setTimeout(() => {
                alert(`Congratulations`)
                return shuffleCard();
            }, 1000);
        }
        //onclick flip card
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableBoard = false;
    }
    //shake animation 
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

//shake animation and flip card back
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableBoard = false;
    }, 1200);
}

function shuffleCard() {
    matched=0;
    disableBoard=false;
    cardOne=cardTwo='';
    let arr=[1,2,3,4,5,6,1,2,3,4,5,6];
    arr.sort(()=>Math.random()>0.5?1:-1);

    cards.forEach((card,i)=>{
        card.classList.remove('flip');
        let imgTag = card.querySelector(".back-view img");
        imgTag.src=`images/img${arr[i]}.png`;
        console.log(imgTag)
        card.addEventListener('click',flipCard)
    })
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});