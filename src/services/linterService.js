export async function lintCode(sourceCode) {
    const response = await fetch('http://localhost:5000/api/lint', {   // komunikacja z backendem
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceCode }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to lint code');
    }
  
    const lintResults = await response.json();
    return lintResults;
  }
  