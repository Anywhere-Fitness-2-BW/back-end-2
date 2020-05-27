
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classTypes')
  .then(function() {
      // Inserts seed entries
      return knex('classTypes').insert([
        {id: 1, type: 'Aerobic'},
        {id: 2, type: 'Bootcamp'}, 
        {id: 3, type: 'Barre'},
        {id: 4, type: 'Conditioning'},
        {id: 5, type: 'HIIT'},    
        {id: 6, type: 'Lifting'},
        {id: 7, type: 'Pilates'},
        {id: 8, type: 'Physical'},
        {id: 9, type: 'Running'},
        {id: 10, type: 'Sport'},
        {id: 11, type: 'Stretch'},
        {id: 12, type: 'Yoga'},
        {id: 13, type: 'Zumba'}
      ]);
    });
};
