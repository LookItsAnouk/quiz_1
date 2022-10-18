const express = require("express");
const knex = require("../db/client");
const router = express.Router();

 //Render index template
 router.get("", (req, res) => {
  res.redirect("/clucks")
  });

  // render clucks index
  router.get("/clucks", (req, res) => {
    knex("clucks")
      .orderBy("created_at", "desc")
      .then(clucks => {
        res.render("clucks/index", { clucks });
      });
  });


    //Render sign-in template
  router.get("/clucks/sign_in", (req, res) => {
        res.render("clucks/sign_in");
      });


//   //------Sign in POST request---------------->
// router.post('/', (req, res) => {
//     const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 
//     const username = req.body.username
//     console.log(username)
//     res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
//     res.redirect('/clucks')
// })





// //-------Sign out POST request------------->
// router.post('/', (req, res) => {
//     res.clearCookie('username');
//     res.redirect('/clucks');
// })

  //Render new clucks template
  router.get("/clucks/new", (req, res) => {
    if(!req.headers.cookie){
      res.send("Please Sign In and try Again")
    }
    else{
      console.log(req.headers.cookie)
    res.render("clucks/new", {cluck: false});
    }
  });


// create new cluck
router.post("/clucks", (req, res) => {
    const cookieName = req.headers.cookie
    const usename = cookieName.slice(9)
    const formData = req.body;
    knex("clucks")
      .insert({
        content: formData.content,
        imgurl: formData.imgurl,
        username: usename
    })
    .returning("*")
    .then(clucks => {
        res.render("clucks/index", { clucks});
      });
});



// //show single cohort
// router.get("/:id", (req, res) => {
//     const id = req.params.id;
//     knex("clucks")
//       .where("id", id)
//       .first()
//       .then(cluck => {
//         if (!cluck) {
//           res.send("No Clucks found")
//         } else {
//             res.render("clucks/show", {cluck,teams});
//           }
//       });
//   });



module.exports = router;