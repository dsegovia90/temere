/* eslint no-undef: 0 */  // --> OFF
$('#request-random-button').click(() => {
  $('#request-random-button').prop('disabled', true);
  $.post('/temere', (data) => {
    console.log(data.text);
    $('#random-name-field').val(data.text);
  });
  setTimeout(() => {
    $('#request-random-button').prop('disabled', false);
  }, 1000);
});
