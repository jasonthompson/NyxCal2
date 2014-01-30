var should = require('chai').should();
var Calendar = require('../src/models/calendar');

describe('Calendar', function(){
  beforeEach(function(){
    $ = require('../bower_components/riotjs/riot.js');
    january = new Calendar("January", 2014);
    march = new Calendar('March', 2014);
    dateFormat = 'MMMM D, YYYY';
  });

  describe('#month', function(){
    it('should return correct month capitalized', function(){
      january.month.should.equal('January');
    });
  });

  describe('#first', function(){
    it('should return correct date for first day of month', function(){
      january.first().month().should.equal(0);
    });
  });

  describe('#last', function(){
    it('should return correct last day of month', function(){
      january.last().date().should.equal(31);
    });
  });

  describe('#numWeeks', function(){
    it('should return four weeks when Feb starts on Sunday', function(){
      feb = new Calendar('February', 2015);
      feb.numWeeks().should.equal(4);
    });

    it('should return five weeks when Jan starts on Wednesday', function(){
      january.numWeeks().should.equal(5);
    });

    it('should return six weeks when March starts on Saturday', function(){
      march.numWeeks().should.equal(6);
    });
  });

  describe('#firstOfCalendar', function(){
    it('should return correct day for first day of calendar', function(){
      january.firstOfCalendar().month().should.equal(11);
      january.firstOfCalendar().day().should.equal(0);
      january.firstOfCalendar().year().should.equal(2013);
    });
  });

  describe('#calDuration', function(){
    it('should return length of month in days', function(){
      january.calDuration().should.equal(33);
      march.calDuration().should.equal(36);
    });
  });

  describe('#days', function(){
    it('should be an Array', function(){
      january.days().should.be.a('Array');
    });

    it('should have 35 items', function(){
      january.days().length.should.equal(35);
    });

    it('should have the correct dates', function(){
      january.days()[34].date.format(dateFormat).should.equal('February 1, 2014');
    });
  });

  describe('#nextMonth', function(){
    it('should return the next month', function(){
      january.nextMonth().month.should.equal('February');
      january.nextMonth().year.should.equal(2014);
    });
  });

  describe('#previousMonth', function(){
    it('should return the previous month', function(){
      january.previousMonth().month.should.equal('December');
      january.previousMonth().year.should.equal(2013);
    });
  });

  describe('#week', function(){
    describe('#week(0)', function(){
      it('should return an Array of first week', function(){
        january.week(0).should.be.a('Array');
        january.week(0)[0].date.format(dateFormat).should.equal('December 29, 2013');
        january.week(0)[6].date.format(dateFormat).should.equal('January 4, 2014');
      });
    });

    describe('#week(4)', function(){
      it('should return and Array of fifth week', function(){
        january.week(4).should.be.a('Array');
        january.week(4)[0].date.format(dateFormat).should.equal('January 26, 2014');
        january.week(4)[6].date.format(dateFormat).should.equal('February 1, 2014');
      });
    });
  });

  describe('#weeks', function(){
    it('should return an array of weeks for the month', function(){
      january.weeks().length.should.equal(5);
      january.weeks()[0][6].date.format(dateFormat).should.equal('January 4, 2014');
    });

    it('should return an array of 6 weeks when needed', function(){
      march = new Calendar('March', 2014);
      march.weeks().length.should.equal(6);
    });
  });
});
