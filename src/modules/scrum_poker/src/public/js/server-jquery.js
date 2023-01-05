document.addEventListener('DOMContentLoaded', function(event) {
  $.getScript("./js/common.js", function (data, textStatus, jqxhr) {
    console.log(data); // Data returned
    console.log(textStatus); // Success
    console.log(jqxhr.status); // 200
    console.log("Load was performed.");
  });

  $(function () {
    if ("id" in GET_INPUT) {
      $("#title").append(`_${GET_INPUT["id"]}`);
      $("#all").show();
      $("#help").hide();
      $("#copy-btn").hide();
      $("#copy-btn").click(function () {
        /* Get the text field */
        let ownerText = $("#txt-votacionOwner").text();
        let teamText = $("#txt-votacionTeam").text();
        let copyText = `${ownerText}\n${teamText}`;

        copyTextToClipboard(copyText);

        /* Alert the copied text */
        alert("Votación copiada al portapapeles");
      });

      $("#close-btn").click(function () {
        getData(`${STORAGE_GET_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
          (data) => {
            str = "";
            str += `${CLOSE_VOTATION}=1`;

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
      });

      $("#reset-btn").click(function () {
        $("#txt-votacion").text("");

        getData(`${STORAGE_RM_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
          (data) => {
            location.reload(); // force page reload
          }
        );
      });

      var t = setInterval(function () {
        getData(`${STORAGE_GET_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
          (data) => {
            console.log("clients START");
            console.log(data);
            console.log("clients END");
            $("#clients").empty();
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.innerHTML = "Nombre";
            tr.append(th);
            var th = document.createElement("th");
            th.innerHTML = "Voto";
            tr.append(th);
            $("#clients").append(tr);
            if (data) {
              data = JSON.parse(data);
              owner = "";
              ownerVote = "???";
              for (const [key, value] of Object.entries(data)) {
                $("#txt-reset").hide();
                if (key === CLOSE_VOTATION) {
                  $("#txt-close").hide();
                  $("#close-btn").hide();
                  $("#txt-reset").show();
                  continue;
                }
                if (key === OWNER_VOTATION) {
                  owner = value;
                  $("#txt-reset").show();
                  $("#txt-close").show();
                  $("#close-btn").show();
                  continue;
                }
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.innerHTML = key;
                tr.append(td); //Nombre
                td = document.createElement("td");
                td.innerHTML = value;
                tr.append(td); //Voto
                td = document.createElement("td");
                td.innerHTML =
                  '<input type="button" id="owner-btn" class="btn btn-lg btn-primary owner-btn" value="Owner"></input>';
                tr.append(td); //Owner button
                $("#clients").append(tr);
              }
              for (const [key, value] of Object.entries(data)) {
                if (key === owner) {
                  ownerVote = value;
                  break;
                }
              }

              $(".owner-btn").removeAttr("id");
              $(".owner-btn").each(function () {
                if (
                  $(this).parent().parent().children("td").first().html() ===
                  owner
                ) {
                  $(this).attr("id", "owner");
                }
              });
              $(".owner-btn").click(ownerFunc);

              updateVotation(data, ownerVote);
            }
          }
        );
      }, 2000);
    } else {
      $("#title").text(`MUST SET AN ID`);
    }
  });
})

function ownerFunc() {
  $(".owner-btn").removeAttr("id");
  $(this).attr("id", "owner");

  getData(`${STORAGE_GET_LINK}scrumpoker_${GET_INPUT["id"]}.json`).then(
    (data) => {
      str = "";
      str += `${OWNER_VOTATION}=${$(this)
        .parent()
        .parent()
        .children("td")
        .first()
        .html()}`;

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
