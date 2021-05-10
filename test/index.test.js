const { decodeBase64 } = require("bcryptjs");
const chai = require("chai");
const chai_http = require("chai-http");
const should = chai.should();
const server = require("../app");
const db = require('../helper/db');

chai.use(chai_http);

describe("Node Js Server",() =>{
    it('Get(/)',(done)=>{
        chai.request(server).get("/").end((err,res)=>{
            res.should.have.status(200);
            done();
        });
    });
});