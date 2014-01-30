module.exports = function Calendar(month, year){
  "use strict";

  var util = require("./util");
  var self = $.observable(this);
  var moment = require('../../node_modules/moment');


  self.month = util.capitalize(month);
  self.year = year;
  self.monthYear = self.month + " " + self.year;


  self.first = function(){
    return moment(self.month + " 1, " + self.year);
  };

  self.last = function(){
    return moment(self.first().add(1, 'M').subtract(1, 'd'));
  };

  self.firstOfCalendar = function(){
    var offset = self.first().day();
    return moment(self.first().subtract(offset, 'd'));
  };

  self.week = function(number){
    var weeks = [[0,6],[7,13],[14,20],[21,27],[28,34],[35,41]];
    var firstDay = weeks[number][0];
    var lastDay = weeks[number][1];
    return self.days().slice(firstDay, lastDay + 1);
  };

  self.numWeeks = function(){
    var weekCount = 0;

    if(self.calDuration() > 35){
      weekCount = 6;
    }
    else if(self.calDuration() <= 28){
      weekCount = 4;
    }
    else {
      weekCount = 5;
    }
    return weekCount;
  };

  self.weeks = function(){
    var weeksList = [];

    for(var i = 0; i < self.numWeeks(); i++){
      weeksList.push(self.week(i));
    }
    return weeksList;
  };


  self.calDuration = function(){
    var millis = self.last() - self.firstOfCalendar();
    return Math.ceil(millis / 1000 / 60 / 60 / 24);
  };

  self.days = function(){
    var date = self.firstOfCalendar();
    var daysList = [];
    var duration = self.numWeeks() * 7; 

    for (var i = 0; i < duration; i++){
      daysList[i] = {date: moment(date)};
      date.add(1, 'd');
    }

    return daysList;
  };

  self.nextMonth = function(){
    var nm = moment(moment(self.first()).add(1, 'M'));
    return { month: nm.format('MMMM'), year: nm.year() };
  };

  self.previousMonth = function(){
    var pm = moment(moment(self.first()).subtract(1, 'M'));
    return { month: pm.format('MMMM'), year: pm.year() };
  };

  self.newMonth = function(month, year){
    self.trigger('new-month');
    return new self.constructor(month, year);
  };
};
