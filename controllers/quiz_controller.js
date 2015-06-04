var models = require('../models/models.js');




//AutoLoad
exports.load = function (req, res, next, quizId) {
    models.Quiz.findById(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe el quizId=' + quizId));
            }
        }
    ).catch(function (error) {
        next(error);
    });
}



// GET /quizes
exports.index = function (req, res) {
     var strSearch='%';
    if(req.query.search!=null)
    {
        strSearch='%'+req.query.search.replace(/\s/g, '%')+'%';
    }

    //if(req.param.length>0){strSearch=req.param.search;}
    console.log(req.query.search);
        console.log('SEARCH-->'+strSearch);
    models.Quiz.findAll({where: ["pregunta like ?", strSearch]}).then(
        function (quizes) {
            res.render('quizes/index.ejs', {
                quizes: quizes,
                errors: []
            });
        }
    ).catch(function (error) {
        next(error)
    });
};

// GET /quizes/:id
exports.show = function (req, res) {
    /*console.log('Quiz_Id: ' + req.params.quizId);
    models.Quiz.count().then(function (count) {
        console.log('Cantidad:' + count)
    });

    var aux = models.Quiz.findById(req.params.quizId).then(function (quiz) {
        res.render('quizes/show', {
            quiz: quiz
        })
    });
*/
    res.render('quizes/show', {
        quiz: req.quiz
    });
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado
    });
    /* models.Quiz.findById(req.params.quizId).then(function (quiz) {
        if (req.query.respuesta === quiz.respuesta) {
            res.render('quizes/answer', {
                quiz: quiz,
                respuesta: 'Correcto'
            })

        } else {
            res.render('quizes/answer', {
                quiz: quiz,
                respuesta: 'Incorrecto'
            })
        }
    })
*/
};


//GET  /quizes/author
exports.author = function (req, res) {
    res.render('quizes/author', {});
};
