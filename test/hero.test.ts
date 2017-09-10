require('dotenv').config({silent: false});
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/heroes', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/v1/heroes')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body.heroes).to.be.an('array');
        expect(res.body.heroes).to.have.length(6);
      });
  });

  it('should include Wolverine', () => {
    return chai.request(app).get('/v1/heroes')
      .then(res => {
        let Wolverine = res.body.heroes.find(hero => hero.name === 'Wolverine');
        expect(Wolverine).to.exist;
        expect(Wolverine).to.have.all.keys([
          '_id',
          'id',
          'name',
          'aliases',
          'occupation',
          'gender'
        ]);
      });
  });

  describe('GET api/v1/heroes/:id', () => {

    it('responds with single JSON object', () => {
      return chai.request(app).get('/v1/heroes/59333047da71f02ccc65a275')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
        });
    });

    it('should return Luke Cage', () => {
      return chai.request(app).get('/v1/heroes/59333047da71f02ccc65a275')
        .then(res => {
          expect(res.body.hero.name).to.equal('Luke Cage');
        });
    });

  });

});
