const {ipcRenderer} = require('electron')
const {area} = require('Countable')
ipcRenderer.on('synchronous-message',(event, arg)=>{
  console.log(arg)
counter = function() {
  var value = $('#selected-file').val();

          if (value.length == 0) {
              $('#display_count').html(0);
              $('#word_left').html(arg);
              return;
          }
          var regex = /\s+/gi;
          var wordCount = value.trim().replace(regex, ' ').split(' ').length;
          $('#display_count').html(wordCount);
          $('#word_left').html(arg - wordCount);
};
      $(document).ready(function() {
        $('#display_count').click(counter);
        $('#selected-file').change(counter);
        $('#selected-file').keydown(counter);
        $('#selected-file').keypress(counter);
        $('#selected-file').keyup(counter);
        $('#selected-file').blur(counter);
        $('#selected-file').focus(counter);
      });
})
