export const makeid = (length, prefix, couponcount) => {
  var count = 1;
  var codes = [];
  if (couponcount) {
    count = couponcount;
  }
  let codelength = length - prefix.length;
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  generatecode(0);
  function generatecode(generatedcount) {
    for (var i = 0; i < codelength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = prefix.toUpperCase() + result.toUpperCase();
    codes.push(result);
    result = "";
    generatedcount = generatedcount + 1;
    if (count > generatedcount) {
      generatecode(generatedcount);
    }
  }
  return codes;
};

export function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

export function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
