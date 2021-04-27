require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
});

const SAMPLE_OBJECT_ID = mongoose.Types.ObjectId();

describe('Message API endpoints', () => {
    beforeEach((done) => {
        const sampleUser = new User({
            username: 'myuser',
            password: 'mypassword',
            _id: SAMPLE_OBJECT_ID
        })
        sampleUser.save()
        .then(() => {
            done()
        })
    })

    beforeEach((done) => {
        const sampleMessage = new Message({
            title: 'samplemessage',
            body: 'a test messages thats longer than the title',
            author: SAMPLE_OBJECT_ID,
            _id: SAMPLE_OBJECT_ID
        })
        sampleMessage.save()
        .then(() => {
            done()
        })
    })

    afterEach((done) => {
        User.deleteMany({ username: ['myuser', 'anotheruser'] })
        .then(() => {
            done()
        })
    });

    afterEach((done) => {
        Message.deleteMany({ title: ['samplemessage', 'anothermessage'] })
        .then(() => {
            done()
        })
    })

    it('should load all messages', (done) => {
        chai.request(app)
            .get('/messages')
            .end((err, res) => {
                if (err) { done(err) };
                expect(res).to.have.status(200)
                expect(res.body.messages).to.be.an('array')
                expect(res.body.messages.length).to.equal(1)
                done()
            });
    })

    it('should get one specific message', (done) => {
        chai.request(app)
            .get(`/messages/${SAMPLE_OBJECT_ID}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.an('object');
                expect(res.body.message.title).to.equal('samplemessage');
                done();
            })
    })

    it('should post a new message', (done) => {
        chai.request(app)
            .post('/messages')
            .send({title: 'anothermessage', body: 'another body message', author: SAMPLE_OBJECT_ID})
            .end((err, res) => {
                if (err) { done(err) }
                expect(res).to.have.status(200)
                expect(res.body.message).to.be.an('object')
                expect(res.body.message).to.have.property('title', 'anothermessage')
                
                Message.findOne({title: 'anothermessage'}).then(message => {
                    expect(message).to.be.an('object')
                    done();
                })
            })
    })

    it('should update a message', (done) => {
        chai.request(app)
            .put(`/messages/${SAMPLE_OBJECT_ID}`)
            .send({title: 'anothermessage'})
            .end((err, res) => {
                if (err) { done(err) }
                expect(res.body.message).to.be.an('object')
                expect(res.body.message).to.have.property('title', 'anothermessage')

                Message.findOne({title: 'anothermessage'}).then(message => {
                    expect(message).to.be.an('object')
                    done()
                })
            })
    })

    it('should delete a message', (done) => {
        chai.request(app)
            .delete(`/messages/${SAMPLE_OBJECT_ID}`)
            .end(async (err, res) => {
                if (err) { done(err) }
                expect(res.body.message).to.equal('Successfully deleted.')
                expect(res.body._id).to.equal(SAMPLE_OBJECT_ID.toString())

                // check that message is actually deleted from database
                const message = await Message.findOne({title: 'samplemessage'})
                expect(message).to.equal(null)

                // check message is deleted from user list
                const user = await User.findOne({ messages: { $all: [res.body._id] } })
                expect(user).to.equal(null)
                done()
            })
    })
})
