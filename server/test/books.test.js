var request = require('supertest');
var assert = require('chai').assert;
var app = require('../server');
var books = app.models.Books;

function apiCall(verb,url,params,headers){
	 if (params) {
    var queryString = Object.keys(params).reduce(function (a, k) {
      a.push(k + '=' + params[k]);
      return a;
    }, []).join('&');

    url = url + '?' + queryString;
    console.log('url',url)
  }

  var result = request(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);

  if (headers) {
    Object.keys(headers).forEach(function (a, k) {
      result.set(a, headers[a]);
    });
  }
  return result

}
describe('GET fetchBooks',function(){

	before(function(done){
		done()
	})
	after(function(done){
		done()
	})

	it('provides all data from books collection',function(done){

		apiCall('get','/api/Books/fetchBooks',{'category':'fiction'},null)
		.expect(200,function(err,res){
			if(err){
				return done(err)
			}
			console.log('res',res.body)
			assert(res.body)
			assert.equal(res.body.length,1)
			assert.equal(res.body[0].category,'fiction')
			return done();
		})

	});

});