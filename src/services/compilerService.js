import solc from 'solc';

export function compileContract(sourceCode) {
  const input = {
    language: 'Solidity',
    sources: { 'MyContract.sol': { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['*'] } } }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  return output;
}
