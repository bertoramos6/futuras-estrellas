const databaseFunctions = require('./databaseFunctions');
const { response } = require('express');
// funcion para publicar videos (familias)
const postVideo = async (req, res, next) => {
    let videoFamilia;
    const { titulo, descripcion } = req.body;
    const { email } = req.params;
    let idPlayer;
    // comprobar que la cuenta de jugador a la que se pretende acceder existe
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const accountTypeError = new Error(`No existe ninguna cuenta registrada como familia con este email`);
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }
    //comprobar que el usuario ha subido un video
    if (!req.file) {
        const videoError = new Error('Debes añadir un vídeo');
        videoError.status = 400;
        next(videoError);
        return;
    } else {
        videoFamilia = req.file.path;
    }
    //obtenemos el id del jugador para añadir el video a la base de datos y saber a quien pertenece
    idPlayer = await databaseFunctions.getPlayerId(email);
    //creamos objeto responseDTO en el que guardamos la informacion que devolveremos por pantalla y enviaremos a la bd
    let responseDTO;
    try {
        if (await databaseFunctions.saveVideo(titulo, descripcion, videoFamilia, idPlayer)) {
            responseDTO = {
                'code': 200,
                'description': 'Vídeo añadido correctamente',
                'titulo': titulo,
                'descripcion': descripcion,
                'urlVideo': videoFamilia
            }
        } else {
            responseDTO = {
                'code': 200,
                'description': 'No se ha podido añadir la experiencia'
            }
        }
    } catch(e) { //codigo de error si falla algo en la peticion a la base de datos
        const experienceError = new Error('Ha habido algún error añadiendo la experiencia');
        experienceError.status = 400;
        next(experienceError);
        return
    }

    return res.status(responseDTO.code).json(responseDTO);
}

const showVideos = async (req, res, next) => {
    const { email } = req.params;

    // comprobar que la cuenta de jugador a la que se pretende acceder existe
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const accountTypeError = new Error(`No existe ninguna cuenta registrada como familia con este email`);
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }
    //obtenemos el id de la familia para poder devolver los videos
    const idPlayer = await databaseFunctions.getPlayerId(email);
    //creamos objeto responseDTO en el que guardamos la informacion que devolveremos por pantalla y enviaremos a la bd
    let responseDTO;
    try {
        responseDTO = await databaseFunctions.showVideos(idPlayer);
        responseDTO['code'] = 200;
    } catch(e) {
        const experienceError = new Error('Ha habido algún error mostrando la experiencia');
        experienceError.status = 400;
        next(experienceError);
        return
    }
    return res.status(responseDTO.code).json(responseDTO);
}

const deleteVideo = async (req, res, next) => {
    const { idVideo, email } = req.params;

    // comprobar que la cuenta de jugador a la que se pretende acceder existe
    if (await databaseFunctions.checkPlayerCount(email) < 1) {
        const accountTypeError = new Error(`No existe ninguna cuenta registrada como familia con este email`);
        accountTypeError.status = 404;
        next(accountTypeError);
        return;
    }
        //obtenemos el id de la familia para poder devolver los videos
        const idPlayer = await databaseFunctions.getPlayerId(email);
        //creamos objeto responseDTO en el que guardamos la informacion que devolveremos por pantalla y enviaremos a la bd
        let responseDTO;
        try {
            if (await databaseFunctions.deleteVideo(idPlayer, idVideo)) {
                responseDTO = {
                    'descripcion': 'Se ha borrado correctamente el vídeo',
                    'code': 200
                }
            } else {
                responseDTO = {
                    'descripcion': 'No se ha podido borrar correctamente el vídeo',
                    'code': 200
                }
            }
        } catch(e) {
            console.log(e);
            const experienceError = new Error('Ha habido algún error eliminando la experiencia');
            experienceError.status = 400;
            next(experienceError);
            return
        }
        return res.status(responseDTO.code).json(responseDTO);
}

module.exports = {
    postVideo,
    showVideos,
    deleteVideo
}