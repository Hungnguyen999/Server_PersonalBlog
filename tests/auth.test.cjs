// auth.test.js
// import { assert, expect } from 'chai';
// import chaiHttp from 'chai-http';

const chai = require('chai');
const chaiHttp = require('chai-http');




const app = require('../index'); // Your Express app

chai.use(chaiHttp);

describe('Authentication API', () => {
  describe('POST /auth/signup', () => {
    it('should create a new user', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('User created successfully');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', (done) => {
      chai.request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Login successful');
          done();
        });
    });
  });
});
