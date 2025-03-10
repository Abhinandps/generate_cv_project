module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new users
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single users with id
  router.get("/:id", users.findOne);

  // Update a users with id
  router.put("/:id", users.update);

  // Delete a users with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  // templates

  // Retrieve generated resume based on user id
  router.get("/:id/resume", users.generateOneResume);

  app.use('/api/users', router);
};
