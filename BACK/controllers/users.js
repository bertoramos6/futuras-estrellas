const jwt = require('jsonwebtoken');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');

const databaseFunctions = require('./databaseFunctions');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const functions = require('./functions')

const registerScout = async (req, res, next) => {
    //recoger los datos de registro
    const { name, surname, email, gender, province, birthDate, actualClub, category, position, strongLeg, password, confirmPassword } = req.body;

    //comprobar que son validos los datos que dan en el registro
    if ( !name || !surname || !email || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg || !password || !confirmPassword) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    } else {
        avatarPerfil = 'uploads/avatars/noAvatar.png'
    }

    //calculamos la edad del ojeador
    let age = functions.ageDiff(birthDate);

    //si el ojeador es menor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (isNaN(age) || age < 18) {
        const invalidParamsError = new Error('el ojeador debe ser mayor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }
    if (!validator.isEmail(email)) {
        const invalidEmailError = new Error('el email introducido no es valido');
        invalidEmailError.status = 400;
        next(invalidEmailError);
        return;
    }
    if (functions.checkPassword(password) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }
    if (password != confirmPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    //si ya existe otro usuario registrado con ese email, error
    if ((await databaseFunctions.checkScoutCount(email)) > 0) {
        const userError = new Error('ya existe otro usuario con el mismo email');
        userError.status = 409;
        next(userError)
        return;
    }

    const scout = {
        'rol': 'ojeador',
        'nombreJugador': functions.normalizeName(name),
        'apellidosJugador': functions.normalizeName(surname),
        'email': email,
        'sexo': gender,
        'provincia': province,
        'fechaNacimiento': birthDate,
        'clubActual': actualClub,
        'categoriaBusca': category,
        'posicionBusca': position,
        'piernaBuenaBusca': strongLeg,
        'avatar': avatarPerfil,
        'contraseña': password
    }

    let responseDTO;
    if ( await databaseFunctions.saveScout(scout)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia creada correctamente',
            'rol': 'ojeador',
            'nombreJugador': functions.normalizeName(name),
            'apellidosJugador': functions.normalizeName(surname),
            'email': email,
            'sexo': gender,
            'provincia': province,
            'fechaNacimiento': birthDate,
            'clubActual': actualClub,
            'categoriaBusca': category,
            'posicionBusca': position,
            'piernaBuenaBusca': strongLeg,
            'avatar': avatarPerfil
        };
    } else {
        responseDTO = {
            'code': 200,
            'description': 'No se ha podido crear la cuenta de familia'
        };
    }

    //enviar email confirmación //esto del envio de email esta comentado porque la version gratuita permite un maximo de 100 emails diarios y haciendo las pruebas superaba estos limites
    // try {
    //     await sgMail.send(functions.createConfirmationEmailScout(email, functions.normalizeName(name)));
    //     console.log('Message sent');
    // } catch(e) {
    //     console.log(e.response.body)
    //     const emailError = new Error('error al enviar el email');
    //     emailError.status = 400;
    //     next(emailError);
    // }
    console.log('email enviado')
    //res.send();
    return res.status(responseDTO.code).json(responseDTO);
}

const registerFamily = async (req, res, next) => {
    //recoger los datos de registro
    const { name, surname, nameTutor, surnameTutor, emailTutor, gender, province, birthDate, actualClub, category, position, strongLeg, password, confirmPassword } = req.body;

    //comprobar que los datos de registo son válidos
    if ( !name || !surname || !nameTutor || !surnameTutor || !emailTutor || !gender || !province || !birthDate || !actualClub || !category || !position || !strongLeg || !password || !confirmPassword) {
        const missingParamsError = new Error('No se han introducido todos los parámetros obligatorios');
        missingParamsError.status = 400;
        next(missingParamsError);
        return;
    }

    let avatarPerfil = '';

    if (req.file) {
        avatarPerfil = req.file.path;
    } else {
        avatarPerfil = 'uploads/avatars/noAvatar.png'
    }

     //calculamos la edad del jugador
    let age = functions.ageDiff(birthDate);

    //si el jugador es mayor de edad, mete un email no válido, las contraseñas no coinciden o la contraseña no es válida, error
    if (age > 18 || isNaN(age)) {
        const invalidParamsError = new Error('el jugador debe ser menor de edad');
        invalidParamsError.status = 400;
        next(invalidParamsError);
        return;
    }

    if (!validator.isEmail(emailTutor)) {
        const invalidEmailError = new Error('el email introducido no es valido');
        invalidEmailError.status = 400;
        next(invalidEmailError);
        return;
    }

    if (functions.checkPassword(password) == false) {
        const invalidPasswordError = new Error('la contraseña debe contener un minimo de 8 caracteres, una mayuscula y un numero');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    if (password != confirmPassword) {
        const invalidPasswordError = new Error('las contraseñas no coinciden');
        invalidPasswordError.status = 400;
        next(invalidPasswordError);
        return;
    }

    //si ya existe otro usuario registrado con ese email, error
    if ((await databaseFunctions.checkPlayerCount(emailTutor)) > 0) {
        const userError = new Error('ya existe otro usuario con el mismo email');
        userError.status = 409;
        next(userError)
        return;
    }

    //almacenar los datos
    const family = {
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
        'avatar': avatarPerfil,
        'contraseña': password
    }
    let responseDTO;
    if ( await databaseFunctions.saveFamily(family)) {
        responseDTO = {
            'code': 200,
            'description': 'Cuenta de familia creada correctamente',
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
            'description': 'No se ha podido crear la cuenta de familia'
        };
    }

    //enviar email confirmación //esto del envio de email esta comentado porque la version gratuita permite un maximo de 100 emails diarios y haciendo las pruebas superaba estos limites
    // try {
    //     await sgMail.send(functions.createConfirmationEmailFamily(emailTutor, functions.normalizeName(surname)));
    //     console.log('Message sent');
    // } catch(e) {
    //     console.log(e.response.body)
    //     const emailError = new Error('error al enviar el email');
    //     emailError.status = 400;
    //     next(emailError);
    // }
    console.log('email enviado')
    //res.send();
    return res.status(responseDTO.code).json(responseDTO);
}

const loginFamily = async (req, res, next) => {
    const {email, password} = req.body;
    const rol = 'familia';

    const responseDTO = await databaseFunctions.login(email, password, rol);
    
    const tokenPayload = {
        id: responseDTO.id,
        role: responseDTO.rol,
    }
    //si el usuario no logra entrar correctamente en la cuenta, el token estará vacío; si logra entrar, asignaremos el token
    let token = '';
    if (responseDTO.description === ('Login correcto')) {
        token = jwt.sign(tokenPayload, process.env.SECRET, { 
            expiresIn: '1d' //el token caduca en 1 dia
        });
    }

    res.status(responseDTO.code).json({responseDTO, token})
}

const loginScout = async (req, res, next) => {
    const {email, password} = req.body;
    const rol = 'ojeador';

    const responseDTO = await databaseFunctions.login(email, password, rol);
    
    const tokenPayload = {
        id: responseDTO.id,
        role: responseDTO.rol,
    }
    //si el usuario no logra entrar correctamente en la cuenta, el token estará vacío; si logra entrar, asignaremos el token
    let token = '';
    if (responseDTO.description === ('Login correcto')) {
        token = jwt.sign(tokenPayload, process.env.SECRET, { 
            expiresIn: '1d' //el token caduca en 1 dia
        });
    }

    res.status(responseDTO.code).json({responseDTO, token})
}

const searchUsers = async (req, res, next) => { // en esta funcion, dependiendo de si el usuario es ojeador o familia se hacen unas llamadas u otras, debido a que algunas variables tienen nombres distintos en las tablas de ojeadores y jugadores
    const rol = req.query['rol'];
    const nombre = req.query['nombre'];
    const apellidos = req.query['apellidos'];
    const genero = req.query['genero'];
    const provincia = req.query['provincia'];
    const edadMinima = req.query['edadMinima'];
    const edadMaxima = req.query['edadMaxima'];
    const posicion = req.query['posicion'];
    const categoria = req.query['categoria'];
    const strongLeg = req.query['piernaBuena'];
    let listaUsuarios;

    if ( rol ) {
        if (rol === 'familia') {
            listaUsuarios = await databaseFunctions.getPlayerList();
        } 
        if (rol === 'ojeador') {
            listaUsuarios = await databaseFunctions.getScoutList();
        } else if ( rol !== 'ojeador' && rol !=='familia') {
            const rolError = new Error('No existe el rol que estás buscando')
            rolError.status = 404
            next(rolError)
            return;
        }
    } else if ( !rol ) {
        const noRoleError = new Error('Es necesario especificar el rol para poder buscar usuarios');
        noRoleError.status = 400;
        next(noRoleError)
        return;
    }
    if ( nombre ) { //si existe nombre
        if ( rol === 'familia') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.nombre_jugador).trim()).toLowerCase()).replace(' ', '-') === ((nombre.trim()).toLowerCase()).replace(' ','-'));
        } else if (rol === 'ojeador') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.nombre).trim()).toLowerCase()).replace(' ', '-') === ((nombre.trim()).toLowerCase()).replace(' ','-'));
        }
    }
    if ( apellidos ) { //si existe apellido
        if ( rol === 'familia') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.apellidos_jugador).trim()).toLowerCase()).replace(' ', '-') === ((apellidos.trim()).toLowerCase()).replace(' ','-'));
        } else if (rol === 'ojeador') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.apellidos).trim()).toLowerCase()).replace(' ', '-') === ((apellidos.trim()).toLowerCase()).replace(' ','-'));
        }
    }
    if ( genero ) { //si existe generp
        listaUsuarios = listaUsuarios.filter( usuario => usuario.sexo === genero);
    }
    if ( provincia ) { //si existe provincia
        listaUsuarios = listaUsuarios.filter( usuario => (usuario.provincia).toLowerCase() === provincia);
    }
    if ( edadMinima ) { //si existe edad minima
        listaUsuarios = listaUsuarios.filter( usuario => parseInt(functions.ageDiff(usuario.fecha_nacimiento)) >= parseInt(edadMinima));
    }
    if ( edadMaxima ) { //si existe edad maxima
        listaUsuarios = listaUsuarios.filter( usuario => parseInt(functions.ageDiff(usuario.fecha_nacimiento)) <= parseInt(edadMaxima));
    }
    if ( posicion ) {  //si existe posicion
        if ( rol === 'familia') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.posicion_principal).trim()).toLowerCase()).replace(' ', '-') === ((posicion.trim()).toLowerCase()).replace(' ','-'));
        } else if (rol === 'ojeador') {
            listaUsuarios = listaUsuarios.filter( usuario => (((usuario.posicion_principal_busca).trim()).toLowerCase()).replace(' ', '-') === ((posicion.trim()).toLowerCase()).replace(' ','-'));
        }
    }
    if ( strongLeg ) { //si existe pierna fuerte
        if ( rol === 'familia') {
            listaUsuarios = listaUsuarios.filter( usuario => (usuario.pierna_buena).toLowerCase() === strongLeg);
        } else if (rol === 'ojeador') {
            listaUsuarios = listaUsuarios.filter( usuario => (usuario.pierna_buena_busca).toLowerCase() === strongLeg);
        }
    }
    if (categoria) {  //si existe categoria
        if ( rol === 'familia') {
            listaUsuarios = listaUsuarios.filter( usuario => (usuario.categoria).toLowerCase() === categoria);
        } else if (rol === 'ojeador') {
            listaUsuarios = listaUsuarios.filter( usuario => (usuario.categoria_busca).toLowerCase() === categoria);
        }
    }

    res.json(listaUsuarios);
}
module.exports = {
    loginFamily,
    loginScout,
    registerFamily,
    registerScout,
    searchUsers
}
