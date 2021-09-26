const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

  let array = [];
  let table = document.getElementById("table");

fetch(url)
  .then((res) => res.json())
  .then((resp) => {
    array = resp;
    console.log("Response", resp);
    console.log("Es un array? ",Array.isArray(array));
    
    array.forEach((contenido,index) => {
      let newRow = table.insertRow();
      let cell1 = newRow.insertCell();
      let cell2 = newRow.insertCell();
      let cell3 = newRow.insertCell();

      cell1.innerHTML = index+1;
      cell2.innerHTML = contenido.events.join(', ');
      cell3.innerHTML = contenido.squirrel;
    });
  });

  

  // let table = document.getElementById("table");
  // let row =  table.insertRow();
  // let cell1 = row.insertCell();
  // let cell2 = row.insertCell();
  // let cell3 = row.insertCell();

  // cell1.innerHTML = "4";
  // cell2.innerHTML = ["Prueba","Test","algo"];
  // cell3.innerHTML = false;
  // console.log(table);

  
  