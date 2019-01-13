function unique(names) {
  console.log('BEFORE:', names)
  var uniqueNames = [];
  $.each(names, function(i, el){
      if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  console.log('AFTER :', uniqueNames)
  return uniqueNames;
}

function grammarToHashMap(rules) {
  var hashMap = {};
  for (var i in rules) {
      var rule = rules[i];
      var parts = rule.split('->');
      var root = parts[0].trim();
      
      var productions = parts[1].split('|');
      for(var j in productions) {
          var childs = (productions[j].trim()).split(' ');
          var key = makeKey(childs);
          if (!hashMap[key]) {
              hashMap[key] = [];
          }
          hashMap[key].push(root);
      }        
  }
  return hashMap;
}


function array_index_of(a, e) {
  if (a != null) {
    for (var i = 0; i < a.length; ++i) {
      if (a[i] == e)
        return i;
    }
  }
  return -1;
}

function merge_arrays(a, b) {
  for (var i = 0; i < b.length; ++i) {
    a.push(b[i]);
  }
}

function Grammar(grammar) {
  this._terminal_rules = new Array();
  this._non_terminal_rules = new Array();

  var re_rule = /^(\w+)\s*->\s*(\w+)(?:\s+(\w+))?\s*\.?$/;
  grammar = grammar.split(/\r?\n/);
  grammar = grammar.filter(function(n) {
      return n[0] != '#' && n.trim().length > 0
  })
  grammar = unique(grammar)

  for (var i = 0; i < grammar.length; ++i) {
    var r = grammar[i];
    if (r.length == 0)
      continue;
    var a = re_rule.exec(r);

    var x = r.trim().split('->')
    var a = []
    
    if (x[0] == null) continue;
    a[0] = x[0].trim();

    x[1] = x[1].trim()
    a[1] = x[1].split(' ')[0]
    a[2] = x[1].split(' ')[1] || null;

    a.unshift(0)

    if (a[3]) {
      var new_rule = new Array(a[1], a[2], a[3]);
      this._non_terminal_rules.push(new_rule);
      if (this._s == null)
        this._s = new String(a[1]);
    } else {
      var new_rule = new Array(a[1], a[2]);
      this._terminal_rules.push(new_rule);
    }
  }

  this.start_symbol = function () {
    return this._s;
  }

  this.left_hand_sides = function (s) {
    var res = new Array();
    for (var i = 0; i < this._terminal_rules.length; ++i) {
      var r = this._terminal_rules[i];
      if (r[1] == s)
        res.push(r[0]);
    }

    return res;
  }

  this.left_hand_sides2 = function (s, t) {
    var res = new Array();
    for (var i = 0; i < this._non_terminal_rules.length; ++i) {
      var r = this._non_terminal_rules[i];
      if (r[1] == s && r[2] == t) {
        console.log(r, s, t, 'r --- s --- t')
        res.push(r[0]);
      }
    }
    return res;
  }

  return this;
}

function tokenize_sentence(sentence) {
  var s = sentence.split(/\s+/);
  return s;
}

function allocate_chart(N) {
  var c = new Array(N + 1);
  c[0] = new Array(N);
  for (var i = 1; i <= N; ++i) {
    c[i] = new Array(N - (i - 1));
  }
  return c;
}

function cky_offline(grammar, sentence, eh) {
  var G = new Grammar(grammar);
  console.log(sentence)

  var S = tokenize_sentence(sentence);
  var N = S.length;
  var C = allocate_chart(N);

  eh.start(S);
  for (var x = N - 1; x >= 0; --x) {
    var y = N - x - 1;
    eh.active_cell_changed(x, y);
    C[x][y] = G.left_hand_sides(S[y]);
    eh.cell_updated(x, y, C[x][y]); 

  }
  for (var x = 1; x < N; ++x) {
    for (var y = x - 1; y >= 0; --y) {
      var nt = C[N - 1 - y][x];

      eh.active_cell_changed(N - 1 - y, x);

      for (var i = x; i > y; --i) {

        var nts2 = C[N - 1 - i][x];
        var nts1 = C[N - 1 - y][i - 1];

        eh.attempt_match(N - 1 - i, x, N - 1 - y, i - 1);
        if (nts1 != null && nts2 != null) {
          for (var ii = 0; ii < nts1.length; ++ii) {
            var nt1 = nts1[ii];
            for (var jj = 0; jj < nts2.length; ++jj) {
              var nt2 = nts2[jj];
              var rhss = G.left_hand_sides2(nt1, nt2);
              if (rhss == 0 || rhss.length == 0)
                continue;
              if (nt == null) {
                nt = new Array();
                C[N - 1 - y][x] = nt;
                console.log(nt)
              }

              merge_arrays(nt, rhss);
              eh.found_match(N - 1 - i, x, N - 1 - y, i - 1);
              eh.cell_updated(N - 1 - y, x, nt);
            }
          }
        }
      }
    }
  }

  var accepted = array_index_of(C[N - 1][0], G.start_symbol()) != -1;
  eh.end(accepted);
  return accepted;
}
