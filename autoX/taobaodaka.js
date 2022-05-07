//清除后台进程
function clearall() {
  do {
    recents();
    sleep(3500);
    var b = className("android.widget.RelativeLayout").id("clearbox").findOne(5000);
    if (b == null) {
      back();
      sleep(1000);
      back();
    }
  } while (b == null);
  b = b.bounds();
  var result = click(b.centerX(), b.centerY());
  sleep(3500);
  return result;
}//返回是否成功按下清除按钮


// open用来打开app
function open(Appname) {
  var flag = false;
  do {
    flag = launchApp(Appname);
    sleep(3000) //等待应用打开
  } while (!flag);
  return flag;
}//返回是否成功打开app

// window为打卡提示标志,说明正在打卡
function window() {
  var window = floaty.rawWindow(
    <frame gravity="center" bg='#77ff0000'>
      <text id='text' textSize='56sp'>
        正在打卡中!!!
      </text>
    </frame >
  );
  window.exitOnClose();
  window.setTouchable(false);
  sleep(1000);
}


//check为进入淘宝签到页面,进行签到,后退出
function check() {
  var button1 = desc("我的淘宝").depth(10).indexInParent(4).findOne(10000);
  if (button1 == null)
    return false;
  button1.click();
  sleep(7000);
  var button2 = text("红包签到").depth(14).indexInParent(14).findOne(10000);
  sleep(1000);
  if (button2 == null) {
    console.log("没有找到按钮");
    return false;
  }
  var button3 = button2.parent().child(12);
  button3.click();
  // click(82, 155);//点击签到
  sleep(5000);

  //进入页面后返回
  do {
    var checkbacktext = text("红包签到").depth(10).indexInParent(1).findOne(10000);
    var checkback = checkbacktext.parent().child(0);
    checkback.click();
    sleep(2000);
  } while (currentActivity() == "com.taobao.browser.BrowserActivity");
  if (currentActivity() == "com.taobao.tao.TBMainActivity")
    return true;
  else
    return false;
}


function isDeviceLocked() {
  importClass(android.app.KeyguardManager)
  importClass(android.content.Context)

  var km = context.getSystemService(Context.KEYGUARD_SERVICE);
  console.log("is keyguard locked:" + km.isKeyguardLocked());
  console.log("is keyguard secure:" + km.isKeyguardSecure());
  return km.isKeyguardLocked() && km.isKeyguardSecure();;
}




//用来进行账号切换
function changeaccount(index) {
  var button = desc("我的淘宝").depth(10).indexInParent(4).findOne(10000);
  if (button == null)
    return false;
  button.click();
  sleep(3000);


  var setting = desc("设置").depth(13).indexInParent(11);
  if (setting == null)
    return false;
  setting.click();
  sleep(2000);
  if (currentActivity() == "com.taobao.mytaobao.newsetting.NewTaobaoSettingActivity")
    console.log("进入设置界面");
  else {
    console.log("没有进入设置界面");
    return false;
  }
  sleep(2000);
  uiobject.scrollDown();
  sleep(2000);
  var change = text("切换账号").depth(9).indexInParent(0).findOne(10000);
  if (change == null) {
    console.log("没有找到切换按钮");
    return false;
  }
  change.click();
  sleep(2000);
  if (currentActivity() == "com.taobao.login4android.membercenter.account.MultiAccountActivity")
    console.log("进入切换界面");
  else {
    console.log("没有进入切换界面");
    return false;
  }
  sleep(2000);

  var changeto = text("换个账号登录").className("android.widget.Button").depth(11).indexInParent(1).findOne(10000);
  if (changeto == null)
    return false;
  var account = changeto.parent().child(0).child(index);
  account.click();
  sleep(5000);
  if (currentActivity() == "com.taobao.tao.TBMainActivity")
    return true;
  else
    return false;
}

function init() {
  toast("开始淘宝打卡!!!");
  console.log("is device locked:" + isDeviceLocked());
  auto.waitFor();
  sleep(3000);
  var result = clearall();
  // console.log('是否成功清除后台:', result);
  var flag = open("淘宝");
  // console.log('是否正确打开淘宝:', flag);
}






//code starts from here
init();
window();
var numberofaccount = 3;
var i = 1;
// console.show();
// console.setPosition(255, 525);

var flag = [];
flag[0] = true;
for (; i < numberofaccount; i++) {
  flag[i] = check();//进行打卡
  console.log('是否成功领到红包:', flag[i]);
  sleep(5000);
  var flag2 = changeaccount(i);//进行账户切换
  console.log('是否成功切换账户:', flag2);
  flag[i] = flag[i] & flag2;
  sleep(2000);
}
flag[i + 1] = check();//进行打卡
console.log('是否成功领到红包:', flag[i + 1]);
sleep(5000);




clearall();
floaty.closeAll();
for (var m = 0; m < numberofaccount; m++) {
  if (!flag[m]) {
    toast("账户%d打卡失败!!!!", m + 1);
    console.log("打卡失败");
    engines.stopAll();
  }
}
toast("签到完成!!!!");
console.log("打卡成功!!");
device.vibrate(3000);
toast("淘宝财神没钱啦!!!");
//end of the program