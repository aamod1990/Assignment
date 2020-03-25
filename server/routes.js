const userController = require('./controllers/userController');
const exerciseController = require('./controllers/exerciseController');

module.exports = (app) => {
    app.post('/signup', userController.signup);
    app.post('/login', userController.login);
    app.post('/exercise', userController.isAuthenticated, exerciseController.createExercise);
    app.get('/exercise', userController.isAuthenticated, exerciseController.getExercise);
    app.put('/exercise/:exerciseId', userController.isAuthenticated, exerciseController.updateExercise);
    app.delete('/exercise/:exerciseId', userController.isAuthenticated, exerciseController.deleteExercise);
}
