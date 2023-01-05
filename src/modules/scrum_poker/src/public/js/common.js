var STORAGE_GET_LINK = "https://storage.rada0722.repl.co/get?filename=";
var STORAGE_EDIT_LINK = "https://storage.rada0722.repl.co/edit?filename=";
var STORAGE_RM_LINK = "https://storage.rada0722.repl.co/rm?filename=";
var GET_INPUT_STR = "";
var GET_INPUT = "";//JSON.parse(GET_INPUT_STR);
var POST_INPUT = "";//JSON.parse(POST_INPUT_STR);
var CLOSE_VOTATION = "VOTACION_CERRADA";
var OWNER_VOTATION = "OWNER";

async function log(msg) {
  var logs;
  do {
    logs = document.getElementById("logs");
    if (!logs) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } while (!logs);

  var el = document.createElement("p");
  el.innerHTML = `log: ${msg}`;
  el.style.color = "red";
  el.style.fontSize = "10px";
  logs.appendChild(el);
}

async function getData(url = "") {
  // Opciones por defecto estan marcadas con un *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'omit', // include, *same-origin, omit
    headers: {},
  }).catch(function (text) {});
  return response.text(); // parses JSON response into native JavaScript objects
}

function updateVotation(data, owner) {
  skipOwner = true;
  let votes = { XL: 0, L: 0, M: 0, S: 0, XS: 0 };
  for (const [key, value] of Object.entries(data)) {
    if (key === CLOSE_VOTATION) continue;
    if (key === OWNER_VOTATION) continue;
    if (skipOwner && value == owner) {
      skipOwner = false;
      continue;
    }
    votes[value]++;
  }

  console.log(`votes: `);
  console.log(votes);

  let votesOwnerStr = `OWNER: ${owner}`;
  let votesTeamStr = `TEAM: `;

  for (const [key, value] of Object.entries(votes)) {
    if (value > 0) {
      votesTeamStr += `${(key + " ").repeat(value)}`;
    }
  }

  console.log(`votesTeamStr: "${votesTeamStr}"`);

  votesTeamStr = votesTeamStr.slice(0, -1);

  $("#txt-votacionOwner").text(votesOwnerStr);
  $("#txt-votacionTeam").text(votesTeamStr);
  $("#copy-btn").show();
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
