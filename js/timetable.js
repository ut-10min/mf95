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
                 if (
                   (time == "09:50") || 
                   (time == "12:30") || 
                   (time == "14:50") ||
                   (time == "16:09") ||
                   (time == "16:29")    
                 ) 
                 {
                   return { time: name, name: "", title: "", major: ""};
                 } 
                 else if (name == "休憩（座談会）") {
                   return { time: time, name: "", title: name, major: ""};
                 }
                 if (name == "改行") {
                   return { time: "\xa0", name: "\xa0", title: "", major: ""};
                 }
                 else if (name == "第1部講演の録画を放映予定") {
                   return { time: time, name: "", title: name, major: ""};
                 }
                 else {
                   return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
                 }
               });
}


$(function () {
  var firstDayTable = construstTimeTable(day1, data);
  var secondDayTable = construstTimeTable(day2, data);
  // var thirdDayTable = construstTimeTable(day3, data);

  var template = $('#template').html();
  Mustache.parse(template);
  var renderedFirst = Mustache.render(template, {table: firstDayTable, header: "9/19 (日)"});
  var renderedSecond = Mustache.render(template, {table: secondDayTable, header: "9/20 (月・祝)"});
  // var renderedThird = Mustache.render(template, {table: thirdDayTable, header: "11/25(日)"});
  // $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
  $('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});
