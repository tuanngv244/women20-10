function handleClickAuthor() {
  const author = document.querySelector(".author");
  const music = document.querySelector(".music");
  author.addEventListener("click", function () {
    document.querySelector(".author img").style.opacity = 0;
    document.querySelector(".author .show-action").style.opacity = 1;
    music.volume = 1;
    music.play();
  });
}

handleClickAuthor();
