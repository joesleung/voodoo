// ----------------------------------------------------------------------------
// File: FpsTimer.js
//
// Copyright (c) 2013 VoodooJs Authors
// ----------------------------------------------------------------------------



/**
 * Measures frames per second and displays it in the top left corner
 * of the screen.
 *
 * @constructor
 * @private
 */
function FpsTimer_() {
  this.showingFps_ = false;
  this.fpsCounter_ = 0;
  this.rpsCounter_ = 0;

  this.fpsDiv_ = document.createElement('div');
  this.fpsDiv_.style.position = 'fixed';
  this.fpsDiv_.style.zIndex = 999999999;
  this.fpsDiv_.style.left = '0px';
  this.fpsDiv_.style.top = '0px';
  this.fpsDiv_.style.backgroundColor = 'black';
  this.fpsDiv_.style.color = 'lime';
  this.fpsDiv_.style.fontStyle = 'bold';
  this.fpsDiv_.style.fontSize = '200%';
  this.fpsDiv_.style.fontFamily = 'sans-serif';
  this.fpsDiv_.display = 'none';

  // Create a timer that runs every second
  var self = this;
  this.fpsTimerId_ = setInterval(function() {
    self.fps_ = self.fpsCounter_;
    self.rps_ = self.rpsCounter_;
    self.fpsCounter_ = 0;
    self.rpsCounter_ = 0;
  }, 1000);
}


/**
 * Stops the fps timer.
 *
 * @private
 */
FpsTimer_.prototype.destroy_ = function() {
  if (this.showingFps_) {
    this.fpsDiv_.display = 'none';
    document.body.removeChild(this.fpsDiv_);
    this.showingFps_ = false;
  }

  // Stop the timer
  window.clearInterval(this.fpsTimerId_);
};


/**
 * Call this for each frame that runs to update the fps counters.
 *
 * @private
 */
FpsTimer_.prototype.frame_ = function() {
  this.fpsCounter_++;

  // Show or hide the frames per second.
  if (window['voodoo']['debug']['showFps']) {
    if (!this.showingFps_) {
      this.fpsDiv_.display = 'block';
      document.body.appendChild(this.fpsDiv_);
      this.showingFps_ = true;
    }

    this.fpsDiv_.innerHTML = 'Frames/second: ' + this.fps_ +
        ', Renders/second: ' + this.rps_;
  }
  else {
    if (this.showingFps_) {
      this.fpsDiv_.display = 'none';
      document.body.removeChild(this.fpsDiv_);
      this.showingFps_ = false;
    }
  }
};


/**
 * Call this for each render that runs to update the rps counters.
 *
 * @private
 */
FpsTimer_.prototype.render_ = function() {
  this.rpsCounter_++;
};


/**
 * The last calculated frames per second.
 *
 * @type {number}
 * @private
 */
FpsTimer_.prototype.fps_ = 0;
