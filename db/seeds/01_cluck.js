/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const faker = require("faker");

 // To run your seed files, do:
 // knex seed:run
 
 exports.seed = function(knex, Promise) {
   return knex("clucks")
     .del()
     .then(function() {
       const clucks = Array.from({ length: 100 }).map(() => {
         return {
           imgurl: faker.image.imageUrl(),
           username: faker.name.firstName(),
           content: faker.lorem.lines(1),
           created_at: faker.date.past(),
           updated_at: faker.date.past()
         };
       });
       
       return knex("clucks").insert(clucks);
     });
 };
