// draw grid

var Grid = function(node, options) {
  if (!node || node.nodeName !== 'TABLE') {
    throw 'Please provide a valid table node in order to initialize Grid';
  }

  // add defaults
  options = _.extend(options || {}, {
    rows : 5,
    cols : 5,
    idle : 1000
  });

  var fragment = document.createDocumentFragment();

  this.draw = function() {
    for (var i = 0; i < options.rows; i++) {
      var row = _.create('tr');
      for (var k = 0; k < options.cols; k++) {
        row.appendChild( _.create('td') );
      }
      fragment.appendChild(row);
    }

    node.appendChild(fragment)
  }

  this.draw()
}