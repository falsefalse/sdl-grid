// draw grid

var Grid = function(node, options) {
  if (!node || node.nodeName !== 'TABLE') {
    throw 'Please provide a valid table node in order to initialize Grid';
  }
  // IE auto append TBODY to the table, so check for it
  // basically, we want to use TBODY as a node,
  // since we want append to it
  if (node.childNodes && node.childNodes.length) {
    var first_child = node.childNodes[0];
    if (first_child.nodeName === 'TBODY') {
      node = first_child;
    }
  } else {
    node = node.appendChild(_.create('tbody'));
  }

  // add defaults
  options = _.extend(options || {}, {
    rows : 5,
    cols : 5,
    idle : 1000
  });

  var fragment = document.createDocumentFragment();
  var cells = [];

  function paint (td) {
    var rgb_color = 'rgb('
                  + [_.rnd(255), _.rnd(255), _.rnd(255)].join(', ')
                  + ')';
    td.style.backgroundColor = rgb_color;
  }

  this.draw = function() {
    for (var i = 0; i < options.rows; i++) {
      var row = _.create('tr');

      for (var k = 0; k < options.cols; k++) {
        var td = _.create('td');
        row.appendChild(td);
        cells.push(td);

        paint(td);
      }

      fragment.appendChild(row);
    }

    node.appendChild(fragment)
  }

  this.draw()
}