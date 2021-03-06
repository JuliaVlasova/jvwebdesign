(function(h, f, k, g) {
 function a(c, b) {
  this.element = c;
  this.$context = h(c).data("api", this);
  this.$layers = this.$context.find(".layer");
  var a = {
    calibrateX: this.$context.data("calibrate-x") || null,
    calibrateY: this.$context.data("calibrate-y") || null,
    invertX: this.$context.data("invert-x") || null,
    invertY: this.$context.data("invert-y") || null,
    limitX: parseFloat(this.$context.data("limit-x")) || null,
    limitY: parseFloat(this.$context.data("limit-y")) || null,
    scalarX: parseFloat(this.$context.data("scalar-x")) || null,
    scalarY: parseFloat(this.$context.data("scalar-y")) ||
     null,
    frictionX: parseFloat(this.$context.data("friction-x")) || null,
    frictionY: parseFloat(this.$context.data("friction-y")) || null,
    originX: parseFloat(this.$context.data("origin-x")) || null,
    originY: parseFloat(this.$context.data("origin-y")) || null
   },
   d;
  for (d in a) null === a[d] && delete a[d];
  h.extend(this, m, b, a);
  this.calibrationTimer = null;
  this.calibrationFlag = !0;
  this.enabled = !1;
  this.depths = [];
  this.bounds = this.raf = null;
  this.vy = this.vx = this.my = this.mx = this.iy = this.ix = this.cy = this.cx = this.ery = this.erx = this.ecy = this.ecx =
   this.eh = this.ew = this.ey = this.ex = 0;
  this.onMouseMove = this.onMouseMove.bind(this);
  this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
  this.onOrientationTimer = this.onOrientationTimer.bind(this);
  this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
  this.onAnimationFrame = this.onAnimationFrame.bind(this);
  this.onWindowResize = this.onWindowResize.bind(this);
  this.initialise()
 }
 var m = {
  relativeInput: !1,
  clipRelativeInput: !1,
  calibrationThreshold: 100,
  calibrationDelay: 500,
  supportDelay: 500,
  calibrateX: !1,
  calibrateY: !0,
  invertX: !0,
  invertY: !0,
  limitX: !1,
  limitY: !1,
  scalarX: 10,
  scalarY: 10,
  frictionX: .1,
  frictionY: .1,
  originX: .5,
  originY: .5
 };
 a.prototype.transformSupport = function(c) {
  for (var b = k.createElement("div"), a = !1, d = null, d = !1, n = null, h = null, l = 0, m = this.vendors.length; l < m; l++)
   if (null !== this.vendors[l] ? (n = this.vendors[l][0] + "transform", h = this.vendors[l][1] + "Transform") : h = n = "transform", b.style[h] !== g) {
    a = !0;
    break
   }
  switch (c) {
   case "2D":
    d = a;
    break;
   case "3D":
    a && (c = k.body || k.createElement("body"), a = k.documentElement,
     l = a.style.overflow, k.body || (a.style.overflow = "hidden", a.appendChild(c), c.style.overflow = "hidden", c.style.background = ""), c.appendChild(b), b.style[h] = "translate3d(1px,1px,1px)", d = f.getComputedStyle(b).getPropertyValue(n), d = d !== g && 0 < d.length && "none" !== d, a.style.overflow = l, c.removeChild(b))
  }
  return d
 };
 a.prototype.ww = null;
 a.prototype.wh = null;
 a.prototype.wcx = null;
 a.prototype.wcy = null;
 a.prototype.wrx = null;
 a.prototype.wry = null;
 a.prototype.portrait = null;
 a.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
 a.prototype.vendors = [null, ["-webkit-", "webkit"],
  ["-moz-", "Moz"],
  ["-o-", "O"],
  ["-ms-", "ms"]
 ];
 a.prototype.motionSupport = !!f.DeviceMotionEvent;
 a.prototype.orientationSupport = !!f.DeviceOrientationEvent;
 a.prototype.orientationStatus = 0;
 a.prototype.transform2DSupport = a.prototype.transformSupport("2D");
 a.prototype.transform3DSupport = a.prototype.transformSupport("3D");
 a.prototype.propertyCache = {};
 a.prototype.initialise = function() {
  "static" === this.$context.css("position") && this.$context.css({
   position: "relative"
  });
  this.accelerate(this.$context);
  this.updateLayers();
  this.updateDimensions();
  this.enable();
  this.queueCalibration(this.calibrationDelay)
 };
 a.prototype.updateLayers = function() {
  this.$layers = this.$context.find(".layer");
  this.depths = [];
  this.$layers.css({
   position: "absolute",
   display: "block",
   left: 0,
   top: 0
  });
  this.$layers.first().css({
   position: "relative"
  });
  this.accelerate(this.$layers);
  this.$layers.each(h.proxy(function(c, a) {
   this.depths.push(h(a).data("depth") || 0)
  }, this))
 };
 a.prototype.updateDimensions = function() {
  this.ww =
   f.innerWidth;
  this.wh = f.innerHeight;
  this.wcx = this.ww * this.originX;
  this.wcy = this.wh * this.originY;
  this.wrx = Math.max(this.wcx, this.ww - this.wcx);
  this.wry = Math.max(this.wcy, this.wh - this.wcy)
 };
 a.prototype.updateBounds = function() {
  this.bounds = this.element.getBoundingClientRect();
  this.ex = this.bounds.left;
  this.ey = this.bounds.top;
  this.ew = this.bounds.width;
  this.eh = this.bounds.height;
  this.ecx = this.ew * this.originX;
  this.ecy = this.eh * this.originY;
  this.erx = Math.max(this.ecx, this.ew - this.ecx);
  this.ery = Math.max(this.ecy,
   this.eh - this.ecy)
 };
 a.prototype.queueCalibration = function(c) {
  clearTimeout(this.calibrationTimer);
  this.calibrationTimer = setTimeout(this.onCalibrationTimer, c)
 };
 a.prototype.enable = function() {
  this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, f.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cy = this.cx = 0, this.portrait = !1, f.addEventListener("mousemove", this.onMouseMove)), f.addEventListener("resize", this.onWindowResize),
   this.raf = requestAnimationFrame(this.onAnimationFrame))
 };
 a.prototype.disable = function() {
  this.enabled && (this.enabled = !1, this.orientationSupport ? f.removeEventListener("deviceorientation", this.onDeviceOrientation) : f.removeEventListener("mousemove", this.onMouseMove), f.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
 };
 a.prototype.calibrate = function(c, a) {
  this.calibrateX = c === g ? this.calibrateX : c;
  this.calibrateY = a === g ? this.calibrateY : a
 };
 a.prototype.invert = function(c, a) {
  this.invertX =
   c === g ? this.invertX : c;
  this.invertY = a === g ? this.invertY : a
 };
 a.prototype.friction = function(c, a) {
  this.frictionX = c === g ? this.frictionX : c;
  this.frictionY = a === g ? this.frictionY : a
 };
 a.prototype.scalar = function(c, a) {
  this.scalarX = c === g ? this.scalarX : c;
  this.scalarY = a === g ? this.scalarY : a
 };
 a.prototype.limit = function(c, a) {
  this.limitX = c === g ? this.limitX : c;
  this.limitY = a === g ? this.limitY : a
 };
 a.prototype.origin = function(a, b) {
  this.originX = a === g ? this.originX : a;
  this.originY = b === g ? this.originY : b
 };
 a.prototype.clamp = function(a, b, e) {
  a =
   Math.max(a, b);
  return a = Math.min(a, e)
 };
 a.prototype.css = function(a, b, e) {
  var d = this.propertyCache[b];
  if (!d)
   for (var f = 0, k = this.vendors.length; f < k; f++)
    if (d = null !== this.vendors[f] ? h.camelCase(this.vendors[f][1] + "-" + b) : b, a.style[d] !== g) {
     this.propertyCache[b] = d;
     break
    }
  a.style[d] = e
 };
 a.prototype.accelerate = function(a) {
  for (var b = 0, e = a.length; b < e; b++) {
   var d = a[b];
   this.css(d, "transform", "translate3d(0,0,0)");
   this.css(d, "transform-style", "preserve-3d");
   this.css(d, "backface-visibility", "hidden")
  }
 };
 a.prototype.setPosition =
  function(a, b, e) {
   b += "px";
   e += "px";
   this.transform3DSupport ? this.css(a, "transform", "translate3d(" + b + "," + e + ",0)") : this.transform2DSupport ? this.css(a, "transform", "translate(" + b + "," + e + ")") : (a.style.left = b, a.style.top = e)
  };
 a.prototype.onOrientationTimer = function(a) {
  this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
 };
 a.prototype.onCalibrationTimer = function(a) {
  this.calibrationFlag = !0
 };
 a.prototype.onWindowResize = function(a) {
  this.updateDimensions()
 };
 a.prototype.onAnimationFrame = function() {
  this.updateBounds();
  var a = this.ix - this.cx,
   b = this.iy - this.cy;
  (Math.abs(a) > this.calibrationThreshold || Math.abs(b) > this.calibrationThreshold) && this.queueCalibration(0);
  this.portrait ? (this.mx = this.calibrateX ? b : this.iy, this.my = this.calibrateY ? a : this.ix) : (this.mx = this.calibrateX ? a : this.ix, this.my = this.calibrateY ? b : this.iy);
  this.mx = this.scalarX / 100 * this.mx * this.ew;
  this.my = this.scalarY / 100 * this.my * this.eh;
  isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX));
  isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY));
  this.vx += (this.mx - this.vx) * this.frictionX;
  this.vy += (this.my - this.vy) * this.frictionY;
  a = 0;
  for (b = this.$layers.length; a < b; a++) {
   var e = this.depths[a];
   this.setPosition(this.$layers[a], this.vx * e * (this.invertX ? -1 : 1), this.vy * e * (this.invertY ? -1 : 1))
  }
  this.raf = requestAnimationFrame(this.onAnimationFrame)
 };
 a.prototype.onDeviceOrientation = function(a) {
  if (!this.desktop && null !== a.beta && null !== a.gamma) {
   this.orientationStatus =
    1;
   var b = (a.beta || 0) / 30;
   a = (a.gamma || 0) / 30;
   var e = f.innerHeight > f.innerWidth;
   this.portrait !== e && (this.portrait = e, this.calibrationFlag = !0);
   this.calibrationFlag && (this.calibrationFlag = !1, this.cx = b, this.cy = a);
   this.ix = b;
   this.iy = a
  }
 };
 a.prototype.onMouseMove = function(a) {
  var b = a.clientX;
  a = a.clientY;
  !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (b = Math.max(b, this.ex), b = Math.min(b, this.ex + this.ew), a = Math.max(a, this.ey), a = Math.min(a, this.ey + this.eh)), this.ix = (b - this.ex - this.ecx) / this.erx,
   this.iy = (a - this.ey - this.ecy) / this.ery) : (this.ix = (b - this.wcx) / this.wrx, this.iy = (a - this.wcy) / this.wry)
 };
 var p = {
  enable: a.prototype.enable,
  disable: a.prototype.disable,
  updateLayers: a.prototype.updateLayers,
  calibrate: a.prototype.calibrate,
  friction: a.prototype.friction,
  invert: a.prototype.invert,
  scalar: a.prototype.scalar,
  limit: a.prototype.limit,
  origin: a.prototype.origin
 };
 h.fn.parallax = function(c) {
  var b = arguments;
  return this.each(function() {
   var e = h(this),
    d = e.data("parallax");
   d || (d = new a(this, c), e.data("parallax",
    d));
   p[c] && d[c].apply(d, Array.prototype.slice.call(b, 1))
  })
 }
})(window.jQuery || window.Zepto, window, document);