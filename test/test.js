const Corbado = require('../src/corbado')
const {expect} = require("chai");

describe('Corbado endpoint tests', function () {

    const clientInfo = {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
        remoteAddress: '127.0.0.1',
        timezone: 'Europe/Berlin',
    }

    it('Validation projectID should work', function () {

        try {
            new Corbado(undefined, undefined)
        } catch (err) {
            expect(err).to.be.a('error')
            expect(err.message).to.equal('Project ID is required')
        }

    })

    it('Validation projectID should work', function () {

        try {
            new Corbado('pro-1234', undefined)
        } catch (err) {
            expect(err).to.be.a('error')
            expect(err.message).to.equal('API secret is required')
        }

    })

    it('Email link should get send', function (done) {
        const corbado = new Corbado(process.env.PROJECT_ID, process.env.API_SECRET)

        corbado.emailLinkService.send(
        "test@corbado.com",
        'http://localhost',
            true,
            {UserFullName: "Test Name"},
            clientInfo,
        ).then(rsp => {
            expect(rsp).to.be.a('object');
            expect(rsp).to.have.property('httpStatusCode').with.equal(200);
            expect(rsp).to.have.property('message')
            expect(rsp).to.have.property('requestData')
            expect(rsp).to.have.property('runtime')
            expect(rsp).to.have.property('data').with.property('emailLinkID').with.contains('eml-')

            done()
        }).catch(err => {
            done(err)
        })

    })

    it('Session verify', function (done) {
        const corbado = new Corbado(process.env.PROJECT_ID, process.env.API_SECRET)

        corbado.sessionService.verify(
            process.env.SESSION_TOKEN,
            clientInfo,
        ).then(rsp => {
            expect(rsp).to.be.a('object');
            expect(rsp).to.have.property('httpStatusCode').with.equal(200);
            expect(rsp).to.have.property('message')
            expect(rsp).to.have.property('requestData')
            expect(rsp).to.have.property('runtime')
            expect(rsp).to.have.property('data').with.property('userID').with.contains('usr-')
            expect(rsp).to.have.property('data').with.property('userData')

            done()
        }).catch(err => {
            done(err)
        })

    })

    it('Passkey register', function (done) {
        const corbado = new Corbado(process.env.PROJECT_ID, process.env.API_SECRET)

        corbado.passkeyService.registerStart(
            'test@corbado.com',
            clientInfo,
            'http://localhost',
        ) .then(rsp => {
            expect(rsp).to.be.a('object');
            expect(rsp).to.have.property('httpStatusCode').with.equal(200);
            expect(rsp).to.have.property('message')
            expect(rsp).to.have.property('requestData')
            expect(rsp).to.have.property('runtime')
            expect(rsp).to.have.property('status')
            expect(rsp).to.have.property('publicKeyCredentialCreationOptions')

            done()
        }).catch(err => {
            done(err)
        })

    })

    it('Passkey authentication', function (done) {
        const corbado = new Corbado(process.env.PROJECT_ID, process.env.API_SECRET)

        corbado.passkeyService.authenticateFinish(
            'test@corbado.com',
            clientInfo,
            'http://localhost',
        ) .then(rsp => {
            expect(rsp).to.be.a('object');
            expect(rsp).to.have.property('httpStatusCode').with.equal(200);
            expect(rsp).to.have.property('message')
            expect(rsp).to.have.property('requestData')
            expect(rsp).to.have.property('runtime')
            expect(rsp).to.have.property('status')
            expect(rsp).to.have.property('publicKeyCredentialRequestOptions')

            done()
        }).catch(err => {
            done(err)
        })

    })
})
