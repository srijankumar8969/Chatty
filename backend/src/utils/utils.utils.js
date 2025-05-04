import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => { //here userId is passed instead of req
    const token = jwt.sign({userId}, process.env.TOKEN_SECRETS, {
        expiresIn: '7d'
    });

    res.cookie('jwt', token, { //the cookie is set with the name jwt and the value is the token and is set in the browser for 7 days and when
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    });
    
    return token;//import to return the token    
};