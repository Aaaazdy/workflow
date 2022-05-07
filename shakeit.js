while(1){if(device.DeviceMotionEvent) {
  var speed = 30;    // 用来判定的加速度阈值，太大了则很难触发
  var x, y, z, lastX, lastY, lastZ;
  x = y = z = lastX = lastY = lastZ = 0;
  
device.addEventListener('devicemotion', function(event){
   var acceleration = event.accelerationIncludingGravity;
   x = acceleration.x;
   y = acceleration.y;
   if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
      if(navigator.vibrate) {
        navigator.vibrate(500)
      }
      console.log("摇一摇成功");
   }
   lastX = x;
   lastY = y;
}, false);
}
}