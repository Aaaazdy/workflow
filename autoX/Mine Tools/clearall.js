function clearall(Appname) {
  var count = 0;
  var result = false;
  do {
    recents();
    sleep(3500);
    var b = className("android.widget.RelativeLayout").id("clearbox").findOne(5000);
    if (b == null) {
      back();
      launchApp(Appname);
      sleep(1000);
      back();
    }
  } while (b == null);
  b = b.bounds();
  do {
    result = click(b.centerX(), b.centerY());
    sleep(1000);
    count++;
    if (count > 2) {
      // console.log("break from here!!!");
      return false;
    }
  } while (!result && (!className("android.widget.RelativeLayout").id("clearbox").exists()));
  return result;
}//返回是否成功按下清除按钮


do {
  var result = clearall();
} while (!result);