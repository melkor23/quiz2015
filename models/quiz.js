//modelo quiz
module.exports = function (sequalize, DataTypes) {
    return sequalize.define('Quiz', {
        pregunta: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: '->falta Pregunta'
                }
            }
        },
        respuesta: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: '->falta Respuesta'
                }
            }
        },
        tema: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: '->falta Respuesta'
                }
            }
        }
    });
}
