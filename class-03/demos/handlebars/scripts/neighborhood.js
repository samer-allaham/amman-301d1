'use strict';

let neighborhoods = [];

function Neighborhood (rawDataObject) {
  for (let key in rawDataObject) {
    this[key] = rawDataObject[key];
  }
}

// Neighborhood.prototype.render = function() {
//   let container = $('.template').clone();
//   container.removeClass('template');
//   container.find('.name').text(this.name);
//   container.find('.city').text(`Part of: ${this.city}`);
//   container.find('.population').text(`Current population: ${this.population}`);
//   return container;
// };

Neighborhood.prototype.render = function() {
  let templateMarkup = $('#neighborhood-template').html();
  let template = Handlebars.compile(templateMarkup);
  let output = template(this);
  $('#neighborhoods').append( output );

  // $('#neighborhoods').append(Handlebars.compile( $('#neighborhood-template').html() )(this)
};


neighborhoodDataSet.forEach(neighborhoodObject => {
  neighborhoods.push(new Neighborhood(neighborhoodObject));
});

neighborhoods.forEach(ourNewNeighborhoodObject => {
  $('#neighborhoods').append(ourNewNeighborhoodObject.render());
});
