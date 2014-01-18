var should = require('chai').should();
var Calendar = require('../src/models/calendar');

describe('Calendar', function(){
  beforeEach(function(){
    $ = require('../bower_components/riotjs/riot.js');
    january = new Calendar("January", 2014);
    dateFormat = 'MMMM D, YYYY'; 
  });

  describe('month', function(){
    it('should return correct month capitalized', function(){
      january.month.should.equal('January');
    });
  });

  describe('first', function(){
    it('should return correct date for first day of month', function(){
      january.first.month().should.equal(0);
    });
  });

  describe('firstOfCalendar', function(){
    it('should return correct day for first day of calendar', function(){
      january.firstOfCalendar().month().should.equal(11);
      january.firstOfCalendar().day().should.equal(0);
      january.firstOfCalendar().year().should.equal(2013);
    });
  });

  describe('days', function(){
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

  describe('nextMonth', function(){
    it('should return the next month', function(){
      var feb = january.nextMonth();
      feb.month.should.equal('February');
      feb.year.should.equal(2014);
    });
  });

  describe('previousMonth', function(){
    it('should return the previous month', function(){
      var dec2013 = january.previousMonth();
      dec2013.month.should.equal('December');
      dec2013.year.should.equal(2013);
    });
  });

  describe('week', function(){
    describe('week(1)', function(){
      it('should return an Array of first week', function(){
        january.week(1).should.be.a('Array');
        january.week(1)[0].date.format(dateFormat).should.equal('December 29, 2013');
        january.week(1)[6].date.format(dateFormat).should.equal('January 4, 2014');
      });
    });

    describe('week(5)', function(){
      it('should return and Array of fifth week', function(){
        january.week(5).should.be.a('Array');
        january.week(5)[0].date.format(dateFormat).should.equal('January 26, 2014');
        january.week(5)[6].date.format(dateFormat).should.equal('February 1, 2014');
      });
    });

  });
});
