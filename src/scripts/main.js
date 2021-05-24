(function(){
  let isMouseDown = false;
  let prevTouchTagret = null;
  const audio = new Audio('scripts/pop.mp3');
  const audio1 = new Audio('scripts/pop.mp3');
  const audio2 = new Audio('scripts/pop.mp3');

  function playSound() {
    if(!audio.paused){
      if(!audio1.paused){
        audio2.play();
      } else {
        audio1.play();
      }
    } else {
      audio.play();
    }
  }

  function isPopLabel(target) {
    return target.classList && target.classList.contains('pop-item');
  }

  function onTouchstart() {
    isMouseDown = true;
    prevTouchTagret = null;
  };

  function onTouchend() {
    isMouseDown = false;
    prevTouchTagret = null;
  };

  function onMouseDown(e) {
    isMouseDown = true;
    if(isPopLabel(e.target)) {
      onPopClick(e);
    }
  }

  function onMouseUp(){
    isMouseDown = false;
  }

  function onPopClick(e) {
    let checkbox = e.target.querySelector('input');
    if (!checkbox.checked) {
      e.target.classList.add('checked');
      playSound();
    } else {
      e.target.classList.remove('checked');
      playSound();
    }
  }

  function toggleElementWithAction(target, checkbox) {
    if(!checkbox.checked) {
      checkbox.checked = true;
      target.classList.add('checked');
      playSound();
    } else {
      checkbox.checked = false;
      target.classList.remove('checked');
      playSound();
    }
  }

  function onToucheMove(e) {
    let myLocation = e.changedTouches[0];
    let realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
    if(isMouseDown && isPopLabel(realTarget)) {
      let checkbox = realTarget.querySelector('input');
      if(checkbox) {
        if(realTarget == prevTouchTagret) {
          return;
        }
        prevTouchTagret = realTarget;
        toggleElementWithAction(realTarget, checkbox);
      }
    }
  }

  function onLabelMouseover(e) {
    const target = e.target;
    if(isMouseDown && isPopLabel(target)) {
      let checkbox = target.querySelector('input');
      if(!checkbox) {
        return;
      }
      toggleElementWithAction(target, checkbox);
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
  let reset = document.querySelector('#reset');
  let body = document.querySelector("body");

  reset.addEventListener('click', resetAll);

  checkboxLists.forEach((checkboxList) => {
    body.addEventListener('mousedown', onMouseDown);
    body.addEventListener('mouseup', onMouseUp);
    body.addEventListener('touchstart', onTouchstart);
    body.addEventListener('touchend', onTouchend);
    checkboxList.addEventListener('mouseover', onLabelMouseover);
    checkboxList.addEventListener('touchmove', onToucheMove);
  });
})()
