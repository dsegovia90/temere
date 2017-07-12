$('#request-random-button').click(() => { // eslint-disable-line no-undef
  $.post('/temere', (data) => { // eslint-disable-line no-undef
    console.log(data.text);
    $('#random-name-field').val(data.text); // eslint-disable-line no-undef
  });
});
