let rythmRunner = new function() {
  //KeyCodes 81, 87, 79, 80 | q, w, o, p
  this.keyRotation = [81, 87, 79, 80];
  this.currentKeyIndex = 0;
  this.currentKey = function() {return this.keyRotation[this.currentKeyIndex];}
  this.pressKey = function(keyCode) {
    let e = new Event('keydown');
    e.keyCode = keyCode;
    document.dispatchEvent(e);
  }
  this.releaseKey = function(keyCode) {
    let e = new Event('keyup');
    e.keyCode = keyCode;
    document.dispatchEvent(e);
  }
  this.switchKeys = function(){
    let nextIndex = this.currentKeyIndex + 1;
    if (nextIndex >= this.keyRotation.length) {
      nextIndex = 0;
    }
    this.releaseKey(this.currentKey());
    this.pressKey(this.keyRotation[nextIndex]);
    this.currentKeyIndex = nextIndex;
  }
  this.run = function(){
    this.pressKey(this.currentKey())
    this.switchInterval = setInterval(() => {
      this.switchKeys();
    }, 2000);
  }
  this.stopRun = function(){
    clearInterval(this.switchInterval);
    this.keyRotation.forEach((key) => {
      this.releaseKey(key);
    })
  }
}
