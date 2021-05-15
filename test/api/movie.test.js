const chai = require("chai");
const chai_http = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chai_http);
let token,movie_id;
describe('/user/token controller',() =>{
    before(done =>{
        chai.request(server).post('/user/token').send({username:"Buğra1",password:"12345"})
        .end((err,res)=>{
            token = res.body.token;
            done();
        });
    });
    describe('GET /api/movies controller',() =>{
        it('get all movies',(done)=>{
            chai.request(server).get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('Post Movies Controller',()=>{
        it('Post',(done)=>{
            const data = {
                'title':"Arınma Gecesi 3",
                'category':"Gerilim,Korku",
                'country':"U.S.A",
                'year':2020,
                'imdb_score':7.5
            }
            chai.request(server).post('/api/movies/new')
            .send(data)
            .set('x-access-token',token)  
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movie_id = res.body._id;
                done();
            });
            
        })
    });
    describe('Get Movie id',() =>{
        it('movie_id',done => {
            chai.request(server)
            .get('/api/movies/' + movie_id)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('_id').eql(movie_id);
                done();
            });
        });
    });
    describe('Put movie id',() =>{
        const data = {
            'title':"Arınma Gecesi",
            'category':"Gerilim,Korku",
            'country':"France",
            'year':1999,
            'imdb_score':9
        }
        it('Put',(done)=>{
            chai.request(server)
            .put('/api/movies/' +movie_id)
            .send(data)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(data.title);
                res.body.should.have.property('category').eql(data.category);
                res.body.should.have.property('country').eql(data.country);
                res.body.should.have.property('year').eql(data.year);
                res.body.should.have.property('imdb_score').eql(data.imdb_score);
                done();

            });
        });
    });
    describe('Delete movie',() =>{
        it('Delete',(done)=>{
            chai.request(server)
            .delete('/api/movies/'+movie_id)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.property('status').eql(1);
                done();
            });
        });
    });
});
