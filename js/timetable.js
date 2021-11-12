function construstTimeTable(timeTable, talksData) {
  return Object.keys(timeTable)
    .filter(function (k) {return timeTable[k];})
    .sort()
    .map(function (time) {
      // console.log(time);
      var name = timeTable[time];
      // console.log(name);
      var index = 0;

      // if (name == "なおと") {
      //   name = "宇佐美尚人";
      // } else if (name.indexOf("こすも") == 0) {
      //   index = parseInt(name.charAt(3)) - 1;
      //   name = "宇佐美こすも";
      // }
      var talk = talksData.filter(function (t) { return t.name.indexOf(name) == 0; })[index];
      // 何部目か判定
      if (
        (name == "第1部") || 
        (name == "第2部") ||
        (name == "第3部") ||
        (name == "第4部")    
      ) 
      {
        return { time: name, name: "", title: "", major: ""};
      } 
      else if (name == "改行") {
        return { time: "\xa0", name: "\xa0", title: "", major: ""};
      }
      else if (
        (name == "（包）研究テーマってどうやって決める？") ||
        (name == "（趙）私の大学院生としての生活、研究以外何してる？") ||
        (name == "（高原）当たり前だったと思っていたが、他分野の人と接することでそうではないと気付いたこと") ||
        (name == "（脇水）東大の大学院生の生活スタイル") ||
        (name == "（三河）コロナ禍で研究のやり方はどう変わった？") ||
        (name == "（松木）「勉強」と「研究」の割合(体感)について。研究テーマの決め方。") ||
        (name == "（三河）大学ではやたらハエの研究が多いが、虫が苦手だったり、研究室志望が思うようにならなかった等の人たちの行く末は？") ||
        (name == "Coming soon") ||
        (name == "(鈴木）他のラボメンバーとの関わり（自分はn人でnテーマを一緒にやっているような感じで、特殊な方なのかな？と思ったので）") 

      ) {
        return { time: time, name: talk.affiliation, 
          title: talk.title + "：<br />" + talk.name, 
          major: "" };
      }
      //else if (name == "第1部講演の録画を放映予定") {
      //  return { time: time, name: "", title: name, major: ""};
      //}
      else {
        return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
      }
    });
}


$(function () {
  var firstDayTable  = construstTimeTable(day1, data);
  var secondDayTable = construstTimeTable(day2, data);
  var thirdDayTable  = construstTimeTable(day3, data);

  var template = $('#template').html();
  Mustache.parse(template);
  var renderedFirst  = Mustache.render(template, {table: firstDayTable,  header: "11/21 (日)"});
  var renderedSecond = Mustache.render(template, {table: secondDayTable, header: "11/22 (月)"});
  var renderedThird  = Mustache.render(template, {table: thirdDayTable,  header: "11/23 (火・祝)"});
   $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
  // $('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});
