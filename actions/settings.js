'use strict';

var ipc = require('ipc')

var closeE1 = document.querySelector('.close')
closeE1.addEventListener('click',function(e){
  ipc.send('close-settings-window')
})
