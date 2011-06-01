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


  this.draw = function(rows, cols) {
    for (var i = 0; i < options.rows; i++) {
      var row = _.create('tr');

      for (var k = 0; k < options.cols; k++) {
        var td = _.create('td');
        row.appendChild(td);
        // store reference to each node, useful for painting
        cells.push(td);

        paint(td);
      }
      fragment.appendChild(row);
    }
    node.appendChild(fragment)
  };

  this.repaint = function() {
    var i = cells.length;
    while (i--) {
      paint(cells[i]);
    }
  };

  // set up repaint interval
  function loop(self)  {
    self.timeout = window.setTimeout(function() {
      self.repaint();

      loop(self);
    }, options.idle)
  };
  loop(this);

  this.update = function(updated) {
    // remove rendered nodes and references to them
    node.innerHTML = '';
    cells = [];

    // produce new options from passed updated options
    // reuse old values if no new have been passed
    options = _.extend(updated, options);

    // render new grid
    this.draw();

    // clear existing loop and set up new loop with new timeout
    window.clearTimeout(this.timeout);
    loop(this);
  };

  this.draw()
}