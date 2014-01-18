module.exports = function Calendar(month, year){
  "use strict";

  // eventually need self for $.observable(this)
  var self = $.observable(this);
  var moment = require('../../node_modules/moment');


  self.month = month;
  self.year = year;
  self.first = moment(month + " 1, " + year);


  self.firstOfCalendar = function(){
    var offset = self.first.day();
    return moment(self.first.subtract(offset, 'd'));
  };

  self.week = function(number){
    number -= 1;
    var weeks = [[0,6],[7,13],[14,20],[21,27],[28,34]];
    var firstDay = weeks[number][0];
    var lastDay = weeks[number][1];
    return self.days().slice(firstDay, lastDay + 1);
  };

  self.days = function(){
    var date = self.firstOfCalendar();
    var daysList = [];

    for (var i = 0; i <= 34; i++){
      daysList[i] = {date: moment(date)};
      date.add(1, 'd');
    }

    return daysList;
  };

  self.nextMonth = function(){
    var nm = moment(self.first.add(1, 'M'));
    return self.constructor.load(nm.format('MMMM'), nm.year());
  };

  self.previousMonth = function(){
    var pm = moment(self.first.subtract(1, 'M'));
    return self.constructor.load(pm.format('MMMM'), pm.year());
  };

  self.newMonth = function(month, year){
    self.trigger('new-month');
    return new self.constructor(month, year);
  };

  self.constructor.load = function(month, year){
    return new self.constructor(month, year);
  };
};
