window.onload = function () {
  function keyEvent(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }
}

var inputId = getById("searchText")
var dataList = getById("dropList")
var resultDiv = getById("resultContainer")

inputId.onkeypress = function (e) {
  resultDiv.innerHTML = ""
  dataList.innerHTML = ""
  var inputText = getById("searchText").value
  if (e.keyCode !== 13) {
    getData(inputText, keyPressResult)
  } else
    getData(inputText, onSubmitResult)
}


/* Define callback argument as callback in getData function,
pass it as an argument in in getInput functions when calling getData*/

function getData(inputText, callback) {
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + inputText + "&format=json&callback=?"
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: callback,
    error: function () {
      alert("Error retrieving search results, please refresh the page");
    }
  });
}

function keyPressResult(result) {
  for (var j = 1; j < 9; j++) {
    var optionElement = createElement("option")
    optionElement.value = result[1][j]
    dataList.appendChild(optionElement)
  }
}

function onSubmitResult(result) {
  for (var i = 1; i < 9; i++) {

    var resultBox = $(
      '<div id="resultBox">' +
      '<a id="wikiAnchor" href="' + result[3][i] + '">' + result[1][i] + '</a>' +
      '<p id="descriptionP">' + result[2][i] + '</p>' +
      '</div>')
    resultDiv.appendChild(resultBox.get(0))
  }
}

function getById(element) {
  return document.getElementById(element)
}


function createElement(elTag) {
  return document.createElement(elTag)
}