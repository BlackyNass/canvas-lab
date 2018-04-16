var GameObject = function (x = 0, y = 0, w = 0, h = 0, imageSrc = null) {
    this.x = x; 
    this.y = y; 
    this.w = w; 
    this.h = h;
    this.image = new Image();
    this.imageSrc = imageSrc;
    this.loaded = false;
    
};

var ImageObject = function (imageSrc) {
    this.image = new Image();
    this.imageSrc = imageSrc;
    this.loaded = false;
};

GameObject.prototype.detectCollision = function (objectA, objectB) {
    if (
        objectA.x <= (objectB.x + objectA.w)
        && objectB.x <= (objectA.x + objectB.w)
        && objectA.y <= (objectB.y + objectA.h)
        && objectB.y <= (objectA.y + objectB.h)
    ) {
        return true; 
    }
    return false; 
}; 

GameObject.prototype.loadImage = function (){
    this.image.onload = function () { this.loaded = true; };
    if (this.imageSrc) {
        this.image.src = this.imageSrc;
    }
};

GameObject.prototype.print = function (){ };