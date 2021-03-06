const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {

  db.Workout.find({})
    .sort({ day: 1 })
    .then((dbExercise) => {
      let i;
      let k;
      let total;
      let id;
      for (i = 0; i < dbExercise.length; i++) {
        id = dbExercise[i]._id;
        let exercises= dbExercise[i].exercises
        console.log(id);
        total = 0;
        for (k = 0; k < exercises.length; k++) {
          console.log(exercises[k]);
          total += exercises[k].duration;
          
        }
        dbExercise[i].totalDuration = total;
        
        
      }
     
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  //setting variable to search for last weeks workouts
  let d = new Date();
  d.setDate(d.getDate() - 7);

  db.Workout.find({ day: { $gte: d } })
    .sort({ day: 1 })
    .then((dbExercise) => {
      let i;
      let k;
      let total;
      let id;
      for (i = 0; i < dbExercise.length; i++) {
        id = dbExercise[i]._id;
        let exercises= dbExercise[i].exercises
        console.log(id);
        total = 0;
        for (k = 0; k < exercises.length; k++) {
          console.log(exercises[k]);
          total += exercises[k].duration;
          
        }
        dbExercise[i].totalDuration = total;
        
        
      }
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/:id", (req, res) => {
  db.Workout.find({ _id: req.params.id })

    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.where("_id", req.params.id)
    .updateOne({ $push: { exercises: req.body } })

    .then((dbExercise) => {
      res.json(dbExercise);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
