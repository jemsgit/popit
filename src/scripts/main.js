(function(){
  let mouseDown = false;
  let prevTouchTagret = null;
  const audio = new Audio('scripts/pop.mp3');
  const audio1 = new Audio('scripts/pop.mp3');
  const audio2 = new Audio('scripts/pop.mp3');
  document.body.onmousedown = function(e)
  { 
    mouseDown = true;
    if(e.target.classList && e.target.classList.contains('pop-item')) {
      //onLabelMouseover(e);
    }
  }
    
  document.body.onmouseup = function()
  {
    mouseDown = false;
  }

  document.body.ontouchstart = function()
  {
    mouseDown = true;
    prevTouchTagret = null;
  };

  document.body.ontouchend = function()
  {
    mouseDown = false;
    prevTouchTagret = null;
  };

  function playSound() {
    if(!audio.paused){
      if(!audio1.paused) {
        audio2.play();
      } else {
        audio1.play();
      }
    } else {
      audio.play();
    }
  }

  function onCheckboxClick(e) {
    if (e.target.checked) {
      e.target.parentElement.classList.add('checked');
      playSound();
    } else {
      e.target.parentElement.classList.remove('checked');
      playSound();
    }
  }

  function onToucheMove(e) {
    let myLocation = e.changedTouches[0];
    let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    if(mouseDown && realTarget.classList && realTarget.classList.contains('pop-item')) {
      let checkbox = realTarget.querySelector('input');
      if(checkbox) {
        if(realTarget == prevTouchTagret) {
          return;
        }
        prevTouchTagret = realTarget;
        if(!checkbox.checked) {
          checkbox.checked = true;
          realTarget.classList.add('checked');
          playSound();
        } else {
          checkbox.checked = false;
          realTarget.classList.remove('checked');
          playSound();
        }
      }
    }
  }

  function onLabelMouseover(e) {
    if(mouseDown && e.target.classList && e.target.classList.contains('pop-item')) {
      let checkbox = e.target.querySelector('input');
      if(checkbox) {
        if(!checkbox.checked) {
          checkbox.checked = true;
          e.target.classList.add('checked');
          playSound();
        } else {
          checkbox.checked = false;
          e.target.classList.remove('checked');
          playSound();
        }
      }
    }
  }

  function resetAll() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    playSound();
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
    checkboxList.addEventListener('touchmove', onToucheMove);
  })
})()
