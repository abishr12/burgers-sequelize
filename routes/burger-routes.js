// Requiring our models
var db = require("../models/index.js");

module.exports = function(app) {
  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the burger as an argument inside of the callback function

      var hbsObject = {
        burgers: dbBurger
      };

      res.render("index", hbsObject);
    });
  });

  // POST route for saving a new todo
  app.post("/api/addburgers", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)

    db.Burger.create({
      burger_name: req.body.burger_name
    })
      .then(function(dbBurger) {
        // We have access to the new todo as an argument inside of the callback function
        res.send(dbBurger);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
  app.put("/api/burgers/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update

    db.Burger.update(
      {
        devoured: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(function(dbBurger) {
        res.json(dbBurger);
      })
      .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
