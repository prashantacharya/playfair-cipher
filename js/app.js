let plainText = 'Default';

function fillTable(key) {
  let data = encrypt({
    key: key.toUpperCase(),
    plainText: plainText.toUpperCase()
  });

  console.log(data);
  let playfairTableItem = document.querySelectorAll('.table-item');
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      playfairTableItem[i * 5 + j].innerHTML = data.playfairMatrix[i][j];
    }
  }
}

fillTable('keyword');
