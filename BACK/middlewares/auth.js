const databaseFunctions = require('./../controllers/databaseFunctions');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => { 
    const { authorization } = req. headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
    } catch(e) {
        const authError = new Error('Token no válido');
        authError.status = 401;
        next(authError);  //ejecutamos el middleware de gestion de errores que tenemos en server
    }
    next();
}

const canUpdateProfile = async (req, res, next) => {
    const { authorization } = req.headers;
    const { email } = req.params;


    if (databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
        let id, rol;

        if (decodedToken.role === 'ojeador') {
            id =  await databaseFunctions.getScoutId(email);
            rol = 'ojeador';
            if(databaseFunctions.checkScoutCount(email) < 1) {
                const authError = new Error('Token no válido, la cuenta para entrar aquí dede ser el ojeador propietario de la cuenta');
                authError.status = 401;
                next(authError);
                return;
            }
        } else if (decodedToken.role === 'familia') {
            id = await databaseFunctions.getPlayerId(email);
            rol = 'familia';
            if (databaseFunctions.checkPlayerCount(email) < 1) {
                const authError = new Error('Token no válido, la cuenta para entrar aquí debe ser la familia propietaria de la cuenta');
                authError.status = 401;
                next(authError);
                return;
            }
        }
        if (id !== decodedToken.id || rol !== decodedToken.role) {
            const authError = new Error('Token no válido, el token tiene que corresponder con el id y el rol del ususario del perfil');
            authError.status = 401;
            next(authError);
            return;
        }
    } catch(e) {
        const authError = new Error('Token no válido, hubo algún fallo con el token');
        authError.status = 401;
        console.log(e)
        next(authError);
        return;
    }
    next();
}

const isScout = (req, res, next) => {
    const { authorization } = req. headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        
        if (decodedToken.role !== 'ojeador') {
            const authError = new Error('invalid role');
            authError.status = 401;
            next(authError);
        }
        req.auth = decodedToken;

    } catch(e) {
        const authError = new Error('invalid token');
        authError.status = 401;
        next(authError)
    }
    next();
}

module.exports = {
    canUpdateProfile,
    isAuthenticated,
    isScout
}