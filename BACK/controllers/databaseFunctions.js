const getConnection = require ('../database.js');

//obtener el id del jugador
const getPlayerId = async (email) => {
    const sql = `SELECT id from jugadores WHERE email_tutor= ?`;

    // return await connection.query(sql, (error, results) => {
    //     if(error) throw error
    //     return (results[0].id)
    // })

    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [email]);

    connection.release();
    return rows[0].id;
}

//obtener el id del ojeador
const getScoutId = async (email) => {
    const sql = 'SELECT id from ojeadores WHERE email=?';
    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [email]);

    connection.release();
    return rows[0].id;
}

//obtener el email del jugador
const getPlayerEmail = async (id) => {
    const sql = 'SELECT email_tutor from jugadores WHERE id=?';
    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [id]);

    connection.release();
    return rows[0].email_tutor;
}

//obtener el email del ojeador
const getScoutEmail = async (id) => {
    const sql = 'SELECT email from ojeadores WHERE id=?';
    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [id]);

    connection.release();
    return rows[0].email;
}

//obtener todos los datos del ojeador
const getScout = async (id) => {
    const sql = 'SELECT rol, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, categoria_busca, posicion_principal_busca, pierna_buena_busca, avatar FROM ojeadores WHERE id=?';
    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [id]);
    rows[0]['code'] = 200;
    rows[0]['description'] = 'ojeador encontrado correctamente';

    connection.release();
    return(rows[0]);
}

//obtener todos los datos de la familia
const getPlayer = async (id) => {
    const sql = `SELECT rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, categoria, posicion_principal, pierna_buena, avatar FROM jugadores WHERE id=?`;

    // return await connection.query(sql, (error, results) => {
    //     if(error) throw error
    //     results[0]['code'] = 200;
    //     results[0]['description'] = 'familia encontrada correctamente';

    //     return (results[0])
    // })

    const connection = await getConnection.getConnection();
    let [rows] = await connection.execute(sql, [id]);
    rows[0]['code'] = 200;
    rows[0]['description'] = 'familia encontrada correctamente';

    connection.release();
    return(rows[0]);
}

//comprobamos que el usuario existe tanto en la tabla de jugadores como en la de ojeadores
const checkUserExists = async (email) => {
    const sql = `SELECT COUNT(*) FROM jugadores JUG, ojeadores OJ WHERE JUG.email_tutor = ? OR OJ.email = ?`;

    // return await connection.query(sql, (error, results) => {
    //     if(error) throw error
    //     return (results[0]['COUNT(*)'])
    // })

    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [email, email]);

    connection.release();
    return (rows[0]['COUNT(*)']);
}

//tanto login scout como login family llaman a esta funcion, la cual dependiendo del rol del usuario, intentará el login en la tabla de jugadores o en la de ojeadores
const login = async (email, password, rol) => {
    let sql = '';
    if (rol === 'familia') {
        sql = 'SELECT id FROM jugadores WHERE email_tutor = ? AND contrasena = SHA1(?)';
    } else if (rol === 'ojeador') {
        sql = 'SELECT id FROM ojeadores WHERE email = ? AND contrasena = SHA1(?)'
    }
    try {
        const connection = await getConnection.getConnection();
        const [rows] = await connection.execute(sql, [email, password]);
        let description;
        if (!rows[0]) {
            description = 'Usuario/contraseña incorrectos';
            code = 200
        } else {
            description = 'Login correcto';
            code = 200
        }

        let responseDTO = {
            'code': code,
            'description': description,
        };

        if (rows[0]) {
            responseDTO['id'] = rows[0].id;
            responseDTO['rol'] = rol;
            responseDTO['email'] = email;
        }

        connection.release();
        return responseDTO;
    } catch (exception) {
        return {
            'code': 500,
            'description': exception.toString()
        };
    }
}

//comprobamos cuantos jugadores hay registrados con ese mismo email
const checkPlayerCount = async (email) => {
    const sql = `SELECT COUNT(*) FROM jugadores WHERE email_tutor = ?`;

    // return await connection.query(sql, (error, results) => {
    //     if(error) throw error
    //     return (results[0]['COUNT(*)'])
    // })

    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [email]);

    connection.release();
    return (rows[0]['COUNT(*)']);
}

//comprobamos cuantos ojeadores hay registrados con ese mismo email
const checkScoutCount = async (email) => {
    const sql = 'SELECT COUNT(*) FROM ojeadores WHERE email=?';
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [email]);

    connection.release();
    return (rows[0]['COUNT(*)']);
}

//guardamos la familia en la tabla de jugadores
const saveFamily = async (family) => {
    const sql = 'INSERT INTO jugadores (rol, nombre_jugador, apellidos_jugador, nombre_tutor, apellidos_tutor, email_tutor, sexo, provincia, fecha_nacimiento, club_actual, categoria, posicion_principal, pierna_buena, avatar, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SHA1(?))'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, Object.values(family));

    connection.release();
    return true;
}

//guardamos el ojeador en la tabla de ojeadores
const saveScout = async (scout) => {
    const sql = 'INSERT INTO ojeadores (rol, nombre, apellidos, email, sexo, provincia, fecha_nacimiento, club_actual, categoria_busca, posicion_principal_busca, pierna_buena_busca, avatar, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SHA1(?))'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, Object.values(scout));

    connection.release();
    return true;
}
//actualizar el perfil de familia (sin cambio de contraseña)
const updateProfileFamily = async (family, id) => {
    const sql = 'UPDATE jugadores SET nombre_jugador=?, apellidos_jugador=?, nombre_tutor=?, apellidos_tutor=?, email_tutor=?, sexo=?, provincia=?, fecha_nacimiento=?, club_actual=?, categoria=?, posicion_principal=?, pierna_buena=?, avatar=? WHERE id=?';
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [family.nombreJugador, family.apellidosJugador, family.nombreTutor, family.apellidosTutor, family.emailTutor, family.sexo, family.provincia, family.fechaNacimiento, family.clubActual, family.categoria, family.posicion, family.piernaBuena, family.avatar, id]);

    connection.release();
    return true;
}
//actualizar el perfil de ojeador (sin cambio de contraseña)
const updateProfileScout = async (scout, id) => {
    const sql = 'UPDATE ojeadores SET nombre=?, apellidos=?, email=?, sexo=?, provincia=?, fecha_nacimiento=?, club_actual=?, categoria_busca=?, posicion_principal_busca=?, pierna_buena_busca=?, avatar=? WHERE id=?';
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [scout.nombre, scout.apellidos, scout.email, scout.sexo, scout.provincia, scout.fechaNacimiento, scout.clubActual, scout.categoriaBusca, scout.posicionBusca, scout.piernaBuenaBusca, scout.avatar, id]);

    connection.release();
    return true;
}
//guardar experiencia de ojeador
const saveExperienceScout = async (nombreEquipo, anoInicio, anoFin, resumen, idUser) => {
    const sql = 'INSERT INTO experiencias (nombre_equipo, ano_inicio, ano_fin, resumen, id_ojeador) VALUES (?, ?, ?, ?, ?)';
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [nombreEquipo, anoInicio, anoFin, resumen, idUser]);

    connection.release();
    return true;
}
//guardad experiencia de jugador
const saveExperiencePlayer = async (nombreEquipo, anoInicio, anoFin, resumen, idUser) => {
    const sql = 'INSERT INTO experiencias (nombre_equipo, ano_inicio, ano_fin, resumen, id_jugador) VALUES (?, ?, ?, ?, ?)';
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [nombreEquipo, anoInicio, anoFin, resumen, idUser]);

    connection.release();
    return true;
}
//mostrar experiencias de ojeador
const showScoutExperiences = async (idUser) => {
    const sql = 'SELECT id, nombre_equipo, ano_inicio, ano_fin, resumen, id_ojeador FROM experiencias WHERE id_ojeador=?'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [idUser]);

    connection.release();
    return rows;
}
//mostrar experiencias de jugador
const showPlayerExperiences = async (idUser) => {
    const sql = `SELECT id, nombre_equipo, ano_inicio, ano_fin, resumen, id_jugador FROM experiencias WHERE id_jugador=?`

    // return await connection.query(sql, (error, results) => {
    //     if(error) throw error
    //     return results
    // })

    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [idUser]);

    connection.release();
    return rows;
}
//borrar experiencias de jugador
const deletePlayerExperience = async (idUser, idExperience) => {
    const sql = 'DELETE FROM experiencias WHERE id=? AND id_jugador=?'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [idExperience, idUser]);

    connection.release();
    return true;
}
//borrar experiencias de ojeador
const deleteScoutExperience = async (idUser, idExperience) => {
    const sql = 'DELETE FROM experiencias WHERE id=? AND id_ojeador=?'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [idExperience, idUser]);

    connection.release();
    return true;
}
//comprobar la cuenta de jugadores que coincide la contraseña por la introducida
const playerPasswordEqualsCount = async (email, oldPassword) => {
    const sql = 'SELECT COUNT(*) FROM jugadores WHERE email_tutor = ? AND contrasena = SHA1(?)'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [email, oldPassword]);

    connection.release();
    return (rows[0]['COUNT(*)']);
}
//comprobar la cuenta de ojeadores que coincide la contraseña por la introducida
const scoutPasswordEqualsCount = async (email, oldPassword) => {
    const sql = 'SELECT COUNT(*) FROM ojeadores WHERE email = ? AND contrasena = SHA1(?)'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [email, oldPassword]);

    connection.release();
    return (rows[0]['COUNT(*)']);
}
//actualizar contraseña de jugador
const updatePasswordFamily = async (newPassword, email) => {
    const sql = 'UPDATE jugadores SET contrasena=SHA1(?) WHERE email_tutor=?'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [newPassword, email])

    connection.release();
    return true;
}
//actualizar contraseña de ojeador
const updatePasswordScout = async (newPassword, email) => {
    const sql = 'UPDATE ojeadores SET contrasena=SHA1(?) WHERE email=?'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [newPassword, email])

    connection.release();
    return true;
}
// guardad video en la bd
const saveVideo = async (titulo, descripcion, videoFamilia, id) => {
    const sql = 'INSERT INTO videos (titulo, descripcion, url_video, id_jugador) VALUES (?, ?, ?, ?)'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [titulo, descripcion, videoFamilia, id]);

    connection.release();
    return true;
}
//mostrar videos de cierta familia (especificando el id)
const showVideos = async (idJugador) => {
    const sql = 'SELECT titulo, descripcion, url_video, id FROM videos WHERE id_jugador=?'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [idJugador]);

    connection.release();
    return rows;
}
// borrar video (especificando el id del video a borrar)
const deleteVideo = async (idJugador, idVideo) => {
    const sql = 'DELETE FROM videos WHERE id_jugador=? AND id=?'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [idJugador, idVideo]);

    connection.release();
    return true;
}
// obtener toda la lista de jugadores
const getPlayerList = async () => {
    const sql = 'SELECT * FROM jugadores'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql)

    connection.release();
    return rows;
}
//obtener toda la lista de ojeadores
const getScoutList = async () => {
    const sql = 'SELECT * FROM ojeadores'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql)

    connection.release();
    return rows;
}
//añadir un contrato a la tabla de contratos de nuestra base de datos
const saveContract = async (mensaje, idOjeador, idFamilia, emailOjeador, emailFamilia) => {
    const sql = 'INSERT INTO contratos (mensaje, id_ojeador, id_jugador, email_ojeador, email_jugador) VALUES (?, ?, ?, ?, ?)'
    const connection = await getConnection.getConnection();
    await connection.execute(sql, [mensaje, idOjeador, idFamilia, emailOjeador, emailFamilia])

    connection.release();
    return true;
}
//mostrar los mensajes recibidos por las familias
const showReceivedContracts = async (idJugador) => {
    const sql = 'SELECT * FROM contratos WHERE id_jugador=?'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [idJugador])

    connection.release();
    return rows;
}
//mostrar los mensajes recibidos por los ojeadores
const showSentContracts = async (idOjeador) => {
    const sql = 'SELECT * FROM contratos WHERE id_ojeador=?'
    const connection = await getConnection.getConnection();
    const [rows] = await connection.execute(sql, [idOjeador])

    connection.release();
    return rows;
}

module.exports = {
    checkPlayerCount,
    checkScoutCount,
    checkUserExists,
    deletePlayerExperience,
    deleteScoutExperience,
    deleteVideo,
    getPlayer,
    getPlayerEmail,
    getScoutEmail,
    getScoutList,
    getPlayerId,
    getPlayerList,
    getScoutId,
    getScout,
    login,
    playerPasswordEqualsCount,
    scoutPasswordEqualsCount,
    saveContract,
    saveFamily,
    saveExperienceScout,
    saveExperiencePlayer,
    saveScout,
    saveVideo,
    showPlayerExperiences,
    showReceivedContracts,
    showScoutExperiences,
    showSentContracts,
    showVideos,
    updateProfileFamily,
    updateProfileScout,
    updatePasswordFamily,
    updatePasswordScout
}
