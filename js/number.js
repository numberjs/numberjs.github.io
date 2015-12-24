//enumerators
Number.prototype.times = function(callback) {
  var callback = callback || function(e){ return e;};
  for(var i = 0; i<this; i++) callback(i);
};
Number.prototype.map = function(callback) {
  var x = [], 
      callback = callback || function(e){ return e}; 
  for(var i = 0; i<this; i++) x.push(callback(i));
  return x;
};
//easy time calculations
//todo: week, year, month, century, decade
Number.prototype.day = Number.prototype.days = function() {
  return (this * 3600 * 24 * 1000);
};
Number.prototype.hour = Number.prototype.hours = function() {
  return (this * 3600 * 1000);
};
Number.prototype.minute = Number.prototype.minutes = function() {
  return (this * 60 * 1000);
};
Number.prototype.second = Number.prototype.seconds = function() {
  return (this * 1000);
};
Number.prototype.millisecond = Number.prototype.milliseconds = function() {
  return (this);
};
Number.prototype.ago = function() {
  var d = new Date();
  return (d.getTime() - this); 
};
Number.prototype.from_now = function() {
  var d = new Date();
  return (d.getTime() + this); 
};
//assuming it's a date x number of milliseconds
Number.prototype.to_human = function() {
  return new Date(this);
}
Number.prototype.send = function(method) {
  return this[method]();
};
Number.prototype.random = function() {
  var buf = new Uint8Array(1);
  return window.crypto.getRandomValues(buf)[0] % this;
}
