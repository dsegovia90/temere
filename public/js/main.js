$('#request-random-button').click(() => {
  $.post('/temere', (data) => {
    console.log(data.text);
    $('#random-name-field').val(data.text);
  });
});
