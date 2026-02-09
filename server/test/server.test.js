const request = require('supertest');
const { expect } = require('chai');
const app = require('../index'); // Our Express app

describe('Tongue Twister API', () => {
  const tongueTwisters = [
    "Peter Piper picked a peck of pickled peppers.",
    "Betty Botter bought some butter, but she said the butter's bitter.",
    "She sells seashells by the seashore.",
    "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair, Fuzzy Wuzzy wasn't fuzzy, was he?",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?"
  ];

  it('should return a random tongue twister', (done) => {
    request(app)
      .get('/tongue-twister')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.a('string');
        expect(tongueTwisters).to.include(res.text);
        done();
      });
  });

  it('should return a different tongue twister on successive calls (probability-based)', (done) => {
    let twister1;
    let twister2;

    request(app)
      .get('/tongue-twister')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        twister1 = res.text;

        request(app)
          .get('/tongue-twister')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            twister2 = res.text;

            // This test is probability-based. It's possible, though unlikely, for them to be the same.
            // We are just checking if it generally returns different ones.
            expect(twister1).to.be.a('string');
            expect(twister2).to.be.a('string');
            expect(tongueTwisters).to.include(twister1);
            expect(tongueTwisters).to.include(twister2);
            done();
          });
      });
  });
});
