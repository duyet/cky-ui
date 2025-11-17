/**
 * Main application initialization and event handlers
 * @file main.js
 */

/* global $, do_parse, render_tree */

(function () {
    'use strict';

    let cleanRules = [];
    const REMOTE_SRC = 'https://raw.githubusercontent.com/duyetdev/cky-ui/master/';

    /**
     * Cleans and normalizes input text based on replacement rules
     * @param {string} str - Input string to clean
     * @returns {string} Cleaned string
     */
    function cleanInput(str) {
        str = str.toLowerCase();
        str = str.replace(/,\./g, '');

        for (const rule of cleanRules) {
            str = str.replace(rule.src, rule.dest);
        }

        return str;
    }

    /**
     * Parses grammar text and extracts replacement rules
     * @param {string} data - Grammar text content
     */
    function getGrammar(data) {
        $('#grammar').val(data);

        const rules = data.split('\n');
        for (const rule of rules) {
            if (rule.indexOf('replace: ') > -1) {
                let replaceRule = rule.split(':')[1].trim().replace(/"/g, '');
                replaceRule = replaceRule.split(' = ');
                if (replaceRule.length) {
                    cleanRules.push({ src: replaceRule[0], dest: replaceRule[1] });
                }
            }
        }
    }

    /**
     * Loads and displays example sentences
     * @param {string} data - Example sentences text content
     */
    function getBienThe(data) {
        const sentences = data.split('\n');
        $('#input_text').val(sentences[0]);

        const options = sentences.map(function (t) {
            return '<option>' + t + '</option>';
        });
        $('#bienthe').html(options);
        $('#bienthe').change(function (e) {
            const sentence = $(this).val();
            if (!sentence) {
                return;
            }
            $('#input_text').val(sentence);
            $('#form').submit();
            $('html, body').animate(
                {
                    scrollTop: $('#cky_output').offset().top,
                },
                300
            );
            e.preventDefault();
        });
    }

    /**
     * Starts the parsing process and renders visualizations
     */
    function start() {
        const grammarVal = $('#grammar').val();
        let inputTextVal = cleanInput($('#input_text').val());
        $('#input_text').val(inputTextVal);

        try {
            do_parse(grammarVal, inputTextVal);
            render_tree(grammarVal, inputTextVal, 'tree_output');

            $('html, body').animate(
                {
                    scrollTop: $('#cky_output').offset().top,
                },
                300
            );
        } catch (error) {
            alert('Error parsing: ' + error.message);
            console.error('Parse error:', error);
        }
    }

    /**
     * Initialize application on document ready
     */
    $(document).ready(function () {
        // Load grammar file
        $.get('grammar.txt', getGrammar).fail(function () {
            $.get(REMOTE_SRC + 'grammar.txt', getGrammar);
        });

        // Load example sentences
        $.get('bienthe.txt', getBienThe).fail(function () {
            $.get(REMOTE_SRC + 'bienthe.txt', getBienThe);
        });

        // Handle form submission
        $('#form').submit(function (e) {
            start();
            e.preventDefault();
        });
    });
})();
