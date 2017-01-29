const requestBoardListAjax = function() {
  showLoadingDiv();
  $.ajax({
    url: apiServerAddress + '/board/list',
    method: 'GET',
    success: function(data) {
      hideLoadingDiv();

      data.result_list.forEach(function(element, index, array) {
        array[index].title = '<a href="/board/' + array[index].id + '/viewer" class="boardTitle" data-id="' + array[index].id + '" data-toggle="modal" data-target="#boardModal">' + array[index].title + '</a>';
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
