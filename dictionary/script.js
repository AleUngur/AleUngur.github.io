var dictionary = [];

function addWord() {
  var word = document.getElementById("word-input").value;
  dictionary.push(word);
  document.getElementById("word-input").value = "";
  console.log(dictionary);
}

function searchWord() {
  var wordToSearch = document.getElementById("search-input").value;
  var found = -1;
  for (var i = 0; i < dictionary.length; ++i) {
    if (wordToSearch.localeCompare(dictionary[i]) == 0) {
      found = 1;
    }
  }
  if (found == -1) {
    message(false);
  } else if (found == 1) {
    message(true);
  }
  document.getElementById("search-input").value = "";
}

function message(isAdded) {
  var div = document.getElementById("message-container");
  var mess = document.getElementById("message");
  if (isAdded == true) {
    mess.innerHTML = "The word is already in the dictionary!";
  } else if (isAdded == false) {
    mess.innerHTML = "The word is not in the dictionary!";
  }
  div.appendChild(mess);
}

//preventing the page to refresh after pushing the buttons
/*var submitForm = document.getElementById("submit-form");
var searchForm = document.getElementById("search-form");
function handleForm(event) {
  event.preventDefault();
}
submitForm.addEventListener("submit", handleForm);
searchForm.addEventListener("submit", handleForm);
*/
