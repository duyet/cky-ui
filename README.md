# CKY Parser - Interactive Visualization

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success.svg)](https://duyet.github.io/cky-ui/)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-brightgreen.svg)](https://github.com/duyetdev/cky-ui)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/duyetdev/cky-ui/graphs/commit-activity)

> Interactive visualization of the **CKY (Cocke-Younger-Kasami) parsing algorithm** for context-free grammars in Chomsky Normal Form

## 🌟 Live Demo

**[https://duyet.github.io/cky-ui/](https://duyet.github.io/cky-ui/)**

## 📖 About

The CKY algorithm is a fundamental parsing algorithm in computational linguistics and natural language processing. This tool provides:

- **Real-time visualization** of the CKY parsing table as it fills bottom-up
- **Interactive parse trees** showing grammatical structure
- **Step-by-step animation** to understand algorithm execution
- **Vietnamese language examples** demonstrating CFG parsing

Perfect for:
- 📚 Students learning NLP and computational linguistics
- 👨‍🏫 Educators teaching parsing algorithms
- 🔬 Researchers experimenting with context-free grammars
- 💻 Developers understanding parser internals

## ✨ Features

- ✅ **Pure JavaScript** - No framework dependencies, easy to understand
- ✅ **Interactive UI** - Click, pause, and explore the parsing process
- ✅ **Visual Feedback** - Color-coded cells show algorithm progression
- ✅ **Grammar Editor** - Input your own CFG rules in CNF format
- ✅ **Example Library** - Pre-loaded Vietnamese sentences for testing
- ✅ **Accessibility** - ARIA labels and semantic HTML
- ✅ **Mobile Responsive** - Works on all devices

## 🚀 Quick Start

### Online

Just visit [https://duyet.github.io/cky-ui/](https://duyet.github.io/cky-ui/)

### Local Development

```bash
# Clone the repository
git clone https://github.com/duyetdev/cky-ui.git
cd cky-ui

# Install development dependencies (optional, for linting/formatting)
npm install

# Serve locally
npm run serve

# Or use any static server
python -m http.server 8080
# Then open http://localhost:8080
```

## 📝 Grammar Format

Input grammars must be in **Chomsky Normal Form (CNF)**:

```
# Terminal rules (A -> a)
NP -> em
VB -> đi
Advp -> về

# Non-terminal rules (A -> B C)
S -> NP VP
VP -> VB Advp

# Comments start with #

# Preprocessing for multi-word tokens:
# replace: "buổi tối" = buổi-tối
```

### CNF Requirements

1. All productions are either:
   - `A -> B C` (two non-terminals)
   - `A -> a` (single terminal)
2. No epsilon (ε) productions
3. No unit productions

## 🎨 How It Works

### The CKY Algorithm

1. **Initialize**: Fill bottom row with terminals
2. **Build upward**: Combine smaller constituents into larger ones
3. **Check**: If top cell contains start symbol `S`, sentence is grammatical

### Visualization Colors

| Color | Meaning |
|-------|---------|
| 🟦 White | Inactive cell |
| 🟧 Orange-Red | Currently active cell |
| 🟩 Green-Yellow | Cells being tested |
| 🟦 Sky Blue | Successful match |
| 🟪 Thistle | Updated content |

## 🏗️ Project Structure

```
cky-ui/
├── index.html              # Main entry point
├── main.js                 # Application initialization
├── lib.js                  # Core CKY algorithm
├── do_parse_table.js       # Table visualization
├── render_tree.js          # Parse tree rendering
├── grammar.txt             # Example CFG rules
├── bienthe.txt             # Example sentences
├── static/
│   ├── css/
│   │   ├── app.css         # Custom styles
│   │   └── bootstrap.min.css
│   └── js/
│       └── jquery-3.3.1.min.js
├── CLAUDE.md               # Development philosophy
├── LICENSE                 # MIT License
└── README.md               # This file
```

## 🛠️ Development

### Code Quality

```bash
# Lint JavaScript
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run all validations
npm run validate
```

### Tech Stack

- **Frontend**: Pure JavaScript, jQuery 3.3.1
- **Styling**: Bootstrap 4, Custom CSS
- **Build**: None required (pure static site)
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

## 📚 Learn More

- [CKY Algorithm on Wikipedia](https://en.wikipedia.org/wiki/CYK_algorithm)
- [Chomsky Normal Form](https://en.wikipedia.org/wiki/Chomsky_normal_form)
- [Context-Free Grammars](https://en.wikipedia.org/wiki/Context-free_grammar)

## 🤝 Contributing

Contributions are welcome! Please read [CLAUDE.md](CLAUDE.md) for development philosophy and guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Van-Duyet Le**

- Website: [duyet.net](https://duyet.net)
- GitHub: [@duyetdev](https://github.com/duyetdev)
- Twitter: [@duyetdev](https://twitter.com/duyetdev)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn about parsing algorithms!

## 🙏 Acknowledgments

- Tree visualization CSS adapted from [The Code Player](http://thecodeplayer.com/walkthrough/css3-family-tree)
- Vietnamese grammar examples for educational purposes
- Inspired by the beauty of computational linguistics

---

*Making computer science education accessible and beautiful, one algorithm at a time.*
