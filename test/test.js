const Configuration = require('../src/config/configuration')
const Corbado = require('../src/corbado')
const {expect, config} = require("chai");

const generateUsername = () => {
    return "test+" + (new Date()).getTime() + "@corbado.com"
}

describe('Corbado endpoint tests', function () {

    const clientInfo = {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
        remoteAddress: '127.0.0.1',
        timezone: 'Europe/Berlin',
    }

    const validConfig = new Configuration()
    validConfig.projectID = process.env.PROJECT_ID
    validConfig.apiSecret = process.env.API_SECRET

    const username = generateUsername()

    it('Validation projectID should work', function () {

        const cfg = new Configuration()

        try {
            new Corbado(cfg)
        } catch (err) {
            expect(err).to.be.a('error')
            expect(err.message).to.equal('Project ID is required')
        }

    })

    it('Validation projectID should work', function () {

        try {
            const cfg = new Configuration()
            cfg.projectID = process.env.PROJECT_ID

            new Corbado(cfg)
        } catch (err) {
            expect(err).to.be.a('error')
            expect(err.message).to.equal('API secret is required')
        }

    })

    it('Email link should get send', function (done) {

        const corbado = new Corbado(validConfig)

        corbado.emailLink.send(
            generateUsername(),
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

    it('Passkey register', function (done) {
        const corbado = new Corbado(validConfig)

        corbado.passkey.registerStart(
            username,
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
        const corbado = new Corbado(validConfig)

        corbado.passkey.authenticateStart(
            username,
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

    it('Short session validation AuthenticationURL undefined', function (done) {
        const corbado = new Corbado(validConfig)

        try {
            corbado.shortSession.validate(
                null
            ).then(() => {
                done(new Error('Should not happen'))
            }).catch(err => {
                done(err)
            })
        } catch (err) {
            expect(err.name).equals('AssertionError')
            expect(err.message).equals('AuthenticationURL undefined')
            done()
        }
    })



    it('Short session validation request not given', function (done) {
        const cfg = new Configuration()

        cfg.projectID = validConfig.projectID
        cfg.apiSecret = validConfig.apiSecret
        cfg.authenticationURL = "https://" + validConfig.projectID + '.auth.corbado.com'

        const corbado = new Corbado(cfg)

        try {
            corbado.shortSession.validate(
                null
            ).then(() => {
                done(new Error('Should not happen'))
            }).catch(err => {
                expect(err.name).equals('AssertionError')
                expect(err.message).equals('RequestObject not given')
                done()
            })
        } catch (err) {
            done(err)
        }


    })

    it('Short session validation empty', function (done) {
        const cfg = new Configuration()

        cfg.projectID = validConfig.projectID
        cfg.apiSecret = validConfig.apiSecret
        cfg.authenticationURL = "https://" + validConfig.projectID + '.auth.corbado.com'

        const corbado = new Corbado(cfg)

        const req = {
            cookies: {
                cbo_short_session: "",
            }
        }

        corbado.shortSession.validate(
            req,
        ).then(usr => {
            expect(usr.authenticated).equals(false)
            done()
        }).catch(err => {
            done(err)
        })
    })
})
