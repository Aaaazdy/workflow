//---------------------------------------------------------------------------------
// \begin{PREDEFINED FUNCTION}

//清除后台进程
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



//used to send intent to the tasker to notify users!!!!
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


// open用来打开app
function open(Appname) {
  var flag = false;
  do {
    flag = launchApp(Appname);
    sleep(3000); //等待应用打开
  } while (!flag);
  return flag;
}//返回是否成功打开app


// \end{PREDEFINED FUNCTION}
//---------------------------------------------------------------------------------








//---------------------------------------------------------------------------------
// \begin{SPECIFIC FUNCTION}

//打开微信后进入打卡界面
function wechatentrance() {
  // 1st
  // 打开北邮公众号
  console.log('进入微信,寻找打卡界面');
  var count = 0;
  var dailyresult;
  var home = null;
  do {
    home = text('北京邮电大学').className('android.view.View').findOne(5000);
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

  //2nd
  //打开疫情防控通 
  count = 0;
  var corona = null;
  do {
    corona = textContains('疫情防控通').className('android.view.View').findOne(5000);
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

  //3rd
  //从每日填报进入打卡系统
  count = 0;
  var daily = null;
  do {
    daily = text('每日填报').className('android.widget.TextView').findOne(5000);
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
  do {
    dailyresult = text('每日填报').findOne(3000);
    scrollDown();
  } while (!dailyresult);
  return !!dailyresult;
}


//打卡页面的主体程序
function bulkOfDaka() {
  var count = 0;
  var i = 0;
  scrollDown();
  sleep(1000);
  do {
    var dailyonce = text("每日填报").findOne(5000);
    count++;
    if (count > 2 && count <= 4) {
      scrollDown();
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到每日填报打卡进入口");
      return false;
    }
  } while (dailyonce == null);
  var result1;
  do {
    result1 = dailyonce.parent().click();
    sleep(2000);
    i++;
  } while ((!result1) && (i < 4));
  console.log("是否找到每日填报打卡进入口:" + result1);
  sleep(4000);
  scrollDown();
  //here starts the main part of the sheet

  //1st
  //first choose ifatschool
  count = 0;
  var backcount = 0;//回退后的计数器
  var ifatschool = textContains('今日是否在校？').className('android.widget.TextView').findOne(10000);
  sleep(2000);
  while (!ifatschool) {
    //未找到:{今日是否在校}
    scrollDown();
    ifatschool = textContains('今日是否在校？').className('android.widget.TextView').findOne(10000);
    sleep(2000);
    count++;
    if (backcount > 2) {
      console.log('回退后无法再次打开网页!!');
      backcount = 0;
      return false;
    }
    if (count > 2) {
      back();
      console.log('打卡网页打开失败,执行回退操作');
      backcount++;
      sleep(2000);
      scrollDown();
      sleep(1000);
      //repeat of the former code, to refresh the landing page
      var dailyonce2 = text("每日填报").findOne(5000);
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
  var result2 = ifatschool.parent().child(3).click();
  //important !!!
  //如果返校,需要自行修改!!!
  //在家child(4)
  //在学校child(3)
  console.log("是否选择了是否在校:" + result2);



  scrollDown();
  sleep(500);
  scrollDown();



  //2nd
  //now set the location
  count = 0;
  var location = null;
  do {
    location = textContains('所在地点（请打开手机位置功能，并在手机权限设置中选择允许微信访问位置信息）').className('android.widget.TextView').findOne(10000);
    sleep(2000);
    count++;
    if (count > 2 && count <= 4) {
      scrollDown();
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到地理位置获取按钮");
      return false;
    }
  } while (location == null);
  var result3 = location.parent().click();
  console.log("是否获取了位置信息:" + result3);
  sleep(2000);



  scrollDown();
  sleep(500);
  scrollDown();


  //3rd
  //now choose if at the risky location
  count = 0;
  var risky = null;
  do {
    risky = textContains('风险地区').className('android.widget.TextView').findOne(10000);
    sleep(2000);
    count++;
    if (count > 2 && count <= 4) {
      scrollDown();
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到是否位于高风险选项");
      return false;
    }
  } while (risky == null);
  var result4 = risky.parent().child(4).click();
  console.log("是否勾选了不在中高风险区:" + result4);


  // scrollDown();
  // scrollDown();
  // scrollDown();
  // scrollDown();
  // scrollDown();
  // scrollDown();
  // sleep(1000);

  //4th
  //提交信息
  count = 0;
  var submit = null;
  do {
    submit = text('提交信息(Submit)').findOne(4000);
    sleep(2000);
    count++;
    if (count > 2 && count <= 10) {
      scrollDown();
      scrollDown();
      sleep(1000);
    } else if (count > 10) {
      console.log("没有找到提交信息(Submit)按钮");
      return false;
    }
  } while (submit == null);
  var result5 = submit.click();
  console.log("是否点击了提交信息(Submit)按钮:" + result5);
  sleep(2000);
}


//第一次进入打卡
function dailyonce() {
  console.log('进入打卡界面,开始打卡');

  //进入打卡后的主体程序
  bulkOfDaka();


  // 第一次打卡后点击确认按钮
  count = 0;
  var confirms = null;
  do {
    confirms = textContains('确认').clickable(true).findOne(10000);
    sleep(1000);
    count++;

    if (count > 2 && count <= 4) {
      sleep(1000);
    } else if (count > 4) {
      console.log("没有找到确认按钮");
      return false;
    }
  } while (confirms == null);
  var finalresult = confirms.click();
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


//再次执行一遍打卡进程, 检查此前是否成功打卡
function verify() {
  scrollDown();
  console.log("开始验证");

  //再次执行进入打卡后的主体程序
  bulkOfDaka();

  //检验是否打卡成果(出现你已提交过提示语)
  sleep(2000);
  if (textContains('请确认信息是否全部正确').exists()) {
    return false;
  } else if (textContains('你已提交过').exists()) {
    return true;
  } else { return false; }
}

// \end{SPECIFIC FUNCTION}
//---------------------------------------------------------------------------------





//---------------------------------------------------------------------------------
// \begin{MAIN FUNCTION}

//用于显示控制台
// console.show();
// console.setPosition(255, 525);

function main1() {
  do {
    clearall("微信");
    open("微信");
  } while (currentActivity() != 'com.tencent.mm.ui.LauncherUI');

}
//---------------------------------

function main2() {
  var entrance;
  entrance = wechatentrance();
  while (!entrance) {
    main1();
    entrance = wechatentrance();
  }
  return entrance;
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


function MAIN() {
  var once;
  var entrance;
  main1();
  entrance = main2();
  once = main3();
  once = once & verify();
  clearall("微信");
  console.log("是否成功打卡:" + entrance && once);
  if (entrance && once) {
    sendintent('autojs.intent.action.dakasucceed', 'succeed✪ ω ✪!!!')
  } else {
    sendintent('autojs.intent.action.dakafail', 'fail╯︿╰!!!')
  }
}


MAIN();
// \end{MAIN FUNCTION}
//---------------------------------------------------------------------------------
