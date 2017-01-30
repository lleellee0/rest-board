const requestBoardListAjax = function() {
  showLoadingDiv();
  $.ajax({
    url: apiServerAddress + '/board/list',
    method: 'GET',
    success: function(data) {
      hideLoadingDiv();

      data.result_list.forEach(function(element, index, array) {
        array[index].title = '<a href="/board/' + array[index].id + '/viewer" class="boardTitle" data-id="' + array[index].id +
         '" data-toggle="modal" data-target="#viewerModal">' + array[index].title + '</a>';
      });

      $('#boardTable').DataTable( {
        data: data.result_list,
        order: [[ 0, 'desc']],
        columns: [
          { data: 'id' },
          { data: 'title' },
          { data: 'nickname' },
          { data: 'write_time' }
        ]
      });
    },
    error: function(xhr, status, err) {
      alert('Board list request fail.');
    }
  });
}

$('#pjax-target').on('click', '.boardTitle', function(event) {
  showLoadingDiv();
  const id = $(event.target).data('id');
  history.pushState(null, null, '/board/' + id + '/viewer');

  $.ajax({
    url: apiServerAddress + '/board/' + id,
    method: 'GET',
    success: function(data) {
      hideLoadingDiv();
      document.getElementById('modalTitle').innerHTML = data.title;
      document.getElementById('modalContent').innerHTML = data.content;
    },
    error: function(xhr, status, err) {
      alert('Board list request fail.');
    }
  });

 event.preventDefault();
});

$('#postSubmit').on('click', function() {
  sendPostAjax();
});

const sendPostAjax = function() {
  showLoadingDiv();
  const postObject = {
    title: document.getElementById('postTitle').value,
    content: document.getElementById('postContent').value
  };

  $.ajax({
    url: apiServerAddress + '/board/?access_token=' + JSON.parse(localStorage.getItem('session')).token,
    method: 'POST',
    data: postObject,
    success: function(data) {
      hideLoadingDiv();

      document.getElementById('postTitle').value = '';
      document.getElementById('postContent').value = '';

      $('#postModal').modal('hide');
    },
    error: function(xhr, status, err) {
      hideLoadingDiv();
      alert(xhr.responseText);
    }
  });
}
