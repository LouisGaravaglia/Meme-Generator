const url = document.querySelector("#link");
const topText = document.querySelector("#topText");
const bottomText = document.querySelector("#bottomText");
const submitBtn = document.querySelector(".btn");
const memeContainer = document.querySelector(".meme-container");
const memeArray = JSON.parse(localStorage.getItem("memes")) || [];

window.addEventListener("load", (event) => {
  for (var i = 0; i < memeArray.length; i++) {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("main");
    ////////////////ADDING A DATA ATTRIBUTE TO GIVE UNIQUE KEY TO MATCH TO THE LOCAL STORAGE ID: VALUE
    mainDiv.setAttribute("data-id", i);

    let div = document.createElement("div");
    div.innerHTML = memeArray[i].img;
    div.classList.add("meme");

    let top = document.createElement("p");
    top.innerText = memeArray[i].top;
    top.classList.add("top-text");

    let bottom = document.createElement("p");
    bottom.innerText = memeArray[i].bottom;
    bottom.classList.add("bottom-text");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "REMOVE";
    deleteBtn.classList.add("delete-btn");

    div.append(top);
    div.append(bottom);
    mainDiv.append(div);
    mainDiv.append(deleteBtn);
    memeContainer.append(mainDiv);
  }

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
      //////////////////ADD UNIQUE DATA ID TO USE AS A VALUE TO MATCH AGAINS THE UNIQUE KEY: ID IN THE LOCAL STORAGE OBJECT
      let itemKey = item.parentElement.getAttribute("data-id");
      ////////////////PARSE FROM THE STORAGE TO THEN ITERATE OVER TO FIND THE DELETED ONE
      let parsed = JSON.parse(localStorage.memes);

      ////////////////ITERATE OVER THE PARSED ARRAY AND DELETE THE MATCHING ONE FROM THE DELETE BUTTON
      for (var i = 0; i < memeArray.length; i++) {
        if (parsed[i].id == itemKey) {
          item.parentElement.remove();
          parsed.splice(i, 1);
          /////////////////////////////////////////////LOOP TO RELABEL IDS SINCE I MAY HAVE DELETED ONE IN THE MIDDLE AND THEY NEED TO BE CONSECUTIVE
          for (var i = 0; i < parsed.length; i++) {
            parsed[i].id = i;
          }
        }
      }
      ///////////UPDATED LOCAL STORAGE SO THAT IT HAS THE UP TO DATE IDS IN CASE THE USER DELETES ANOTHER
      localStorage.setItem("memes", JSON.stringify(parsed));
      ////////RE LOADS THE PAGE SO THAT IT HAS THE MOST UP TO DATE PHOTOS WITH UNIQUE IDS
      location.reload();
    });
  });
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault;

  let div = document.createElement("div");
  div.innerHTML = `<img src="${url.value}" alt="Meme photo">`;

  let top = document.createElement("p");
  top.innerText = topText.value;

  let bottom = document.createElement("p");
  bottom.innerText = bottomText.value;

  ////////////////SAVE TO LOCAL STORAGE
  memeArray.push({
    id: "",
    img: div.innerHTML,
    top: top.innerText,
    bottom: bottom.innerText,
  });

  ////////////////CREATE UNIQUE KEY VALUE FOR EACH ITEM IN THE LOCAL STORAGE ARRAY.
  for (var i = 0; i < memeArray.length; i++) {
    memeArray[i].id = i;
  }
  localStorage.setItem("memes", JSON.stringify(memeArray));

  ////////////////PREVENT DUPLICATES FROM APPEARING WHEN I LOAD THEM FROM THE ABOVE ON WINDOW LOAD EVENT FROM GET FROM STORAGE
  memeContainer.innerHTML = "";
});
