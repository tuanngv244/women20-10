


function handleClickAuthor(){
  const author = document.querySelector('.author');
  author.addEventListener('click', function(){

    document.querySelector('.author img').style.opacity = 0;
    document.querySelector('.author .show-action').style.opacity = 1
  })
}

handleClickAuthor()