
$(function() {
  $('#fileupload').fileupload({
    method: 'post',
    url: '/api/work',
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    progressall: function(e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('#progress .bar').css(
        'width',
        progress + '%'
      );
    },
    add: function(e, data) {
    	console.log(data.files);
    	$('#preview').html(data.files[0]);
      $('.upload-work-submit')
        .show()
        .click(function(innerEvent) {
          innerEvent.preventDefault();
          data.submit();
          $('.status').text('Uploading');
        });
    },
    done: function(e, data) {
      $('.status').text('Done!');
    }
  })
});