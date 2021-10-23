let btn = document.getElementById('jump');
let play = document.getElementById('btn3');
let count = 1;
let jumpCount = 1;
let wolfCount = 1;
let walking;
let jumpint;
let score = 0;
let wolfInterval;
let cross = true;



function walk() {
    let imgBox = document.getElementById('imgbox1');
    let str = `<img src="img/walking/man${count}.png" alt="">`;
    count++;
    imgBox.innerHTML = str;
    if (count == 4) {
        count = 1;
        walk();
    }
}

function callWalk() {
    walking = setInterval(walk, 200);
}
callWalk();

function jump() {
    let imgBox = document.getElementById('imgbox1');
    let str = `<img src="img/jump/jump${jumpCount}.png" alt="">`;
    jumpCount++;
    imgBox.innerHTML = str;
    if (jumpCount == 9) {
        jumpCount = 1;
        clearInterval(jumpint)
        callWalk();
    }
}

// on button click 
// btn.addEventListener('click', () => {
//     clearInterval(walking);
//     jumpint = setInterval(jump, 90);
// });

// on key down 


function walkWolf() {
    let imgBox = document.getElementById('imgbox2');
    let str = `<img src="img/wolf/wolf${wolfCount}.png" alt="">`;
    wolfCount++;
    imgBox.innerHTML = str;
    if (wolfCount == 4) {
        wolfCount = 1;
        walkWolf();
    }
}

function runWolfInterval() {
    wolfInterval = setInterval(walkWolf, 200);
}

runWolfInterval();
// collision detection

setInterval(() => {
    let man = document.getElementById('imgbox1');
    let wolf = document.getElementById('imgbox2');
    let gameOver = document.getElementById('gameOver');
    mx = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(man, null).getPropertyValue('bottom'));

    wx = parseInt(window.getComputedStyle(wolf, null).getPropertyValue('left'));
    wy = parseInt(window.getComputedStyle(wolf, null).getPropertyValue('bottom'));

    let offsetX = Math.abs(mx - wx);
    let offsetY = Math.abs(my - wy);
    // console.log(offsetY);
    if (offsetX < 60 && offsetY < 59) {
        cross = false;
        wolf.classList.remove('wolfAnimate');
        clearInterval(wolfInterval);
        clearInterval(walking);
        gameOver.style.visibility = 'visible';

    } else if (cross) {
        setTimeout(() => {
            score++;
        }, 1000);
        updateScore(score);
        // updateScore(score);
        // cross = false;
        // setTimeout(() => {
        //     cross = true;
        // }, 1000);


        // setTimeout(() => {
        //     let animationTimeOfWolf = parseInt(window.getComputedStyle(wolf, null).getPropertyValue('animation-duration'));
        //     let newDuration = (animationTimeOfWolf - 0.1);
        //     wolf.style.animationDuration = newDuration;
        //     console.log(newDuration);
        //     if (newDuration == 4.9) {
        //         wolf.style.animationDuration = newDuration + "s";
        //     }
        // }, 1000);
    }
}, 200);

function updateScore(score) {
    let divScore = document.getElementById('scoreid');
    let divScore2 = document.getElementById('scoreid2');
    divScore.innerHTML = score;
    divScore2.innerHTML = score;
}


document.onkeydown = (e) => {
    if (e.key == 'ArrowUp') {
        let man = document.getElementById('imgbox1');
        let wolf = document.getElementById('imgbox2');

        mx = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        my = parseInt(window.getComputedStyle(man, null).getPropertyValue('bottom'));

        man.style.left = mx + 50 + "px";
        man.style.bottom = my + 100 + "px";
        setTimeout(() => {
            man.style.bottom = my - 100 + "px";
        }, 600);
        clearInterval(walking);
        jumpint = setInterval(jump, 90);
    }
    if (e.key == 'ArrowRight') {
        let man = document.getElementById('imgbox1');
        let manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = manX + 10 + "px";
    }
    if (e.key == 'ArrowLeft') {
        let man = document.getElementById('imgbox1');
        let manX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
        man.style.left = manX - 10 + "px";
    }


}


play.addEventListener('click', () => {
    let gameOver = document.getElementById('gameOver');
    gameOver.style.visibility = 'hidden';
    location.reload();
})