//importando las librerias de npm usadas en este archivo, asi como las rutas a otros archivos
const functions = require('./functions');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

const databaseFunctions = require('./databaseFunctions');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//funcion que muestra el perfil, llamando al sql de familia u ojeador segun el caso
const showProfile = async (req, res, next) => {
    const email = req.params.email;
    const role = req.params.role;
    let id;
    //comprobando que el usuario existe en nuestra base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    //si el rol no es ni familia ni ojeador, error 404
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
    //obtener el id del ojeador y asegurarse de que la cuenta que existe con ese email corresponde a la de un ojeador
    if (role === 'ojeador') {
        id = await databaseFunctions.getScoutId(email);
        if (await databaseFunctions.checkScoutCount(email) === 0) {
            const accountTypeError = new Error(`No existe ninguna cuenta registrada como ojeador con este email`);
            accountTypeError.status = 404;
            next(accountTypeError);
            return;
        }
    }
    //obtener el id de la familia y asegurarse de que la cuenta que existe con ese email corresponde a la de una familia
    if (role === 'familia') {
        id = await databaseFunctions.getPlayerId(email);
        if (await databaseFunctions.checkPlayerCount(email) === 0) {
            const accountTypeError = new Error(`No existe ninguna cuenta registrada como familia con este email`);
            accountTypeError.status = 404;
            next(accountTypeError);
            return;
        }
    }
    // creamos un objeto responseDTO, al cual añadiremos informacion para pasar a la base de datos y devolver por pantalla
    let responseDTO;
    if (role === 'ojeador') {
        responseDTO = await databaseFunctions.getScout(id);
        
    } else if (role === 'familia') {
        responseDTO = await databaseFunctions.getPlayer(id);
    }

    res.json(responseDTO)
}
// funcion para modificar el perfil de la familia
const modifyProfileFamily = async (req, res, next) => {
    const { name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, position, strongLeg } = req.body;
    const email = req.params.email;
    let id;
    // comprobamos que la cuenta a la que se esta accediendo por la ruta existe
    try {
        id = await databaseFunctions.getPlayerId(email);
        if (id === undefined) {
            const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
            accountError.status = 400;
            next(accountError);
        }
    } catch(e) {
        const accountError = new Error('ha ocurrido algún error encontrando la cuenta');
        accountError.status = 400;
        console.log(e)
        next(accountError);
    }
    //creamos un avatar de perfil vacio, se llenara si el usuario sube un afoto de perfil
    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    } else {
        avatarPerfil = 'uploads/avatars/noAvatar.png'
    }
       //comprobando que el usuario existe en nuestra base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    // comprobamos que se introducen todos los valores necesarios en esta pagina
    if ( !name || !surname || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }
    //comprobamos que el email introducido en la ruta existe en nuestra base de datos
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como familia con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(birthDate);
    // comprobamos que el jugador sea menor de edad para poder crear la cuenta
    if (age > 18 || isNaN(age)) {
        const invalidParamsError = new Error('el jugador debe ser menor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }
    // objeto con toda la informacion introducida
    const family = {
        'nombreJugador': functions.normalizeName(name),
        'apellidosJugador': functions.normalizeName(surname),
        'nombreTutor': functions.normalizeName(nameTutor),
        'apellidosTutor': functions.normalizeName(surnameTutor),
        'emailTutor': emailTutor,
        'sexo': gender,
        'provincia': province,
        'fechaNacimiento': birthDate,
        'clubActual': actualClub,
        'categoria': category,
        'posicion': position,
        'piernaBuena': strongLeg,
        'avatar': avatarPerfil
    }
    let responseDTO; //creamos un responseDTO, el cual rellenamos con la informacion de la peticion sql
    if ( await databaseFunctions.updateProfileFamily(family, id)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia actualizada correctamente',
            'rol': 'familia',
            'nombreJugador': functions.normalizeName(name),
            'apellidosJugador': functions.normalizeName(surname),
            'nombreTutor': functions.normalizeName(nameTutor),
            'apellidosTutor': functions.normalizeName(surnameTutor),
            'emailTutor': emailTutor,
            'sexo': gender,
            'provincia': province,
            'fechaNacimiento': birthDate,
            'clubActual': actualClub,
            'categoria': category,
            'posicion': position,
            'piernaBuena': strongLeg,
            'avatar': avatarPerfil
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'No se ha podido actualizar la cuenta de familia'
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
}
// funcion para modificar el perfil del ojeador
const modifyProfileScout = async (req, res, next) => {
    const { name, surname, email, gender, province, birthDate, actualClub, category, position, strongLeg } = req.body;
    const emailParams = req.params.email;
    let id;
    // comprobamos que la cuenta a la que se esta accediendo por la ruta existe
    try {
        id = await databaseFunctions.getScoutId(emailParams);
        if (id === undefined) {
            const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
            accountError.status = 400;
            next(accountError);
        }
    } catch(e) {
        const accountError = new Error('error al encontrar la cuenta correspondiente al email introducido');
        accountError.status = 400;
        next(accountError);
    }
    //creamos un avatar de perfil vacio, se llenara si el usuario sube un afoto de perfil
    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    } else {
        avatarPerfil = 'uploads/avatars/noAvatar.png'
    }
       //comprobando que el usuario existe en nuestra base de datos
    if (await databaseFunctions.checkUserExists(emailParams) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    // comprobando que todos los parametros obligatorios han sido cubiertos
    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }
    //comprobar que existe algun ojeador registrado con ese mismo email
    if (await databaseFunctions.checkScoutCount(emailParams) < 1) {
        const accountTypeError = new Error('No existe ninguna cuenta registrada como ojeador con este email');
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }

    let age = functions.ageDiff(birthDate);
    //comprobamos que el ojeador es mayor de 18 años
    if (age < 18 || isNaN(age)) {
        const invalidParamsError = new Error('el ojeador debe ser mayor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }
    // objeto con toda la informacion introducida en el registro
    const scout = {
        'nombre': functions.normalizeName(name),
        'apellidos': functions.normalizeName(surname),
        'email': email,
        'sexo': gender,
        'provincia': province,
        'fechaNacimiento': birthDate,
        'clubActual': actualClub,
        'categoriaBusca': category,
        'posicionBusca': position,
        'piernaBuenaBusca': strongLeg,
        'avatar': avatarPerfil
    }
    let responseDTO; // objeto responseDTO el cual llenaremos con la informacion que nos ha proporcionado el usuario
    if ( await databaseFunctions.updateProfileScout(scout, id)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia actualizada correctamente',
            'rol': 'ojeador',
            'nombre': functions.normalizeName(name),
            'apellidos': functions.normalizeName(surname),
            'email': email,
            'sexo': gender,
            'provincia': province,
            'fechaNacimiento': birthDate,
            'clubActual': actualClub,
            'categoria': category,
            'posicion': position,
            'piernaBuena': strongLeg,
            'avatar': avatarPerfil
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'No se ha podido actualizar la cuenta de ojeador'
        };
    }
    return res.status(responseDTO.code).json(responseDTO);
}
// funcion para cambiar la contraseña
const changePassword = async (req, res, next) => {
    const { email, role } = req.params;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    let responseDTO;

       //comprobando que el usuario existe en nuestra base de datos
       if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    //si el rol no es ni familia ni ojeador, error 404
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
        // confirmamos que la contraseña contiene los caracteres obligatorios
    if (functions.checkPassword(newPassword) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    // comprobamos que las contraseñas nuevas coinciden
    if (newPassword != confirmNewPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    //comprobamos que la contraseña que introduce corresponde con la que esta guardada en la base de datos
    if (role === 'familia') {
        if (await databaseFunctions.checkPlayerCount(email) < 1) {
            const playerNotFoundError = new Error('jugador no encontrado');
            playerNotFoundError.status = 404;
            next(playerNotFoundError)
            return;
        }
        //pedimos a la base de datos el numero de cuentas que coinciden el email y la contraseña introducida (si no hay ninguna, la cuenta dará 0)
        if (await databaseFunctions.playerPasswordEqualsCount(email, oldPassword) < 1) {
            const playerPasswordError = new Error('La contraseña introducida no coincide con la guardada en la base de datos');
            playerPasswordError.status = 400;
            next(playerPasswordError)
            return;
        }
        // dependiendo del tipo de cuenta, llamamos al sql para que guarde la nueva contraseña
        try {
            if ( await databaseFunctions.updatePasswordFamily(newPassword, email)) {
                responseDTO = {
                    'descripcion': 'Se ha actualizado la contraseña correctamente',
                    'code': 200
                } 
            }
        } catch(e) {
            const experienceError = new Error('Ha habido algún error eliminando la experiencia');
            experienceError.status = 400;
            next(experienceError);
            return;
        }
    } else if (role === 'ojeador') {
        if (await databaseFunctions.checkScoutCount(email) < 1) {
            const scoutNotFoundError = new Error('ojeador no encontrado');
            scoutNotFoundError.status = 404;
            next(scoutNotFoundError)
            return;
        }
        //pedimos a la base de datos el numero de cuentas que coinciden el email y la contraseña introducida (si no hay ninguna, la cuenta dará 0)
        if (await databaseFunctions.scoutPasswordEqualsCount(email, oldPassword) < 1) {
            const scoutPasswordError = new Error('La contraseña introducida no coincide con la guardada en la base de datos');
            scoutPasswordError.status = 400;
            next(scoutPasswordError)
            return;
        }
        // dependiendo del tipo de cuenta, llamamos al sql para que guarde la nueva contraseña
        try {
            if (await databaseFunctions.updatePasswordScout(newPassword, email)) {
                responseDTO = {
                    'descripcion': 'Se ha actualizado la contraseña correctamente',
                    'code': 200
                }
            }
        } catch(e) {
            const experienceError = new Error('Ha habido algún error eliminando la experiencia');
            experienceError.status = 400;
            next(experienceError);
            return;
        }
    }

    return res.status(responseDTO.code).json(responseDTO);
}
// funcion para añadir experiencias, llamando al sql de la familia o del ojeador segun corresponda
const addExperience = async (req, res, next) => {
    const { email, role } = req.params;
    const { nombreEquipo, anoInicio, anoFin, resumen } = req.body;

    const { authorization } = req.headers;
    const decodedToken = jwt.verify(authorization, process.env.SECRET);
    req.auth = decodedToken;

       //comprobando que el usuario existe en nuestra base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    // comprobamos que se han introducido todos los parametros obligatorios
    if (!nombreEquipo || !anoInicio || !anoFin || !resumen ) {
        const invalidParamsError = new Error('Debes rellenar todos los campos para añadir una experiencia');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    let responseDTO; // objeto respnseDTO que rellenaremos con la informacion de la respuesta de la llamada a sql
    try {
        if (role === 'ojeador') {
            if (await databaseFunctions.saveExperienceScout(nombreEquipo, anoInicio, anoFin, resumen, decodedToken.id)) {
                responseDTO = {
                    'code': 200,
                    'description': 'Experiencia añadida correctamente',
                    'nombreEquipo': nombreEquipo,
                    'anoInicio': anoInicio,
                    'anoFin': anoFin,
                    'resumen': resumen,
                };
            } else {
                responseDTO = {
                    'code': 200,
                    'description': 'No se ha podido añadir la experiencia'
                };
            }
        }
        else if (role === 'familia') {
            if (await databaseFunctions.saveExperiencePlayer(nombreEquipo, anoInicio, anoFin, resumen, decodedToken.id)) {
                responseDTO = {
                    'code': 200,
                    'description': 'Experiencia añadida correctamente',
                    'nombreEquipo': nombreEquipo,
                    'anoInicio': anoInicio,
                    'anoFin': anoFin,
                    'resumen': resumen,
                };
            } else {
                responseDTO = {
                    'code': 200,
                    'description': 'No se ha podido añadir la experiencia'
                };
            }
        }
    } catch(e) { //codigo de error si algo falla llamando a las funciones de la base de datos
        const experienceError = new Error('Ha habido algún error añadiendo la experiencia');
        experienceError.status = 400;
        next(experienceError);
        return
    }


    return res.status(responseDTO.code).json(responseDTO);
}
// funcion para mostrar las experiencias, llamando al sql de la familia o al del ojeador segun corresponda
const showExperience = async (req, res, next) => {
    const { email, role } = req.params;
    let userId;
    //funcion que comprueba si el usuario existe en la base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    //funcion que comprueba que el rol del usuario es familia u ojeador
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
    //dependiendo del tipo de cuenta del usuario, acudimos a una funcion u otra para conseguir su id
    if (role === 'familia') {
        if (await databaseFunctions.checkPlayerCount(email) < 1) {
            const playerNotFoundError = new Error('jugador no encontrado');
            playerNotFoundError.status = 404;
            next(playerNotFoundError)
            return;
        }
        userId = await databaseFunctions.getPlayerId(email);
    } else if (role === 'ojeador') {
        if (await databaseFunctions.checkScoutCount(email) < 1) {
            const scoutNotFoundError = new Error('ojeador no encontrado');
            scoutNotFoundError.status = 404;
            next(scoutNotFoundError)
            return;
        }
        userId = await databaseFunctions.getScoutId(email);
    }

    let responseDTO;
    //dependiendo del tipo de cuenta del usuario, acudimos a una funcion u otra para mostrar las experiencias (ya que no sabemos si el id es de ojeador o de familia a no ser que lo comprobemos)
    try {

        if (role === 'ojeador') {
            responseDTO = await databaseFunctions.showScoutExperiences(userId);
            responseDTO['code'] = 200;
        } else if (role === 'familia') {
            responseDTO = await databaseFunctions.showPlayerExperiences(userId);
            responseDTO['code'] = 200;
        }

    } catch(e) {
        const experienceError = new Error('Ha habido algún error mostrando las experiencias');
        experienceError.status = 400;
        next(experienceError);
        return
    }

    return res.status(responseDTO.code).json(responseDTO);
}
// funcion para borrar experiencias, llamando al sql de la familia o del ojeador segun corresponda
const deleteExperience = async (req, res, next) => {
    const { email, role, idExperiencia } = req.params;
    let userId;

    //funcion que comprueba si el usuario existe en la base de datos
    if (await databaseFunctions.checkUserExists(email) < 1) {
        const userNotFoundError = new Error('usuario no encontrado');
        userNotFoundError.status = 404;
        next(userNotFoundError)
        return;
    }
    //si el rol no es ni familia ni ojeador, error 404
    if (role !== 'familia' && role !== 'ojeador') {
        const differentAccountError = new Error(`No existe el tipo de cuenta ${role}`);
        differentAccountError.status = 400;
        next(differentAccountError);
        return;
    }
    //dependiendo del rol que se haya especificado, comprobar la existencia de la cuenta con ese rol y asignar el id correspondiente
    if (role === 'familia') {
        if (await databaseFunctions.checkPlayerCount(email) < 1) {
            const playerNotFoundError = new Error('familia no encontrada');
            playerNotFoundError.status = 404;
            next(playerNotFoundError)
            return;
        }
        userId = await databaseFunctions.getPlayerId(email);
    } else if (role === 'ojeador') {
        if (await databaseFunctions.checkScoutCount(email) < 1) {
            const scoutNotFoundError = new Error('ojeador no encontrado');
            scoutNotFoundError.status = 404;
            next(scoutNotFoundError)
            return;
        }
        userId = await databaseFunctions.getScoutId(email);
    }

    let responseDTO;
    //dependiendo del tipo de cuenta del usuario, acudimos a una funcion u otra para borrar la experiencia (ya que no sabemos si el id es de ojeador o de familia a no ser que lo comprobemos)
    try {
        if (role === 'familia') {
            if (await databaseFunctions.deletePlayerExperience(userId, idExperiencia)) {
                responseDTO = {
                    'descripcion': 'Se ha borrado correctamente la experiencia',
                    'code': 200
                }
            }
        } else if (role === 'ojeador') {
            if(await databaseFunctions.deleteScoutExperience(userId, idExperiencia)) {
                responseDTO = {
                    'descripcion': 'Se ha borrado correctamente la experiencia',
                    'code': 200
                }
            }  else {
                responseDTO = {
                    'descripcion': 'No se ha podido borrar correctamente la experiencia',
                    'code': 200
                }
            }
        }
    } catch(e) {
        const experienceError = new Error('Ha habido algún error eliminando la experiencia');
        experienceError.status = 400;
        next(experienceError);
        return;
    }

    return res.status(responseDTO.code).json(responseDTO);
}

module.exports = {
    changePassword,
    modifyProfileFamily,
    modifyProfileScout,
    showProfile,
    showExperience,
    addExperience,
    deleteExperience
}