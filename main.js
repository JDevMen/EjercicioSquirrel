const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

let array = [];
let table = document.getElementById("table").getElementsByTagName("tbody")[0];
let content = [];
let typesOfEvents = [];

fetch(url)
  .then((res) => res.json())
  .then((resp) => {
    array = resp;

    array.forEach((contenido, index) => {
      let newRow = table.insertRow();
      let cell1 = newRow.insertCell();
      let cell2 = newRow.insertCell();
      let cell3 = newRow.insertCell();

      let events = contenido.events;
      let squirrel = contenido.squirrel;
      let ar = [events, squirrel];
      content.push(ar);

      cell1.outerHTML = `<th>${index + 1}</th>`;
      cell2.innerHTML = events.join(", ");
      cell3.innerHTML = squirrel;
      if (squirrel) newRow.className = "table-danger";
    });

    content.forEach((element) => {
      element[0].forEach((eve) => {
        if (!typesOfEvents.includes(eve)) {
          typesOfEvents.push(eve);
        }
      });
    });

    typesOfEvents.forEach((element, index) => {
      let array = [];
      array.push(element);
      //True negatives
      array.push(0);
      //False positives
      array.push(0);
      //False negatives
      array.push(0);
      //True positives
      array.push(0);

      typesOfEvents[index] = array;
    });

    typesOfEvents.forEach((element) => {
      content.forEach((contenido) => {
        let currentContent = contenido[0];
        let isSquirrel = contenido[1];
        if (!currentContent.includes(element[0])) {
          //Caso true negative
          if (!isSquirrel) {
            element[1]++;
          } else {
            //Caso false positives
            element[2]++;
          }
        } else {
          //Caso false negative
          if (!isSquirrel) {
            element[3]++;
          } else {
            //Caso true positive
            element[4]++;
          }
        }
      });
    });

    let mcc = document.getElementById("mcc table");

    let mccArray = [];
    typesOfEvents.forEach((tipo, i) => {
      let fila = [];
      fila.push(tipo[0]);

      let TN = tipo[1];
      let FP = tipo[2];
      let FN = tipo[3];
      let TP = tipo[4];

      let mccFormula =
        (TP * TN - FP * FN) /
        Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));

      fila.push(mccFormula);
      mccArray.push(fila);
    });

    mccArray.sort(function (a, b) {
      return b[1] - a[1];
    });

    mccArray.forEach((element, i) => {
      let newRow = mcc.insertRow();
      let cell1 = newRow.insertCell();
      let cell2 = newRow.insertCell();
      let cell3 = newRow.insertCell();

      cell1.outerHTML = `<th>${i + 1}</th>`;
      cell2.innerHTML = element[0];
      cell3.innerHTML = element[1];
    });
  });
