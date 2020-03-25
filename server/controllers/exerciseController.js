const Exercise = require('../models/exercise');
// user create exercise
const createExercise = async (req, res, next) => {
    try {
        const email = req.user.email;
        const { exerciseName, exerciseCount, exerciseDate } = req.body
        const newExercise = new Exercise({ email: email, exerciseName: exerciseName, exerciseCount: exerciseCount, exerciseDate: exerciseDate });
        await newExercise.save();
        res.json({
            data: newExercise,
            message: "Exercise created successfully"
        })
    } catch (error) {
        next(error)
    }
}
// Get all exercise based on user
const getExercise = async (req, res, next) => {
    try {
        const exercises = await Exercise.find({ email: req.user.email });
        res.status(200).json({
            data: exercises
        });
    } catch (error) {
        next(error)
    }
}
// update exercise based on exerciseId
const updateExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.exerciseId;
        await Exercise.findByIdAndUpdate(exerciseId, req.body);
        res.status(200).json({
            data: { exerciseId: exerciseId, message: "Exercise updated successfully" }
        });
    } catch (error) {
        next(error)
    }
}
// delete exercise based on exerciseId
const deleteExercise = async (req, res, next) => {
    try {
        const exerciseId = req.params.exerciseId;
        await Exercise.findByIdAndDelete(exerciseId);
        res.status(200).json({
            data: { exerciseId: exerciseId, message: "Exercise deleted successfully" }
        });
    } catch (error) {
        next(error)
    }
}
// export function for other module
module.exports = {
    createExercise: createExercise,
    getExercise: getExercise,
    updateExercise: updateExercise,
    deleteExercise: deleteExercise
};