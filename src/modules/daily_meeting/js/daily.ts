import $ from "jquery";

const STORAGE_GET_LINK = "https://storage.rada0722.repl.co/get?filename=";
const STORAGE_EDIT_LINK = "https://storage.rada0722.repl.co/edit?filename=";
const STORAGE_LIST_ADD_LINK =
  "https://storage.rada0722.repl.co/editAdd?filename=";
const STORAGE_LIST_RM_LINK =
  "https://storage.rada0722.repl.co/editRm?filename=";
const STORAGE_RM_LINK = "https://storage.rada0722.repl.co/rm?filename=";

let _needClear = false;
let _started = false;
let _pos = 0;
let _countdownTimer = 0;
let _countdownTime = 0;
let _countdownDir = true;
let _countdownMax = 0;

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

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

async function reorder_(celda: string, data: { [key: string]: string[] }) {
  const order = shuffle(data.participants);
  $("#order").empty();
  let pos = 0;
  _countdownMax = data.participants.length - 1;
  for (const e of order) {
    const data2_str: string = await getData(
      `${STORAGE_GET_LINK}issues_pendientes.json`
    );

    const p = document.createElement("p");
    p.innerHTML = `${e}`;
    p.style.display = "block";
    p.style.fontWeight = "900";
    p.style.fontSize = "xx-large";
    p.setAttribute("id", `pos_${pos}`);
    $("#order").append(p);

    const div = document.createElement("div");
    div.style.display = "block";
    div.style.fontWeight = "900";
    div.style.fontSize = "xx-large";
    div.setAttribute("id", `div_pos_${pos}`);

    if (data2_str != "") {
      const data2: { [key: string]: string[] } = JSON.parse(data2_str);

      const row2 = document.createElement("div");
      row2.className = "row";
      div.append(row2);

      type columns2_t = {
        name: string,
        element: HTMLParagraphElement | null
      };
      let columns2: {pendientes: columns2_t, en_progreso: columns2_t, completados: columns2_t} = {
          pendientes: {name:"Pendientes",  element: null},
          en_progreso: {name:"En progreso", element: null},
          completados: {name:"Completados", element: null}
      };
      for(const c of Object.values(columns2))
      {
        c.element = document.createElement("div");
        c.element.className = "col-md-4";
        row2.append(c.element);

        const p2 = document.createElement("p");
        p2.innerHTML = c.name;
        p2.style.display = "block";
        p2.style.fontWeight = "900";
        p2.style.fontSize = "x-large";
        c.element.append(p2);
      }

      if (data2[`${e}`]) {
        data2[`${e}`].forEach((d) => {
          const p3 = document.createElement("p");
          p3.innerHTML = `${d}`;
          p3.style.display = "block";
          p3.style.fontWeight = "900";
          p3.style.fontSize = "large";
          if(d.includes("[Closed]") || d.includes("[Resolved]"))
          {
            columns2.completados.element?.append(p3);
          }
          else if(d.includes("[In Progress]"))
          {
            columns2.en_progreso.element?.append(p3);
          }
          else // if(d.includes("[Open]") || d.includes("[Reopened]"))
          {
            columns2.pendientes.element?.append(p3);
          }
        });
      }
    }
    $("#order").append(div);
    $(`#div_pos_${pos}`).hide();

    pos += 1;
  }
}

function reorder(celda: string) {
  $("#order").empty();
  getData(`${STORAGE_GET_LINK}daily_${celda}.json`).then((data_str: string) => {
    if (data_str != "") {
      const data: { [key: string]: string[] } = JSON.parse(data_str);
      reorder_(celda, data);
    }
  });
}

function update_(celda: string, id: string, data: { [key: string]: string[] }) {
  $(`#${id}`).empty();
  data[id].forEach((e) => {
    const p = document.createElement("p");
    p.innerHTML = `${e}`;
    p.style.display = "inline";
    $(`#${id}`).append(p);

    const b = document.createElement("button");
    b.innerHTML = `-`;
    b.className = "button-icon-blue";
    b.setAttribute(id, `${e}`);
    $(`#${id}`).append(b);

    const br = document.createElement("br");
    $(`#${id}`).append(br);
  });

  $(".button-icon-blue").click(function () {
    getData(`${STORAGE_GET_LINK}daily_${celda}.json`).then(
      async (data_str: string) => {
        if (data_str != "") {
          const idValue = this.getAttribute(id);
          const str = `${id}=${idValue}`;
          getData(`${STORAGE_LIST_RM_LINK}daily_${celda}.json&${str}`).then(
            async () => {
              await new Promise((r) => setTimeout(r, 1000));
              update(celda, id);
            }
          );
        }
      }
    );
  });
}

function update(celda: string, id: string) {
  $(`#${id}`).empty();
  getData(`${STORAGE_GET_LINK}daily_${celda}.json`).then((data_str: string) => {
    if (data_str != "") {
      const data: { [key: string]: string[] } = JSON.parse(data_str);
      update_(celda, id, data);
      if (id == "participants") {
        reorder_(celda, data);
      }
    }
  });
}

function inputClear(id: string) {
  $(`#${id}-txt`).val("");
  _needClear = true;
}

function add(celda: string, id: string) {
  getData(`${STORAGE_GET_LINK}daily_${celda}.json`).then(
    async (data_str: string) => {
      if (data_str != "") {
        const str = `${id}=${$(`#${id}-txt`).val()}`;
        getData(`${STORAGE_LIST_ADD_LINK}daily_${celda}.json&${str}`).then(
          async () => {
            await new Promise((r) => setTimeout(r, 1000));
            update(celda, id);
            inputClear(id);
          }
        );
      }
    }
  );
}

function disableOuterInteraction() {
  $("#reorder-btn").hide();
  $("#start-btn").hide();
  $("#timer-settings").hide();
  $("#prev-btn").show();
  $("#next-btn").show();
  $("#end-btn").show();

  $(".button-icon-blue").prop("disabled", true);
  $(".button-icon-blue").addClass("disabled");
  $(".button-icon-red").prop("disabled", true);
  $(".button-icon-red").addClass("disabled");

  $(".input").prop("disabled", true);
  $(".button-icon-red").addClass("disabled");
}

function enableOuterInteraction() {
  $("#reorder-btn").show();
  $("#start-btn").show();
  $("#timer-settings").show();
  $("#prev-btn").hide();
  $("#next-btn").hide();
  $("#end-btn").hide();

  $(".button-icon-blue").prop("disabled", false);
  $(".button-icon-blue").removeClass("disabled");
  $(".button-icon-red").prop("disabled", false);
  $(".button-icon-red").removeClass("disabled");

  $(".input").prop("disabled", false);
  $(".button-icon-red").removeClass("disabled");
}

function unselect() {
  $(`.selected`).removeClass("selected");
  $(`.selected2`).hide();
  $(`.selected2`).removeClass("selected2");
}

function select() {
  unselect();
  $(`#pos_${_pos}`).addClass("selected");
  $(`#div_pos_${_pos}`).show();
  $(`#div_pos_${_pos}`).addClass("selected2");
}

function countdownCallback() {
  // Find the distance between now and the count down date
  console.log("COUNT");
  let str = "";
  if (_countdownDir) {
    _countdownTime -= 1000;
    if (_countdownTime <= 0) {
      _countdownDir = false;
      $("#countdown").css("color", "red");
    }
  } else {
    _countdownTime += 1000;
    str += "-";
  }

  const distance = _countdownTime;

  // Time calculations for days, hours, minutes and seconds
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  str += hours + "h " + minutes + "m " + seconds + "s ";
  $("#countdown").html(str);
}

function onStartup(celda: string) {
  reset(false);

  $("#participants-btn").unbind("click");
  $("#participants-btn").click(function () {
    add(celda, "participants");
  });

  $("#criticals-btn").unbind("click");
  $("#criticals-btn").click(function () {
    add(celda, "criticals");
  });

  $("#pendings-btn").unbind("click");
  $("#pendings-btn").click(function () {
    add(celda, "pendings");
  });

  $("#informations-btn").unbind("click");
  $("#informations-btn").click(function () {
    add(celda, "informations");
  });

  $("#reorder-btn").unbind("click");
  $("#reorder-btn").click(function () {
    reorder(celda);
  });

  $("#start-btn").unbind("click");
  $("#start-btn").click(function () {
    disableOuterInteraction();
    _pos = 0;
    _started = true;
    select();
    const val_h = $("#countdown_h-txt").val();
    const val_m = $("#countdown_m-txt").val();
    const val_s = $("#countdown_s-txt").val();
    if (
      val_h &&
      typeof val_h === "string" &&
      val_m &&
      typeof val_m === "string" &&
      val_s &&
      typeof val_s === "string"
    ) {
      _countdownTime =
        parseInt(val_h) * 60 * 60 * 1e3 +
        parseInt(val_m) * 60 * 1e3 +
        parseInt(val_s) * 1e3;
      console.log(`_countdownTime: ${_countdownTime}`);
    }
    _countdownDir = true;
    countdownCallback();
    $("#countdown").css("color", "green");
    clearInterval(_countdownTimer);
    _countdownTimer = setInterval(countdownCallback, 1000);
  });

  $("#prev-btn").unbind("click");
  $("#prev-btn").click(function () {
    if (_pos > 0) {
      _pos -= 1;
      select();
    }
  });

  $("#next-btn").unbind("click");
  $("#next-btn").click(function () {
    console.log(_countdownMax);
    if (_pos < _countdownMax) {
      _pos += 1;
      select();
    }
  });

  $("#end-btn").unbind("click");
  $("#end-btn").click(function () {
    reset(true);
  });

  const cd = $("#countdown");
  cd.css("font-weight", "900");
  cd.css("font-size", "xx-large");

  $("#prev-btn").hide();
  $("#next-btn").hide();
  $("#end-btn").hide();

  update(celda, "participants");
  update(celda, "criticals");
  update(celda, "pendings");
  update(celda, "informations");
}

function needClear(): boolean {
  const ret = _needClear;
  _needClear = false;
  return ret;
}

function reset(keepCountdown: boolean): void {
  if(!keepCountdown) {
    $("#countdown").html("");
  }
  unselect();
  enableOuterInteraction();
  clearInterval(_countdownTimer);
}

export default {
  onStartup,
  needClear,
};
