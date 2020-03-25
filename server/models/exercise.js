const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  exerciseCount: {
    type: String,
    required: true
  },
  exerciseDate: {
    type: String,
    required: true
  }
})

const Exercise = mongoose.model('exercise', ExerciseSchema)

module.exports = Exercise;