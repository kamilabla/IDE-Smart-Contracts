
import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { lintCode } from '../services/linterService.js'; // Import funkcji do komunikacji z backendem

const SolidityEditor = () => {
  const editorRef = useRef(null);
  const [lintResults, setLintResults] = useState([]); // Przechowywanie wyników lintera

  useEffect(() => {
    // Rejestracja języka Solidity
    monaco.languages.register({ id: 'solidity' });

    monaco.languages.setMonarchTokensProvider('solidity', {
      tokenizer: {
        root: [
          [/[A-Z][\w$]*/, 'type.identifier'],
          [/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
          [/[{}()\[\]]/, '@brackets'],
          [/0[xX][0-9a-fA-F']+[Ll]?/, 'number.hex'],
          [/".*"/, 'string'],
          [/\/\*/, 'comment', '@comment'], // Obsługa komentarzy wielowierszowych
          [/\/\/.*$/, 'comment'] // Obsługa komentarzy jednowierszowych
        ],

        comment: [
          [/[^\/*]+/, 'comment'], // Wszystko poza `*/` traktowane jako część komentarza
          [/\*\//, 'comment', '@pop'], // Koniec komentarza wielowierszowego, powrót do `@root`
          [/[\/*]/, 'comment'] // Obsługa `*` i `/` wewnątrz komentarza
        ],

        whitespace: [[/\s+/, 'white']],
      },

      keywords: ['contract', 'function', 'address', 'mapping', 'public', 'private']
    });
    

    // Inicjalizacja edytora Monaco
    editorRef.current = monaco.editor.create(document.getElementById('editor'), {
      language: 'solidity',
      theme: 'vs-dark',
      automaticLayout: true,
    });

    const editor = editorRef.current;

    // Obsługa zmian w edytorze
    const handleEditorChange = async () => {
      const code = editor.getValue();

      try {
        const results = await lintCode(code); // Wysyłanie kodu do Solhint
        setLintResults(results);

        // Dodaj błędy do Monaco Editor
        monaco.editor.setModelMarkers(editor.getModel(), 'solidity', results.map(result => ({
          startLineNumber: result.line,
          startColumn: result.column,
          endLineNumber: result.line,
          endColumn: result.column + 1,
          message: result.message,
          severity: result.severity === 'error' ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
        })));
      } catch (error) {
        console.error('Error running linter:', error);
      }
    };

    editor.onDidChangeModelContent(handleEditorChange); // Analiza po każdej zmianie

    return () => editor.dispose(); // Czyszczenie przy unmount
  }, []);

  return (
    <div>
      <div id="editor" style={{ height: '500px', width: '100%' }}></div>
      <div>
        <h3>Lint Results</h3>
        {lintResults.length === 0 ? (
          <p>No issues found!</p>
        ) : (
          <ul>
            {lintResults.map((result, index) => (
              <li key={index}>
                <strong>{result.message}</strong> (Line: {result.line}, Column: {result.column})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SolidityEditor;

























// import React, { useEffect, useRef } from 'react';
// import * as monaco from 'monaco-editor';

// const SolidityEditor = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     // Create the editor instance and set up language configuration
//     editorRef.current = monaco.editor.create(document.getElementById('editor'), {
//       language: 'solidity',
//       theme: 'vs-dark',
//       automaticLayout: true,
//     });

//     // Define Solidity language configuration for Monaco
//     monaco.languages.register({ id: 'solidity' });
//     monaco.languages.setMonarchTokensProvider('solidity', {
//       tokenizer: {
//         root: [
//           [/[A-Z][\w$]*/, 'type.identifier'],
//           [/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
//           { include: '@whitespace' },
//           [/[{}()\[\]]/, '@brackets'],
//           [/@[a-zA-Z]\w*/, 'tag'],
//           [/0[xX][0-9a-fA-F']+[Ll]?/, 'number.hex'],
//           [/[+-]?\d+(\.\d+)?([eE][+-]?\d+)?/, 'number.float'],
//           [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
//           [/"([^"\\]|\\.)*"/, 'string'],
//           [/'[^\\']'/, 'string'],
//           [/'.'/, 'string.invalid'],
//           [/\/\*/, 'comment', '@comment'],
//           [/\/\/.*$/, 'comment']
//         ],
//         whitespace: [[/\s+/, 'white']]
//       },
//       keywords: ['contract', 'function', 'address', 'mapping', 'public', 'private']
//     });

//     // Clean up the editor instance on component unmount
//     return () => editorRef.current.dispose();
//   }, []);

//   return <div id="editor" style={{ height: "500px", width: "100%" }} />;
// };

// export default SolidityEditor;
