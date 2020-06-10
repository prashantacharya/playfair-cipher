const characters = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
let playfairMatrix = []; // -> 5 x 5

function fillPlayfairMatrix(key) {
  key = key.replace('J', 'I');
  let matrix = [...new Set([...key.split(''), ...characters.split('')])];
  while (matrix.length) {
    playfairMatrix.push(matrix.splice(0, 5));
  }

  return playfairMatrix;
}

function createPairs(plainText) {
  plainText = plainText.replace('J', 'I');
  const SPT = plainText.split(''); // -> splitted plain text
  const pairs = [];
  for (let i = 0; i < plainText.length; i += 2) {
    if (SPT[i] === SPT[i + 1]) {
      pairs.push([SPT[i], 'X']);
      i--;
    } else {
      if (SPT[i + 1] == undefined) pairs.push([SPT[i], 'Z']);
      else pairs.push([SPT[i], SPT[i + 1]]);
    }
  }
  return pairs;
}

function getPosition(character) {
  for (let i = 0; i < playfairMatrix.length; i++) {
    for (let j = 0; j < playfairMatrix[i].length; j++) {
      if (character == playfairMatrix[i][j]) return [i, j];
    }
  }
}

function mapPairs(pair) {
  const [rowA, columnA] = getPosition(pair[0]);
  const [rowB, columnB] = getPosition(pair[1]);
  if (rowA === rowB) {
    return [
      playfairMatrix[rowA][(columnA + 1) % 5],
      playfairMatrix[rowB][(columnB + 1) % 5]
    ];
  } else if (columnA === columnB) {
    return [
      playfairMatrix[(rowA + 1) % 5][columnA],
      playfairMatrix[(rowB + 1) % 5][columnB]
    ];
  } else {
    return [playfairMatrix[rowA][columnB], playfairMatrix[rowB][columnA]];
  }
}

function encrypt({ key, plainText }) {
  fillPlayfairMatrix(key);

  let pairs = createPairs(plainText);
  let mappedPairs = [];
  for (let i = 0; i < pairs.length; i++) {
    mappedPairs.push(mapPairs(pairs[i]));
  }

  let cipherText = '';
  mappedPairs.forEach(pair => {
    pair.forEach(character => {
      cipherText += character;
    });
    cipherText += ' ';
  });

  cipherText = cipherText.trim();

  return { playfairMatrix, cipherText, pairs };
}

console.log(encrypt({ key: 'KEYYWORD', plainText: 'INSTRUMENTS' }));
