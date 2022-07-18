require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtGenerator = (uid, name) => {
    return new Promise( (resolve,reject) => {
        const payload = {
            uid,
            name
        }

        jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: '2h'
        }, (error, token) => {
            if(error){
                console.log(error);
                return reject('No se pudo generar el token')
            }
            return resolve(token)
        } )
    })
};

module.exports = jwtGenerator;