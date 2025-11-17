# CLAUDE.md - CKY Parser UI

## Project Philosophy & Vision

This project is a beautiful visualization of the **CKY (Cocke-Younger-Kasami) parsing algorithm** - a fundamental algorithm in computational linguistics and natural language processing. The goal is to make abstract algorithmic concepts tangible and visually understandable.

### The Essence

The CKY algorithm is elegant in its simplicity yet powerful in its application. This UI brings that elegance to life through:

- **Visual Clarity**: Real-time animation showing how the parsing table fills bottom-up
- **Educational Value**: Making complex CS theory accessible to students and researchers
- **Interactivity**: Users can input their own grammars and sentences to see how they parse
- **Linguistic Beauty**: Vietnamese language examples demonstrating CFG parsing in action

## Architecture & Code Philosophy

### Core Principles

1. **Simplicity First**: Pure JavaScript with minimal dependencies
   - No complex build systems to understand
   - No framework lock-in
   - Easy for students to read and learn from

2. **Visual Storytelling**: The code is structured around the animation sequence
   - `lib.js`: Core CKY algorithm implementation
   - `do_parse_table.js`: Visual table rendering and animation
   - `render_tree.js`: Parse tree visualization
   - Each file has a single, clear responsibility

3. **Safety & Security**:
   - Eliminated `eval()` usage for secure code execution
   - Input sanitization to prevent XSS
   - Clean separation between data and behavior

### Key Design Decisions

**Why Pure JavaScript?**
- Educational accessibility - students can view source and understand immediately
- No compilation step - edit and refresh
- Universal compatibility - works everywhere

**Why jQuery?**
- Simple DOM manipulation without verbose vanilla JS
- Familiar to most developers
- Lightweight and focused

**Why Inline Animations?**
- Direct visual feedback of algorithm execution
- Students can correlate code with visualization
- No "magic" - everything is traceable

## Development Guidelines

### Code Style

```javascript
// ✅ DO: Clear, descriptive names
function grammarToHashMap(rules) {
    // Transform grammar rules into efficient lookup structure
}

// ✅ DO: Document complex algorithms
/**
 * CKY Algorithm Implementation (Bottom-Up Chart Parsing)
 * @param {Grammar} grammar - CFG in Chomsky Normal Form
 * @param {string} sentence - Input sentence to parse
 * @param {Object} eh - Event handler for visualization
 */
function cky_offline(grammar, sentence, eh) {
    // ...
}

// ❌ AVOID: Magic numbers
var UPDATE_INTERVAL = 10; // ✅ Named constant instead
```

### Adding New Features

When extending this project:

1. **Preserve the Educational Value**
   - Keep code readable
   - Comment complex sections
   - Maintain the visual feedback loop

2. **Test with Grammar Examples**
   - Verify with existing Vietnamese examples in `bienthe.txt`
   - Add edge cases to `grammar.txt`
   - Ensure tree rendering handles all cases

3. **Animation Consistency**
   - Use the color scheme defined in `do_parse_table.js`
   - Keep timing consistent with `UPDATE_INTERVAL`
   - Test animation at different speeds

### File Organization

```
cky-ui/
├── index.html              # Main application entry point
├── lib.js                  # Core CKY algorithm & utilities
├── do_parse_table.js       # Table visualization & animation
├── render_tree.js          # Parse tree rendering
├── grammar.txt             # CFG rules in CNF format
├── bienthe.txt             # Vietnamese test sentences
├── static/
│   ├── css/
│   │   ├── app.css         # Custom styles & tree visualization
│   │   └── bootstrap.min.css
│   └── js/
│       └── jquery-3.3.1.min.js
└── CLAUDE.md               # This file - project philosophy
```

## Grammar Format

This parser accepts **Context-Free Grammars in Chomsky Normal Form (CNF)**:

```
# Terminal rules (A -> a)
NP -> em
VB -> đi

# Non-terminal rules (A -> B C)
S -> NP VP
VP -> VB Advp

# Comments start with #
# Preprocessing rules for multi-word tokens:
# replace: "buổi tối" = buổi-tối
```

### CNF Requirements

1. All rules are either:
   - `A -> B C` (two non-terminals), or
   - `A -> a` (single terminal)

2. No epsilon productions
3. No unit productions (handled during grammar conversion)

## Understanding the Visualization

### Color Scheme

- **White (#fff)**: Inactive cells
- **Orange-Red (#FF4500)**: Currently active cell being filled
- **Green-Yellow (#ADFF2F)**: Cells being tested for combination
- **Sky Blue (#87CEEB)**: Cells that produced a successful match
- **Thistle (#D8BFD8)**: Updated cell content

### Parse Table Layout

The table is triangular because:
- Rows represent span length (1 word, 2 words, 3 words...)
- Columns represent starting position in sentence
- Cell [i,j] contains all non-terminals that can derive the substring from position i with length j

### Animation Flow

1. **Bottom row**: Fill with terminal productions
2. **Work upward**: Combine smaller parses into larger ones
3. **Top cell**: If contains 'S' (start symbol), sentence is grammatical!

## Testing & Quality

### Manual Testing Checklist

- [ ] Load page without errors
- [ ] Select example sentence from dropdown
- [ ] Click "Phân tích" button
- [ ] Verify animation plays smoothly
- [ ] Check parse tree renders correctly
- [ ] Test with custom grammar input
- [ ] Verify responsive layout on mobile
- [ ] Test with malformed grammar (should show error)
- [ ] Test with non-parseable sentence (table fills but no 'S' at top)

### Performance Considerations

- Grammar size: O(n) rules → O(1) HashMap lookup
- CKY complexity: O(n³|G|) where n = sentence length, |G| = grammar size
- Animation: Throttled to prevent UI blocking
- Large sentences (>20 words) may slow down significantly

## Contribution Philosophy

This isn't just code - it's a teaching tool. When contributing:

1. **Think Like a Student**: Will someone learning NLP understand this code?
2. **Visualize First**: Does your change enhance or obscure the algorithm?
3. **Test Linguistically**: Try edge cases in multiple languages
4. **Document Generously**: Assume readers are learning both programming AND linguistics

## Common Issues & Solutions

### Grammar Won't Parse
- Ensure grammar is in valid CNF format
- Check that start symbol 'S' exists
- Verify no typos in rule definitions
- Look for missing terminal rules for input words

### Animation Too Fast/Slow
- Adjust `UPDATE_INTERVAL` in `do_parse_table.js`
- Click on chart to pause/resume
- Use keyboard (Space/Enter) to control playback

### Tree Rendering Overlaps
- CSS handles this via `.tree` styles in `app.css`
- Increase page width or zoom out for complex trees
- Consider splitting into multiple parse trees if ambiguous

## Future Vision

This project could evolve to:

1. **Interactive Grammar Editor**: Live editing with syntax highlighting
2. **Step-by-Step Mode**: Explain each cell computation in detail
3. **Multiple Languages**: Support for English, Chinese, etc. with different grammatical structures
4. **Mobile-First**: Touch-optimized controls for tablet use in classrooms
5. **Export Functionality**: Save parse trees as images or LaTeX
6. **Ambiguity Visualization**: Show all possible parses for ambiguous sentences

## Resources & References

- [CYK Algorithm on Wikipedia](https://en.wikipedia.org/wiki/CYK_algorithm)
- [Chomsky Normal Form](https://en.wikipedia.org/wiki/Chomsky_normal_form)
- [Context-Free Grammars](https://en.wikipedia.org/wiki/Context-free_grammar)
- Tree CSS adapted from: http://thecodeplayer.com/walkthrough/css3-family-tree

## License

MIT License - See LICENSE file

## Acknowledgments

Created with passion for making computational linguistics accessible and beautiful.

---

*"The purpose of computing is insight, not numbers."* - Richard Hamming

This tool exists to provide insight into how computers understand language structure. Every line of code should serve that purpose.
