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

//进入微信,开始进入公众号打卡
function wechatentrance() {
  // 1st

  //format UIcontainer open code
  var count = 0;
  do {
    var home = text('北京邮电大学').className('android.view.View').depth(20).findOne(5000);
    count++;
    if (count > 2 && count <= 4) {
      scrollDown();
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到北邮公众号");
      return false;
    }
  } while (home == null);
  var result1 = home.parent().parent().parent().parent().parent().click();
  console.log("是否打开北邮公众号:", result1);
  sleep(2000);
  //end format



  //2nd
  count = 0;
  do {
    var corona = textContains('疫情防控通').className('android.view.View').depth(20).findOne(5000);
    count++;
    if (count > 2 && count <= 4) {
      scrollDown();
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到公众号的疫情防控通");
      return false;
    }
  } while (corona == null);
  var result2 = corona.parent().parent().parent().parent().click();
  console.log("是否打开公众号的疫情防控通:", result2);
  sleep(2000);

  // //2nd
  // var corona = id('com.tencent.mm:id/btf').row(0).depth(16).clickable(true).findOne(10000);
  // if (corona == null) {
  //   console.log("没有找到疫情防控通");
  //   return false;
  // }
  // var result2 = corona.click();
  // console.log("是否找到疫情防控通:" + result2);
  // sleep(4000);


  //3rd直接从每日填报进入
  count = 0;
  do {
    var daily = text('每日填报').className('android.widget.TextView').depth(12).findOne(5000);
    count++;
    sleep(1000);
    if (count > 4) {
      console.log("没有找到每日填报");
      return false;
    }
  } while (daily == null);
  var result3 = daily.parent().parent().click();
  console.log("是否打开每日填报:", result3);
  sleep(3000);
  // //3rd
  // var daily = id('com.tencent.mm:id/gs1').row(-1).depth(10).clickable(true).indexInParent(0).findOne(10000);
  // if (daily == null) {
  //   console.log("没有找到每日填报");
  //   return false;
  // }
  // var result3 = daily.click();
  // console.log("是否找到每日填报:" + result3);
  // sleep(5000);
  do {
    var dailyresult = text('每日填报').findOne(3000);
    scrollDown();
  } while (!dailyresult);
  return dailyresult;
}



//填报每日打卡
function dailyonce() {
  scrollDown();
  sleep(1000);
  var dailyonce = className('android.view.View').row(9).depth(21).clickable(true).indexInParent(9).findOne(10000);
  if (dailyonce == null) {
    console.log("没有找到每日填报打卡进入口");
    return false;
  }
  var result3;
  do {
    result3 = dailyonce.click();
    sleep(2000);
  } while (!result3);
  console.log("是否找到每日填报打卡进入口:" + result3);
  sleep(4000);



  scrollDown();
  //here starts the main part of the sheet

  //first choose ifatschool
  var ifatschool = text('今日是否在校？').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  var count = 0;
  var backcount = 0;
  while (!ifatschool) {
    scrollDown();
    ifatschool = text('今日是否在校？').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
    count++;
    if (backcount == 2) {
      console.log('无法打开网页!!');
      return false;
    }
    if (count == 2) {
      back();
      console.log('打卡网页打开失败,执行回退操作');
      backcount++;
      sleep(2000);
      scrollDown();
      sleep(1000);
      //repeat of the former code, to refresh the landing page
      var dailyonce2 = className('android.view.View').row(9).depth(21).clickable(true).indexInParent(9).findOne(10000);
      if (dailyonce2 == null) {
        console.log("回退后,没有找到每日填报打卡进入口");
        return false;
      }
      var res;
      do {
        res = dailyonce2.click();
        sleep(2000);
      } while (!res);
      console.log("回退后,是否找到每日填报打卡进入口:" + res);
      sleep(4000);
      count = 0;
    }
  }

  var result4 = ifatschool.parent().child(4).click();
  //important !!!
  //如果返校,需要自行修改!!!
  //在家child(4)
  //在学校child(3)
  console.log("是否选择了是否在校:" + result4);


  scrollDown();
  sleep(500);
  scrollDown();



  //now set the location
  var location = text('所在地点（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）').depth(23).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!location) {
    scrollDown();
    location = text('所在地点（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）').depth(23).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
  }
  var result5 = location.parent().click();
  sleep(2000);
  console.log("是否获取了位置信息:" + result5);
  //此处问题:点击对象应该是depth(22)的控件,然而depth(23)也是可点击的,但是点击无效!!!



  scrollDown();
  sleep(500);
  scrollDown();



  //now choose if at the risky location
  var risky = text('今日是否在中高风险地区？（中高风险地区信息可通过国务院客户端小程序实时查询）').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!risky) {
    scrollDown();
    risky = text('今日是否在中高风险地区？（中高风险地区信息可通过国务院客户端小程序实时查询）').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
  }
  var result6 = risky.parent().child(4).click();
  while (!result6) {
    scrollDown();
    result6 = risky.parent().child(4).click();
  }
  sleep(2000);
  console.log("是否勾选了不在中高风险区:" + result6);


  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  sleep(1000);
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  sleep(1000);
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();

  var submit = text('提交信息(Submit)').depth(21).indexInParent(0).findOne(4000);
  while (!submit) {
    scrollDown();
    submit = text('提交信息(Submit)').depth(21).indexInParent(0).findOne(4000);
    sleep(1000);
  }
  submit.click();
  sleep(2000);


  var confirm = textContains('确认').clickable(true).findOne(10000);
  sleep(1000);
  while (!confirm) {
    confirm = textContains('确认').clickable(true).findOne(10000);
    sleep(1000);
  }
  var finalresult = confirm.click();
  back();
  return finalresult;


}



//填报晨午晚检
function daily3times() {
  var daily3times = className('android.view.View').row(10).depth(21).clickable(true).indexInParent(10).findOne(10000);
  if (daily3times == null) {
    console.log("没有找到每日填报打卡界面");
    return false;
  }
  var result3 = daily3times.click();
  console.log("是否找到每日填报打卡界面:" + result3);
  sleep(5000);
}




function verify() {
  scrollDown();
  sleep(1000);
  var verify = className('android.view.View').row(9).depth(21).clickable(true).indexInParent(9).findOne(10000);
  if (verify == null) {
    return false;
  }
  var result1 = verify.click();
  sleep(4000);

  scrollDown();
  //here is the copy of dailyonce

  //first choose ifatschool
  var ifatschool = text('今日是否在校？').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!ifatschool) {
    scrollDown();
    ifatschool = text('今日是否在校？').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
  }
  var result4 = ifatschool.parent().child(4).click();
  console.log("是否选择了是否在校:" + result4);


  scrollDown();
  sleep(500);
  scrollDown();



  //now set the location
  var location = text('所在地点（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）').depth(23).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!location) {
    scrollDown();
    location = text('所在地点（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）').depth(23).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
  }
  var result5 = location.parent().click();
  sleep(2000);
  console.log("是否获取了位置信息:" + result5);

  scrollDown();
  sleep(500);
  scrollDown();



  //now choose if at the risky location
  var risky = text('今日是否在中高风险地区？（中高风险地区信息可通过国务院客户端小程序实时查询）').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!risky) {
    scrollDown();
    risky = text('今日是否在中高风险地区？（中高风险地区信息可通过国务院客户端小程序实时查询）').depth(22).indexInParent(0).className('android.widget.TextView').findOne(10000);
    sleep(1000);
  }
  var result6 = risky.parent().child(4).click();
  while (!result6) {
    scrollDown();
    result6 = risky.parent().child(4).click();
  }
  sleep(2000);
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  sleep(1000);
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  sleep(1000);
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  scrollDown();
  var submit = text('提交信息(Submit)').depth(21).indexInParent(0).findOne(4000);
  while (!submit) {
    scrollDown();
    submit = text('提交信息(Submit)').depth(21).indexInParent(0).findOne(4000);
    sleep(1000);
  }
  submit.click();
  sleep(2000);
  if (textContains('请确认信息是否全部正确').exists()) {
    return false;
  } else if (textContains('你已提交过').exists()) {
    return true;
  } else { return false; }
}


//used to send intent to the tasker to notify users!!!!
//It's marvelous!!!
function sendintent(actions, detail) {
  // send-broadcast.js

  app.sendBroadcast({
    action: actions,
    extras: {
      from: 'Autojs',
      version: '3.1.0 Beta',
      info: detail,
    },
  });
}




//main function code
// console.show();
// console.setPosition(255, 525);
function main1() {
  do {
    clearall();
    open("微信");
  } while (currentActivity() != 'com.tencent.mm.ui.LauncherUI');

}

function main2() {
  entrance = wechatentrance();
  while (!entrance) {
    main1();
    entrance = wechatentrance();
  }
}

function main3() {
  var once2 = dailyonce();
  while (!once2) {
    main1();
    main2();
    var once2 = dailyonce();

  }
  return once2;
}


var once;
var entrance;
main1();
main2();
once = main3();
once = once & verify();
clearall();
if (entrance && once) {
  sendintent('autojs.intent.action.dakasucceed', 'succeed✪ ω ✪!!!')
} else {
  sendintent('autojs.intent.action.dakafail', 'fail╯︿╰!!!')
}