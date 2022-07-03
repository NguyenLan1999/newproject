const shortId= require('shortId');
const User = require('../app/models/users')

module.exports.session = (req, res, next) => {
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate();
        res.cookie('sessionId', sessionId, {
        signed: true
        });
        User('sessions').insert({
            sessionid: sessionId
        }).then(data2 => {
            console.log('add session');
        })
    }
    next();
}
