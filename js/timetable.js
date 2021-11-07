function constructTimeTable(timeTable, talksData) {
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

                  if ((time == "16:05") || (time == "16:25")) {
                    return { time: "\xa0", name: "\xa0", title: "", major: ""};
                  }
                  else if (name == "一部講演の録画を放映する予定です") {
                    return { time: time, name: "", title: name, major: ""};
                  }
                  else {
                    return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
                  }
               });
}


$(function () {
  var firstDayTable = constructTimeTable(day1, data);
  var secondDayTable = constructTimeTable(day2, data);
  var thirdDayTable = constructTimeTable(day3, data);

  var template = $('#template').html();
  Mustache.parse(template);
  var renderedFirst = Mustache.render(template, {table: firstDayTable, header: "11/21 (日)"});
  var renderedSecond = Mustache.render(template, {table: secondDayTable, header: "11/22 (月)"});
  var renderedThird = Mustache.render(template, {table: thirdDayTable, header: "11/23 (火)"});
  $('.article-headline').html(renderedFirst + "<br />" + renderedSecond + "<br />" + renderedThird);
  //$('.article-headline').html(renderedFirst + "<br />" + renderedSecond);
});
