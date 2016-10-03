"use strict";

var supertest = require("supertest");
var should = require("should");
var utils = require('../../lib/utils');

var server = supertest.agent("http://localhost:8085");

describe("[PROPERTIES] module unit test:", function() {
    it("GET - should get all properties", function (done) {
        server
            .get("/vr-backend-challenge/v1/provinces")
            .set("Content-type", "application/json; charset=utf-8")
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                res.statusCode.should.equal(200);
                done();
            });
    });
});