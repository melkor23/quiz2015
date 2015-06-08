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
    var strSearch = '%';
    if (req.query.search != null) {
        strSearch = '%' + req.query.search.replace(/\s/g, '%') + '%';
    }

    //if(req.param.length>0){strSearch=req.param.search;}
    console.log(req.query.search);
    console.log('SEARCH-->' + strSearch);
    models.Quiz.findAll({
        where: ["pregunta like ?", strSearch]
    }).then(
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
        quiz: req.quiz,
        errors: []
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
        respuesta: resultado, errors:[]
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

//CRUD
exports.new = function (req, res) {
    console.log('New quiz');
    var quiz = models.Quiz.build(
        //creamos el objeto
        {
            pregunta: 'Pregunta',
            respuesta: 'respuesta',
            tema: 'tema'
        }
    );


    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};


exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    console.log('--------Create');
    console.log(req.body.quiz.pregunta);
    console.log(req.body.quiz.respuesta);
    console.log(req.body.quiz.tema);
    quiz.validate().then(

        function (err) {
            if (err) {
                res.render('quizes/new', {
                    quiz: quiz,
                    errors: err.errors
                });
            } else {
                quiz.save({
                    fields: ['pregunta',
                    'respuesta', 'tema']
                }).then(function () {
                    res.redirect('../quizes');
                });
            }
        }
    );
};



exports.edit = function (req, res) {

    var quiz = req.quiz; //autoload
    console.log(quiz.pregunta);
    console.log(quiz.respuesta);
    console.log(quiz.tema);

    res.render('quizes/edit', {
        quiz: quiz,
        errors: []
    });
};

exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;


    req.quiz.validate().then(
        function (err) {
            if (err) {
                res.render('quizes/edit', {
                    quiz: req.quiz,
                    errors: err.errors
                });
            } else {
                req.quiz
                    .save({
                        fields: ['pregunta', 'respuesta', 'tema']
                    })
                    .then(function () {
                        res.redirect('/quizes');
                    });
            }
        }
    );
};

exports.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect(
            '/quizes'
        );
    }).catch(function (error) {
        next(error)
    });
}

//GET  /quizes/author
exports.author = function (req, res) {
    res.render('quizes/author', {});
};
