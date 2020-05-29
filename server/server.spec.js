const request = require('supertest');
const server = require('./server');

describe('server.js', function() {

    describe('GET /', function() {
        
        it ('should return a 200 OK', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                });
        });

        it ('should return API up and running ', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.message).toBe('API up and running')
                });
        });
    
    });

    describe('/auth/register', function() {

        it ('should return status code 201', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ 
                    username: `${Date.now()}`, 
                    password: `${Date.now()}`, 
                    role_id: 2})
                .expect(201)
        });

        it ('is a json object', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'instructor3', password: 'pass123'})
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                });
        });

    });
    
    describe('/auth/login', function() {

        it ('should return a 200 OK', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'instructor3', password: 'pass123'})
                .then(res => {
                    expect(res.status).toBe(200)
                });
        });
        
        it ('is a json object', function() {
            return request(server)
                .post('/api/auth/login')
                .send({ username: 'instructor3', password: 'pass123'})
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                });
        });

    });

});