(function(){
  let scores = 0;
  let isMouseDown = false;
  let prevTouchTagret = null;
  const audioIn = new Audio('scripts/popin.mp3');
  const audioIn1 = new Audio('scripts/popin.mp3');
  const audioIn2 = new Audio('scripts/popin.mp3');

  const audioOut = new Audio('scripts/popout.mp3');
  const audioOut1 = new Audio('scripts/popout.mp3');
  const audioOut2 = new Audio('scripts/popout.mp3');

  let scoreEl = document.querySelector('#score-value');

  function updateScore() {
    scores++;
    scoreEl.innerText = scores.toString();
  }

  function playSound(isOut) {
    if(isOut){
      playSoundOut();
    } else {
      playSoundIn();
    }
  }

  function playSoundOut() {
    if(!audioOut.paused){
      if(!audioOut1.paused){
        audioOut2.play();
      } else {
        audioOut1.play();
      }
    } else {
      audioOut.play();
    }
  }

  function playSoundIn() {
    if(!audioIn.paused){
      if(!audioIn1.paused){
        audioIn2.play();
      } else {
        audioIn1.play();
      }
    } else {
      audioIn.play();
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
    let isChecked = checkbox.checked;
    if (!isChecked) {
      e.target.classList.add('checked');
      playSound(isChecked);
    } else {
      e.target.classList.remove('checked');
      playSound(isChecked);
    }
    updateScore();
  }

  function toggleElementWithAction(target, checkbox) {
    let isChecked = checkbox.checked;
    if(!isChecked) {
      checkbox.checked = true;
      target.classList.add('checked');
      playSound(isChecked);
    } else {
      checkbox.checked = false;
      target.classList.remove('checked');
      playSound(isChecked);
    }
    updateScore();
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
    playSound(true);
    checkboxes.forEach(item => {
      item.checked = false;
      item.parentElement.classList.remove('checked');
    })
  }

  let checkboxLists = document.querySelectorAll(".popit");
  let reset = document.querySelector('#reset');
  let body = document.querySelector("body");

  reset.addEventListener('click', resetAll);

  body.addEventListener('mousedown', onMouseDown);
  body.addEventListener('mouseup', onMouseUp);
  body.addEventListener('touchstart', onTouchstart);
  body.addEventListener('touchend', onTouchend);

  checkboxLists.forEach((checkboxList) => {
    checkboxList.addEventListener('mouseover', onLabelMouseover);
    checkboxList.addEventListener('touchmove', onToucheMove);
  });

  let donateContentEl = document.querySelector('.donate-content');

  document.querySelector('.donate > span').addEventListener('click', (e) => {
    donateContentEl.classList.toggle('hidden');
  })
})()
