'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\x1Bc');

const people = [
  {
    id: 2,
    name: 'John Doe',
    age: 34,
    petName: 'Rex',
    petType: 'dog',
  },
  {
    id: 2,
    name: 'John Doe',
    age: 34,
    petName: 'Fido',
    petType: 'dog',
  },
  {
    id: 3,
    name: 'Mary Jane',
    age: 19,
    petName: 'Mittens',
    petType: 'kitten',
  },
  {
    id: 3,
    name: 'Mary Jane',
    age: 19,
    petName: 'Fluffy',
    petType: 'cat'
  }
];

const hydrated = {};

people.forEach(row => {
  if (!(row.id in hydrated)) {
    hydrated[row.id] = {
      id: row.id,
      name: row.name,
      age: row.age,
      pets: []
    };
  }
  hydrated[row.id].pets.push({
    name: row.petName,
    type: row.petType,
  });
});

console.log(hydrated);
console.log(hydrated[2].pets);

// Sample select 
// knex('restaurants')
//   .where('id', '11')
//   .del()
//   .debug(true)
//   .then(results => console.log(results))
//   .catch(err => console.log(err));


// // Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});