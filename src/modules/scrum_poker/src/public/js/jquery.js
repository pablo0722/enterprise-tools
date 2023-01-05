async function addP(P) {
  console.log(`P: ${JSON.stringify(P)}`);
  console.log(`len: ${$("#P input").length / 4 + 1}`);
  num = $("#P input").length / 4 + 1;

  var p = document.createElement("p");
  p.innerHTML = `[${P.categoria}]`;
  p.style.display = "inline";
  p.style.color = "white";
  p.style.fontSize = "18px";
  p.style.margin = "80px 0 0 0";
  $("#P").append(p);

  var p = document.createElement("q");
  p.innerHTML = `${P.Q}`;
  p.style.display = "inline";
  p.style.color = "white";
  p.style.fontSize = "24px";
  p.style.margin = "0 0 0 0";
  $("#P").append(p);

  i = 1;
  P.A.forEach(function (A) {
    var div1 = document.createElement("div");
    div1.style.display = "flex";
    div1.style.flexDirection = "row";

    console.log(`A: ${JSON.stringify(A)}`);
    var a = document.createElement("input");
    a.style.display = "inline";
    a.style.marginTop = "10px";
    a.value = A;
    a.type = "radio";
    a.name = `Q${num}`;
    div1.append(a);

    var p = document.createElement("p");
    p.innerHTML = `Opcion ${i++}: '${A}'`;
    p.style.display = "inline";
    p.style.color = "black";
    p.style.fontSize = "20px";
    p.style.margin = "0 0 0 10px";
    div1.append(p);

    $("#P").append(div1);
  });
}

var t;

document.addEventListener('DOMContentLoaded', function(event) {
  jQuery($(function () {
    if ("id" in GET_INPUT) {
      $("#title").append(`_${GET_INPUT["id"]}`);
      $("#all").show();
      $("#help").hide();
      $("#conectar-btn").click(function () {
        log(`nombre: '${$("#name").val()}'`);
        if ($("#name").val() === "") {
          return;
        }
        enableButtons();
        $("#conectar-btn").prop("disabled", true);
        $("#name").prop("disabled", true);
        var name = $("#name").val();

        $("#XS-btn").click(function () {
          addUser("XS", name);
          $("#XS-btn").css("background-color", "green");
        });

        $("#S-btn").click(function () {
          addUser("S", name);
          $("#S-btn").css("background-color", "green");
        });

        $("#M-btn").click(function () {
          addUser("M", name);
          $("#M-btn").css("background-color", "green");
        });

        $("#L-btn").click(function () {
          addUser("L", name);
          $("#L-btn").css("background-color", "green");
        });

        $("#XL-btn").click(function () {
          addUser("XL", name);
          $("#XL-btn").css("background-color", "green");
        });
      });
    } else {
      $("#title").text(`MUST SET AN ID`);
    }
  }));
})

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

function disableButtons() {
  $("#XS-btn").prop("disabled", true);
  $("#S-btn").prop("disabled", true);
  $("#M-btn").prop("disabled", true);
  $("#L-btn").prop("disabled", true);
  $("#XL-btn").prop("disabled", true);

  $("#txt-conectar").hide();
  $("#txt-votar").hide();
  $("#txt-esperar").show();

  t = setInterval(function () {
    getData(`${STORAGE_GET_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
      (data) => {
        if (data == "") {
          updateVotation("", "");
          enableButtons();
        }
        if (data) {
          data = JSON.parse(data);
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
            updateVotation("", "");
          }
        }
      }
    );
  }, 900);
}

function addUser(vote, name) {
  disableButtons();
  getData(`${STORAGE_GET_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
    (data) => {
      console.log("data START");
      console.log(data);
      console.log("data END");
      str = "";
      str += `${name}=${vote}`;
      if (data) {
        data = JSON.parse(data);
        for (const [key, value] of Object.entries(data)) {
          str += `&${key}=${value}`;
        }
      }
      getData(
        `${STORAGE_EDIT_LINK}scrumpoker_${GET_INPUT["id"]}.json&${str}`
      ).then((data_2) => {});
    }
  );
}
