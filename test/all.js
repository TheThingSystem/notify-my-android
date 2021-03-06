// NMA_KEY should be set to a valid API-key in the shell before 
// running the unit test
var should = require('should');
var NMA = require('../lib/notify-my-android');
var apikey = process.env.NMA_KEY; // be sure to insert your own api key here

if ( !apikey ){
  console.log('API key not set');
  return 9;
}

/*
beforeEach(function(){
  console.log('before every test')
  })
*/

describe('NMA Node.js API', function(){

  /* Empty API-key */
  it('detects using an empty API-key', function( done ){
    var p = new NMA('');
    p.notify('node.js', 'Unit testing', 'Empty API-key', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a.String;
      error.code.should.be.a.String;
      done();
    });
    delete p;
  });

  /* Invalid API-key */
  it('detects using an invalid API-key', function( done ){
    var p = new NMA('1212689455abcd902342aaaaaafffffffffccccccccc0000');
    p.notify('node.js', 'Unit testing', 'Using an invalid API-key', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a.String;
      error.code.should.be.a.String;
      done();
    });
    delete p;
  });

  /* Invalid length of API-key */
  it('detects using an API-key with invalid length', function( done ){
    var p = new NMA('111111111111');
    p.notify('node.js', 'Unit testing', 'Using an API-key with invalid length', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a.String;
      error.code.should.be.a.String;
      done();
    });
    delete p;
  });



  /* Valid key, valid message */	
  it('notifies when minimum valid information is added', function(done){
    var p = new NMA(apikey); 
    p.notify('node.js', 'Unit testing', 'Minimal message', function( error, remaining ){
	remaining.calls.should.be.a.Number;
	remaining.resettimer.should.be.a.Number;
	should.not.exist(error);
        done();	
     });
     delete p;
  });

  /* Valid key, missing parameter */	
  /*
  it('detects a missing parameter', function(done){
    pvalid.notify('node.js', 'Unit testing', function( error, remaining ){
        should.not.exist(remaining);
	err.should.be.type("object");
        done();	
     });
  });
  */

  /* Valid key, valid message, high priority */	
  it('notifies with high priority notification', function(done){
    var p = new NMA(apikey); 
    p.notify('node.js', 'Unit testing', 'High priority message', {priority: 2}, function( error, remaining ){
	remaining.calls.should.be.a.Number;
	remaining.resettimer.should.be.a.Number;
	should.not.exist(error);
        done();	
     });
     delete p;
  });

  /* Valid key, valid message in html and with an url, high priority */	
  it('notifies in html and with an url (high priority)', function(done){
    var p = new NMA(apikey); 
    p.notify('node.js', 'Unit testing', '<h1>Notification</h1> <div align="right"><font color="green">in</font> <strike>text</strike>html <tt>with an URL.</tt></div>', {priority: 2, url: 'http://www.example.com', contenttype: 'text/html'}, function( error, remaining ){
	remaining.calls.should.be.a.Number;
	remaining.resettimer.should.be.a.Number;
	should.not.exist(error);
        done();	
     });
     delete p;
  });

  /* FIXME: Too many calls, with a valid API-key */
  /* Valid key, valid message, too many messages sent */	
  it.skip('too many notifications', function(done){
    var p = new NMA(apikey); 
    p.notify('node.js', 'Unit testing', 'too many messages sent', function( error, remaining ){
	remaining.calls.should.be.a.Number; 
	remaining.resettimer.should.be.a.Number;
  	console.log('Remaining calls: ' + remaining.calls);
  	console.log('Time before reset: ' + remaining.resettimer);
	should.not.exist(error);
        done();	
     });
     delete p;
  });

});
