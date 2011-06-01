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

  function paint (td) {
    var rgb_color = 'rgb('
                  + [_.rnd(255), _.rnd(255), _.rnd(255)].join(', ')
                  + ')';
    td.style.backgroundColor = rgb_color;
  }

  var cells = [];
  this.draw = function(rows, cols) {
    log_display.l.time('draw')

    var fragment = document.createDocumentFragment();

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
    node.appendChild(fragment);

    log_display.l.end('draw', log_display.draw)
  };

  this.repaint = function() {
    log_display.l.time('repaint');

    var i = cells.length;
    while (i--) {
      paint(cells[i]);
    }


    log_display.l.end('repaint', log_display.paint)
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
    // IE can't modify the tbody innerHTML, so use DOM methods
    var parent = node.parentNode;
    parent.removeChild(node);
    node = parent.appendChild(_.create('tbody'));
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