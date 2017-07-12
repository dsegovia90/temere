$('#request-random-button').click(function(){
  $.post('/temere', function(data, status){
    console.log(data.text)
    $('#random-name-field').val(data.text)
  })
})