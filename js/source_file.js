(function() {
    
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var canvas          = document.createElement("canvas");
var context         = canvas.getContext("2d");
var gameContainer   = document.getElementById("gcontainer");

var pigCaught       = 0;
var keysDown        = {};

canvas.width        = 500;
canvas.height       = 500;
gameContainer.appendChild(canvas);

var dragon = {
    speed: 256, 
    x: 0,
    y: 0,
    w: 32, 
    h: 32,
    img: new Image(),
    imgSrc: "img/dragon_form.png",
    imgReady: false
};

var pig = {
    speed: 0,
    x: 0,
    y: 0,
    w: 32, 
    h: 32,
    img: new Image(),
    imgSrc: "img/pig_form.png",
    imgReady: false
};


dragon.img.onload = function () { dragon.imgReady = true; };
pig.img.onload = function () { pig.imgReady = true; };
dragon.img.src = dragon.imgSrc;
pig.img.src = pig.imgSrc;


addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

addEventListener("", function () { 

});

var reset = function () {
    
    if ( dragon.x === 0 && dragon.y === 0) {
        dragon.x = canvas.width / 2;
        dragon.y = canvas.height / 2;
    }
    
    pig.x = pig.w + (Math.random() * (canvas.width - (pig.w * 2)));
    pig.y = pig.h + (Math.random() * (canvas.height - (pig.h * 2)));
};


var update = function (modifier) {
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    var step = dragon.speed * modifier;
    
    if (38 in keysDown) { 
        if (dragon.y - step > 0) {
            dragon.y -= step;
        }
    }
    if (40 in keysDown) {
        if( ( (dragon.y + dragon.h) + step ) < canvas.height){
            dragon.y += step;
        }
    }
    if (37 in keysDown) { 
        if (dragon.x - step > 0) {
            dragon.x -= step;
        }
    }
    if (39 in keysDown) {
        if( ( (dragon.x + dragon.w) + step ) < canvas.width){
            dragon.x += step;
        }
    }
     // Déplacement
    
    if (isTouching(dragon, pig)) {
        ++pigCaught;
        reset();
    }

};

var isTouching = function (elementA, elementB) {
    if (
        elementA.x <= (elementB.x + elementA.w)
        && elementB.x <= (elementA.x + elementB.w)
        && elementA.y <= (elementB.y + elementA.h)
        && elementB.y <= (elementA.y + elementB.h)
    ) {
        return true; 
    }
    return false; 
}

var render = function () {
    if (dragon.imgReady) {
        context.drawImage(dragon.img, dragon.x, dragon.y);
    }

    if (pig.imgReady) {
        context.drawImage(pig.img, pig.x, pig.y);
    }

    context.fillStyle = "rgb(255, 14, 100)";
    context.font = "11px Helvetica";
    context.fillText("C : " + pigCaught, 5, 10);
    context.fillText("T : " + pigCaught, 5, 25);
};


var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};


var then = Date.now();
reset();
main();

})();