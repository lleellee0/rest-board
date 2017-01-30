let isPost = false;
let targetId = 0;

$('body').on('click', '.boardPost', function() {
  // 글쓰기 모드
  isPost = true;
});

$('body').on('click', '#correctButton', function() {
  // 글수정 모드
  isPost = false;

  document.getElementById('postTitle').value = document.getElementById('modalTitle').innerHTML;
  document.getElementById('postContent').innerHTML = document.getElementById('modalContent').innerHTML;

  $('#viewerModal').modal('hide');
  $('#postModal').modal('show');
});

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
      targetId = id;
    },
    error: function(xhr, status, err) {
      alert('Board list request fail.');
    }
  });

 event.preventDefault();
});

$('body').on('click', '#postSubmit', function() {
  if(isPost)   // 글쓰기모드
    sendPostAjax();
  else         // 글수정모드
    sendUpdateAjax();
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
      setTimeout(function() {
        $('#navBoard').click();
      }, 500);
    },
    error: function(xhr, status, err) {
      hideLoadingDiv();
      alert(xhr.responseText);
    }
  });
}
const sendUpdateAjax = function() {
  showLoadingDiv();
  const postObject = {
    title: document.getElementById('postTitle').value,
    content: document.getElementById('postContent').value
  };
  $.ajax({
    url: apiServerAddress + '/board/' + targetId + '?access_token=' + JSON.parse(localStorage.getItem('session')).token,
    method: 'PUT',
    data: postObject,
    success: function(data) {
      hideLoadingDiv();

      document.getElementById('postTitle').value = '';
      document.getElementById('postContent').value = '';

      $('#postModal').modal('hide');
      setTimeout(function() {
        $('#navBoard').click();
      }, 500);
    },
    error: function(xhr, status, err) {
      hideLoadingDiv();
      alert(xhr.responseText);
    }
  });
}

$('body').on('click', '#deleteButton', function() {
  sendDeleteAjax();
});

const sendDeleteAjax = function() {
  showLoadingDiv();

  $.ajax({
    url: apiServerAddress + '/board/' + targetId + '?access_token=' + JSON.parse(localStorage.getItem('session')).token,
    method: 'DELETE',
    success: function(data) {
      hideLoadingDiv();

      $('#viewerModal').modal('hide');
      setTimeout(function() {
        $('#navBoard').click();
      }, 500);
    },
    error: function(xhr, status, err) {
      hideLoadingDiv();
      alert(xhr.responseText);
    }
  });
}
