const databaseFunctions = require('./databaseFunctions');

const sendContract = async (req, res, next) => {
    const { email } = req.params;
    const { mensaje } = req.body;
    const decodedToken = req.auth;
    //comprobamos casos de error (el rol debe ser ojeador, debe existir la cuenta y debe haber mensaje)
    if (decodedToken.role !== 'ojeador') {
        const notScoutError = new Error('Debes ser ojeador para enviar un contrato');
        notScoutError.status = 400;
        next(notScoutError)
        return;
    }
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    if(!mensaje) {
        const emptyMessage = new Error('No puedes enviar un mensaje vacío');
        emptyMessage.status = 400;
        next(emptyMessage)
        return;
    }
    //buscamos el id que les pertenece a esta cuenta de familia dependiendo de su email
    const idFamilia = await databaseFunctions.getPlayerId(email);
    //buscamos el email al que pertenece le id del ojeador
    const emailOjeador = await databaseFunctions.getScoutEmail(decodedToken.id)
    // creamoe este objeto para almacenar la informacion que nos llega y que enviamos a la base de datos
    let responseDTO;

    try {
        if(await databaseFunctions.saveContract(mensaje, decodedToken.id, idFamilia, emailOjeador, email)) {
            responseDTO = {
                'code': 200,
                'description': 'Contrato enviado correctamente',
                'mensaje': mensaje,
                'idOjeador': decodedToken.id,
                'idFamilia': idFamilia,
                'emailOjeador': emailOjeador,
                'emailJugador': email
            }
        } else {
            responseDTO = {
                'code': 200,
                'description': 'No ha sido posible enviar el contrato'
            }
        }
    } catch (e) {
        console.log(e)
        const contractError = new Error('Ha habido algún error añadiendo el contrato');
        contractError.status = 400;
        next(contractError);
        return
    }
    return res.status(responseDTO.code).json(responseDTO);
}

const showReceivedContracts = async (req, res, next) => {
    const decodedToken = req.auth;
    const { email } = req.params;

    if(!decodedToken || decodedToken.role !== 'familia') {
        const AuthError = new Error('Debes estar registrado como familia para poder ver los mensajes que te llegan');
        AuthError.status = 400;
        next(AuthError)
        return;
    }
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    // creamoe este objeto para almacenar la informacion que nos llega y que enviamos a la base de datos
    let responseDTO;

    try {
        responseDTO = await databaseFunctions.showReceivedContracts(decodedToken.id);
        responseDTO['code'] = 200;
    } catch(e) {
        const contractError = new Error('Ha habido algún error mostrando los mensajes');
        contractError.status = 400;
        next(contractError);
        return
    }

    return res.status(responseDTO.code).json(responseDTO);
}

const showSentContracts = async (req, res, next) => {
    const decodedToken = req.auth;
    const { email } = req.params;

    if(!decodedToken || decodedToken.role !== 'ojeador') {
        const AuthError = new Error('Debes estar registrado como ojeador para poder ver los mensajes que has enviado');
        AuthError.status = 400;
        next(AuthError)
        return;
    }
    if (await databaseFunctions.checkScoutCount(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    // creamoe este objeto para almacenar la informacion que nos llega y que enviamos a la base de datos
    let responseDTO;

    try {
        responseDTO = await databaseFunctions.showSentContracts(decodedToken.id);
        responseDTO['code'] = 200;
    } catch(e) {
        const contractError = new Error('Ha habido algún error mostrando los mensajes');
        contractError.status = 400;
        next(contractError);
        return
    }

    return res.status(responseDTO.code).json(responseDTO);
}

module.exports = {
    sendContract,
    showReceivedContracts,
    showSentContracts
}
