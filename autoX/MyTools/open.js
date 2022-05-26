// open用来打开app
function open(Appname) {
  var flag = false;
  do {
    flag = launchApp(Appname);
    sleep(3000) //等待应用打开
  } while (!flag);
  return flag;
}//返回是否成功打开app
