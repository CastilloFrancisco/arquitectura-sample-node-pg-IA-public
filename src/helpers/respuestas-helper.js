import { StatusCodes } from 'http-status-codes';

const RespuestasHelper = {

    responderOk(res, data) {
        return res
            .status(StatusCodes.OK)
            .json(data);
    },

    responderCreated(res, data) {
        return res
            .status(StatusCodes.CREATED)
            .json(data);
    },

    responderBadRequest(res, data = null) {
        if (typeof data === 'string') {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(data);
        }

        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(data);
    },

    responderNotFound(res, mensaje) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send(mensaje);
    },

    responderError(res, error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Error: ${error.message}`);
    },

    responderErrorInterno(res) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send('Error interno.');
    }

};

export default RespuestasHelper;