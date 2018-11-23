function render_tree(grammar, input_text, tree_output_id) {

function create2dArray(dim) {
    var arr = new Array(dim);
    for (var i = 0; i < dim; i++) {
        arr[i] = new Array(dim);
        for (var j = 0; j < dim; j++) {
            arr[i][j] = [];
        }
    }
    return arr;
}

function makeKey(obj) {
    if(typeof obj === 'string') {
        obj = [obj];
    }
    var x = JSON.stringify(obj, null, 0);    
    return x;
}

function parse(grammar, tokens) {
    var tokLen = tokens.length + 1;
    var parseTable = create2dArray(tokLen);
    for (var right = 1; right < tokLen; right++) {
        var token = tokens[right - 1];
        var terminalRules = grammar[makeKey(token)];
        for (var r in terminalRules) {
            var rule = terminalRules[r];
            parseTable[right - 1][right].push({
                rule: rule,
                token: token
            });
        }
        for (var left = right - 2; left >= 0; left--) {
            for (var mid = left + 1; mid < right; mid++) {
                var leftSubtreeRoots = parseTable[left][mid];
                var rightSubtreeRoots = parseTable[mid][right];
                for (var leftRootIndx in leftSubtreeRoots) {
                    for (var rightRootIndx in rightSubtreeRoots) {
                        var rls = grammar[makeKey([leftSubtreeRoots[leftRootIndx]['rule'],  rightSubtreeRoots[rightRootIndx]['rule']])];
                        if (rls) {
                            for (var r in rls) {
                                parseTable[left][right].push({
                                    rule: rls[r],
                                    middle: mid,
                                    leftRootIndex: leftRootIndx,
                                    rightRootIndex: rightRootIndx
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    return parseTable;
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

function traverseParseTable(parseTable, left, right, rootIndex) {
        if (!parseTable[left][right][rootIndex]['middle']) {
            return '<li><a href="#">' + parseTable[left][right][rootIndex]['rule'] + '</a><ul><li><a href="#">' + parseTable[left][right][rootIndex]['token'] + '</a></li></ul></li>';
        }
        return '<li><a href="#">' + parseTable[left][right][rootIndex]['rule'] + '</a><ul>' + traverseParseTable(parseTable, left, parseTable[left][right][rootIndex]['middle'], parseTable[left][right][rootIndex]['leftRootIndex']) + traverseParseTable(parseTable, parseTable[left][right][rootIndex]['middle'], right, parseTable[left][right][rootIndex]['rightRootIndex']) + '</ul></li>';
    }

// http://en.wikipedia.org/wiki/Chomsky_normal_form
// grammar = [
//     'S -> Number | Variable | Open Expr_Close | Factor PowOp_Primary | Term MulOp_Factor | Expr AddOp_Term | AddOp Term',
//     'Expr -> Number | Variable | Open Expr_Close | Factor PowOp_Primary | Term MulOp_Factor | Expr AddOp_Term | AddOp Term',
//     'Term -> Number | Variable | Open Expr_Close | Factor PowOp_Primary | Term MulOp_Factor',
//     'Factor -> Number | Variable | Open Expr_Close | Factor PowOp_Primary',
//     'Primary -> Number | Variable | Open Expr_Close',
//     'Expr_Close -> Expr Close',
//     'PowOp_Primary -> PowOp Primary',
//     'MulOp_Factor -> MulOp Factor',
//     'AddOp_Term -> AddOp Term',
//     'AddOp -> + | -',
//     'MulOp -> * | /',
//     'Open -> (',
//     'Close -> )',
//     'PowOp -> ^'
// ];
// var parseTable = parse(grammarToHashMap(grammar), 'Variable ^ Number + Number * Variable'.split(' '));
// for (var i in parseTable[0][parseTable.length - 1]) {
//     document.body.innerHTML += '<div class="tree" id="displayTree"><ul>' + traverseParseTable(parseTable, 0, parseTable.length - 1, i) + '</ul></div><br/>';
// }

// http://en.wikipedia.org/wiki/CYK_algorithm#Example
// grammar = [
//     'S -> NP VP',
//     'VP -> VP PP',
//     'VP -> V NP',
//     'VP -> eats',
//     'PP -> P NP',
//     'NP -> Det N | she',
//     'V -> eats',
//     'P -> with',
//     'N -> fish | fork',
//     'Det -> a'
// ];
// var parseTable = parse(grammarToHashMap(grammar), 'she eats a fish with a fork'.split(' '));
// for (var i in parseTable[0][parseTable.length - 1]) {
//     document.body.innerHTML += '<div class="tree" id="displayTree"><ul>' + traverseParseTable(parseTable, 0, parseTable.length - 1, i) + '</ul></div><br/>';
// }

grammar = grammar.split('\n')
var parseTable = parse(grammarToHashMap(grammar), input_text.split(' '));

var tree_html = document.getElementById(tree_output_id);
tree_html.innerHTML = ''
for (var i in parseTable[0][parseTable.length - 1]) {
    tree_html.innerHTML += '<div class="tree" id="displayTree"><ul>' + traverseParseTable(parseTable, 0, parseTable.length - 1, i) + '</ul></div><br/>';
}

}
