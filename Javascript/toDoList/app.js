var itemArray = [];
var stdTimeOut = 2000;

//Loading the initial set of tasks as soon as the window is loaded;
window.addEventListener("load", () => {
  itemArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  for (let i = 0; i < itemArray.length; i++) {
    if (itemArray[i]["task"] == null || itemArray[i]["task"].length == 0) {
      continue;
    }
    if (itemArray[i]["deadline"] < Date.now()) {
      itemArray[i]["task"] = "";
      continue;
    }
    displayTheElement(i);
  }
});

function displayTheElement(i) {
  const elemInner = document.createElement("li");
  itemArray[i]["id"] = `${i + 1}`;
  var content = ``;
  content += `<div class="description">
            <p>${itemArray[i]["task"]}</p>
            <p>${itemArray[i]["deadline"]}</p>
        </div>
        <div class="changes">
            <div class="done" id='done_${i + 1}'>
                <button title="Completed" type="submit">&#10003;</button>
            </div>
            <div class="remove" id='remove_${i + 1}'>
                <button title="Scrapped" type="submit">&#10060;</button>
            </div>
        </div>`;
  elemInner.innerHTML = content;
  elemInner.classList.add("list-item");
  elemInner.classList.add("item-display");
  document.querySelector(".container__list").appendChild(elemInner);
  //adding an event listener to remove item if completed or task deleted
  document.querySelector(`#done_${i + 1}`).addEventListener("click", (e) => {
    itemArray.filter((e) => e["id"] == `${i + 1}`)["task"] = "";
    document.querySelector(".container__list").removeChild(elemInner);
    itemArray = itemArray.filter((e) => e["task"].length > 0);
    itemArray = itemArray.filter((e) => e["id"] != `${i + 1}`);
    localStorage.setItem("tasks", JSON.stringify(itemArray));
    toast("Task Done!");
  });
  document.querySelector(`#remove_${i + 1}`).addEventListener("click", (e) => {
    itemArray.filter((e) => e["id"] == `${i + 1}`)["task"] = "";
    document.querySelector(".container__list").removeChild(elemInner);
    itemArray = itemArray.filter((e) => e["task"].length > 0);
    itemArray = itemArray.filter((e) => e["id"] != `${i + 1}`);
    localStorage.setItem("tasks", JSON.stringify(itemArray));
    toast("Task Scrapped!");
  });
  localStorage.setItem("user", itemArray);
}

document.querySelector("#task_submit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector(".modal form");
  const task = document.querySelector("#todo_task");
  const deadline = document.querySelector("#todo_deadline");
  var js = {
    task: "Task : " + task.value,
    deadline: "Deadline : " + deadline.value,
    id: `${itemArray.length + 1}`,
  };
  task.value = "";
  deadline.value = "";
  itemArray.push(js);
  displayTheElement(itemArray.length - 1);
  closeModal();
  toast("New Task Added!");
  localStorage.setItem("tasks", JSON.stringify(itemArray));
});

document.querySelector("#reset").addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});

//adding the new task
function addItem() {
  document.querySelector(".modal").style.display = "flex";
}

function closeModal() {
  document.querySelector(".modal").style.display = "none";
}

//task completed or scrapped message displayed as a toast
function toast(message) {
  if (message == "Task Done!") {
    const elem = document.querySelector(".toast");
    elem.style.border = "3px solid green";
    elem.style.backgroundColor = "rgb(220, 255, 220)";
    elem.innerHTML = `<p>${message}</p>`;
    elem.style.opacity = "1";
    elem.style.right = "1%";
    elem.style.display = "flex";
    elem.style.gap = "2vw";
    const tl = document.createElement("button");
    tl.style.right = "2%";
    tl.innerHTML = "&#10060;";
    elem.appendChild(tl);
    document
      .querySelector(".toast button")
      .addEventListener("click", closeToast);
    setTimeout(closeToast, stdTimeOut);
  } else if (message == "New Task Added!") {
    const elem = document.querySelector(".toast");
    elem.style.border = "3px solid black";
    elem.style.backgroundColor = "gray";
    elem.innerHTML = `<p>${message}</p>`;
    elem.style.opacity = "1";
    elem.style.right = "1%";
    elem.style.display = "flex";
    elem.style.gap = "2vw";
    const tl = document.createElement("button");
    tl.style.right = "2%";
    tl.innerHTML = "&#10060;";
    elem.appendChild(tl);
    document
      .querySelector(".toast button")
      .addEventListener("click", closeToast);
    setTimeout(closeToast, stdTimeOut);
  } else {
    const elem = document.querySelector(".toast");
    elem.style.border = "3px solid red";
    elem.style.backgroundColor = "rgb(255, 220, 220)";
    elem.innerHTML = `<p>${message}</p>`;
    elem.style.opacity = "1";
    elem.style.right = "1%";
    const tl = document.createElement("button");
    tl.style.right = "2%";
    tl.innerHTML = "&#10060;";
    elem.style.display = "flex";
    elem.style.gap = "2vw";
    elem.appendChild(tl);
    document
      .querySelector(".toast button")
      .addEventListener("click", closeToast);
    setTimeout(closeToast, stdTimeOut);
  }
}

function closeToast() {
  const elem = document.querySelector(".toast");
  elem.style.opacity = "0";
  elem.style.right = "-1%";
}
