const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
// Mocha allows you to test asynchronous operations like calls to API endpoints with a plugin called chai-http.
// The following is an example of a test using chai-http for a suite called 'GET /hello?name=[name] => "hello [name]"':
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) { // Don't forget the callback...
      chai
          .request(server) // 'server' is the Express App
          .get('/hello') // http_method(url). NO NAME in the query !
          .end(function(err, res) {  // res is the response object     
            // Test the status and the text response (see the example above).
            // Please follow the order -status, -text. We rely on that in our tests.
            // It should respond 'Hello Guest'
            assert.equal(res.status, 200);
            assert.equal(res.text, 'hello Guest');
            done(); // Always call the 'done()' callback when finished.
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Rebecca')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Rebecca');
          done();
        });
    });
    // #3
// When you test a PUT request, you'll often send data along with it. The data you include with your PUT request is called the body of the request.
// To send a PUT request and a JSON object to the '/travellers' endpoint, you can use chai-http plugin's put and send methods:
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Cristoforo');
         assert.equal(res.body.surname, 'Colombo');
      done(); // Never forget the 'done()' callback...
    });
});

    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) => {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
      done();
    });
  });
});
});

const Browser = require('zombie');
Browser.site = "https://fcc-qa-s23.glitch.me/";
suite('Functional Tests with Zombie.js', function () {
  // this.timeout(5000);
  // suite('Headless browser', function () {
    const browser = new Browser();
    suiteSetup(function(done) {
      return browser.visit("/", done);
    });
  suite('"Famous Italian Explorers" form', function () {
    // #5

    test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
      browser.fill("surname", "Colombo").pressButton("submit", function() {
        browser.assert.success();
        browser.assert.text("span#name", "Cristoforo");
        browser.assert.text("span#surname", "Colombo");
        browser.assert.element("span#dates", 1);
        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function(done) {
      browser.fill("surname", "Vespucci").pressButton("submit", function() {
        browser.assert.success();
        browser.assert.text("span#name", "Amerigo");
        browser.assert.text("span#surname", "Vespucci");
        browser.assert.element("span#dates", 1);
        done();
      });
    });
  });
});

