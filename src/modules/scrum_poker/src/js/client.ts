import $ from "jquery";

const STORAGE_GET_LINK = "https://storage.rada0722.repl.co/get?filename=";
const STORAGE_EDIT_LINK = "https://storage.rada0722.repl.co/edit?filename=";
const STORAGE_RM_LINK = "https://storage.rada0722.repl.co/rm?filename=";
const CLOSE_VOTATION = "VOTACION_CERRADA";
const OWNER_VOTATION = "OWNER";

let t: any;

async function addP(P: any) {
  console.log(`P: ${JSON.stringify(P)}`);
  console.log(`len: ${$("#P input").length / 4 + 1}`);
  const num = $("#P input").length / 4 + 1;

  const p = document.createElement("p");
  p.innerHTML = `[${P.categoria}]`;
  p.style.display = "inline";
  p.style.color = "white";
  p.style.fontSize = "18px";
  p.style.margin = "80px 0 0 0";
  $("#P").append(p);

  const q = document.createElement("q");
  q.innerHTML = `${P.Q}`;
  q.style.display = "inline";
  q.style.color = "white";
  q.style.fontSize = "24px";
  q.style.margin = "0 0 0 0";
  $("#P").append(q);

  let i = 1;
  P.A.forEach(function (A: any) {
    const div1 = document.createElement("div");
    div1.style.display = "flex";
    div1.style.flexDirection = "row";

    console.log(`A: ${JSON.stringify(A)}`);
    const a = document.createElement("input");
    a.style.display = "inline";
    a.style.marginTop = "10px";
    a.value = A;
    a.type = "radio";
    a.name = `Q${num}`;
    div1.append(a);

    const p = document.createElement("p");
    p.innerHTML = `Opcion ${i++}: '${A}'`;
    p.style.display = "inline";
    p.style.color = "black";
    p.style.fontSize = "20px";
    p.style.margin = "0 0 0 10px";
    div1.append(p);

    $("#P").append(div1);
  });
}

function enableButtons() {
  $("#XS-btn").prop("disabled", false);
  $("#S-btn").prop("disabled", false);
  $("#M-btn").prop("disabled", false);
  $("#L-btn").prop("disabled", false);
  $("#XL-btn").prop("disabled", false);

  $("#txt-conectar").hide();
  $("#txt-votar").show();
  $("#txt-esperar").hide();

  $("#XS-btn").on({
    mouseenter: enterColor,
    mouseleave: leaveColor,
  });
  $("#S-btn").on({
    mouseenter: enterColor,
    mouseleave: leaveColor,
  });
  $("#M-btn").on({
    mouseenter: enterColor,
    mouseleave: leaveColor,
  });
  $("#L-btn").on({
    mouseenter: enterColor,
    mouseleave: leaveColor,
  });
  $("#XL-btn").on({
    mouseenter: enterColor,
    mouseleave: leaveColor,
  });

  $("#XS-btn").css("background-color", "#845ac7");
  $("#S-btn").css("background-color", "#845ac7");
  $("#M-btn").css("background-color", "#845ac7");
  $("#L-btn").css("background-color", "#845ac7");
  $("#XL-btn").css("background-color", "#845ac7");

  clearInterval(t);
}

function enterColor() {
  $(this).css("background-color", "#a47ae7");
}

function leaveColor() {
  $(this).css("background-color", "#845ac7");
}

async function getData(url = "") {
  // Opciones por defecto estan marcadas con un *
  const response: any = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'omit', // include, *same-origin, omit
    headers: {},
  });
  return response.text(); // parses JSON response into native JavaScript objects
}

function updateVotation(data: { [key: string]: string }, owner: any) {
  let skipOwner = true;
  const votes: { [key: string]: number } = { XL: 0, L: 0, M: 0, S: 0, XS: 0 };
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

  const votesOwnerStr = `OWNER: ${owner}`;
  let votesTeamStr = `TEAM: `;

  for (const [key, value] of Object.entries(votes)) {
    if (value > 0) {
      votesTeamStr += `${(key + " ").repeat(value)}`;
    }
  }

  console.log(`votesTeamStr: "${votesTeamStr}"`);

  votesTeamStr = votesTeamStr.slice(0, -1);
}

function disableButtons(issueId: string) {
  $("#XS-btn").prop("disabled", true);
  $("#S-btn").prop("disabled", true);
  $("#M-btn").prop("disabled", true);
  $("#L-btn").prop("disabled", true);
  $("#XL-btn").prop("disabled", true);

  $("#txt-conectar").hide();
  $("#txt-votar").hide();
  $("#txt-esperar").show();

  t = setInterval(function () {
    getData(`${STORAGE_GET_LINK}scrumpoker_${issueId}.json`).then(
      (data_str: string) => {
        if (data_str == "") {
          updateVotation({}, "");
          enableButtons();
        }
        if (data_str) {
          const data: { [key: string]: string } = JSON.parse(data_str);
          let close = false;
          let owner = "";
          let ownerVote = "";
          for (const [key, value] of Object.entries(data)) {
            if (key === CLOSE_VOTATION) {
              close = true;
            }
            if (key === OWNER_VOTATION) {
              owner = value;
            }
          }
          for (const [key, value] of Object.entries(data)) {
            if (key === owner) {
              ownerVote = value;
            }
          }
          if (close) {
            updateVotation(data, ownerVote);
          } else {
            updateVotation({}, "");
          }
        }
      }
    );
  }, 900);
}

function addUser(issueId: string, vote: string, name: string) {
  disableButtons(issueId);
  getData(`${STORAGE_GET_LINK}scrumpoker_${issueId}.json`).then((data) => {
    console.log("data START");
    console.log(data);
    console.log("data END");
    let str = "";
    str += `${name}=${vote}`;
    if (data) {
      data = JSON.parse(data);
      for (const [key, value] of Object.entries(data)) {
        str += `&${key}=${value}`;
      }
    }
    getData(`${STORAGE_EDIT_LINK}scrumpoker_${issueId}.json&${str}`);
  });
}

function startup(issueId: string) {
  $("#all").show();
  $("#help").hide();
  $("#conectar-btn").click(function () {
    console.log(`nombre: '${$("#name").val()}'`);
    if ($("#name").val() === "") {
      return;
    }
    enableButtons();
    $("#conectar-btn").prop("disabled", true);
    $("#name").prop("disabled", true);
    const n = $("#name").val();
    if (n && typeof n === "string") {
      const name: string = n;

      $("#XS-btn").click(function () {
        addUser(issueId, "XS", name);
        $("#XS-btn").css("background-color", "green");
      });

      $("#S-btn").click(function () {
        addUser(issueId, "S", name);
        $("#S-btn").css("background-color", "green");
      });

      $("#M-btn").click(function () {
        addUser(issueId, "M", name);
        $("#M-btn").css("background-color", "green");
      });

      $("#L-btn").click(function () {
        addUser(issueId, "L", name);
        $("#L-btn").css("background-color", "green");
      });

      $("#XL-btn").click(function () {
        addUser(issueId, "XL", name);
        $("#XL-btn").css("background-color", "green");
      });
    }
  });
}

export default startup;
