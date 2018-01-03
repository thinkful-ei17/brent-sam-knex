'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

const Treeize = require('treeize');
const placesToEat = new Treeize();

// app.get('/restaurants', (req, res) => {
//   knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
//     .select(knex.raw("CONCAT(address_building_number, ' ', address_street, ' ', address_zipcode) as address"))
//     .from('restaurants')
//     .innerJoin('grades', 'grades.restaurant_id', 'restaurants.id')
//     .where('restaurants.id', 1)
//     .orderBy('date', 'desc')
//     .then(results => res.json(results));
// });



// const hydrate = function (data) {
//   const hydrated = {};
//   data.forEach(row => {
//     if (!(row.id in hydrated)) {
//       hydrated[row.id] = {
//         name : row.name,
//         cuisine : row.cuisine,
//         borough : row.borough,
//         grades : [] 
//       };
//     }
//     hydrated[row.id].grades.push({
//       gradeId : row.gradeId,
//       grade : row.grade,
//       score : row.score
//     });
//   });
//   return hydrated;
// };

const tree = function(data) {
  return placesToEat.grow(data).getData();
};

app.get('/restaurants', (req, res) => {
  knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as grades:gradeId', 'grade as grades:grade', 'score as grades:score')
    .from('restaurants')
    .innerJoin('grades', 'grades.restaurant_id', 'restaurants.id')
    .where('restaurants.id', 1)
    .orderBy('date', 'desc')
    .limit(10)
    // .then(results => res.json(hydrate(results))
    .then(results => res.json(tree(results))
    );
});

app.listen(PORT);
