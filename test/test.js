const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

let should = chai.should()

/*
 * Test the /GET route
 */
describe('/GET two nos. from route params ', () => {
  it('it should return product of numbers', (done) => {
    chai.request('localhost:3001')
      .get('/product/2&3')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal("Product is 6");
        done()
      })
  })
})

describe('/GET string from route params ', () => {
  it('it should return first non-repeating character from string', (done) => {
    chai.request('localhost:3001')
      .get('/nonrepeating/madam')
      .end((err, res) => {

        res.should.have.status(200)
        res.text.should.equal("First non repeating character is d");
        done()
      })
  })
})


describe('/POST attach a file in body ', () => {
  it('it should write that file', (done) => {
    chai.request('localhost:3001')
      .post('/fileUpload')
      .attach('file','./assets/data.txt')
      .end((err, res) => {

        res.should.have.status(200)
        res.text.should.equal("file saved")
        done()
      })
  })
})

describe('/get ', () => {
  it('it should read file', (done) => {
    chai.request('localhost:3001')
      .get('/')
      .end((err, res) => {

        res.should.have.status(200)
        res.body.should.be.a("array")
        done()
      })
  })
})
