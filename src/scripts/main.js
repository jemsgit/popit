(function(){
  let mouseDown = false;
  const audio = new Audio('/scripts/pop.mp3');
  const audio1 = new Audio('/scripts/pop.mp3');
  document.body.onmousedown = function()
  { 
    mouseDown = true;
  }
    
  document.body.onmouseup = function()
  {
    mouseDown = false;
  }

  function onCheckboxClick(e) {
    if (e.target.checked) {
      e.target.parentElement.classList.add('checked');
      audio.play();
    } else {
      e.target.parentElement.classList.remove('checked');
    }
  }

  function onLabelMouseover(e) {
    if(mouseDown && e.target.classList && e.target.classList.contains('pop-item')) {
      let checkbox = e.target.querySelector('input');
      if(checkbox) {
        if(!checkbox.checked) {
          checkbox.checked = true;
          e.target.classList.add('checked');
          if(!audio.paused){
            audio1.play();
          } else {
            audio.play();
          }
        } else {
          checkbox.checked = false;
          e.target.classList.remove('checked');
        }
      }
    }
  }

  function resetAll() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(item => {
      item.checked = false;
      item.parentElement.classList.remove('checked');
    })
  }

  let checkboxLists = document.querySelectorAll(".popit");
  let reset = document.querySelector('#reset')

  reset.addEventListener('click', resetAll);
  checkboxLists.forEach((checkboxList) => {
    checkboxList.addEventListener('change', onCheckboxClick);
    checkboxList.addEventListener('mouseover', onLabelMouseover);
  })
})()