const db = require('../database/models');

const authRedirectSession = (req, res, next) => {
    if (req.session && req.session.userId) { 
    
        return res.redirect('/');
    }
    next();
};

const authSession = (req, res, next) => {
    if (req.session && req.session.userId) { 
        return next();
    } else {
        return res.redirect('/');
    }
};

module.exports = {
    authRedirectSession,
    authSession,
};