(function() {
    // Vars
    var w                   = window;
    requestAnimationFrame   = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
    var keysDown            = {};
    
    // Events
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
    
    
    
    var main = function () {
        
        requestAnimationFrame(main);
    };
    
})();