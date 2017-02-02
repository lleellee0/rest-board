const requestUsersListAjax = function() {
  showLoadingDiv();
  $.ajax({
    url: apiServerAddress + '/users/list',
    method: 'GET',
    success: function(data) {
      hideLoadingDiv();

      $('#usersTable').DataTable( {
        data: data,
        columns: [
          { data: 'id' },
          { data: 'nickname' }
        ]
      });
    },
    error: function(xhr, status, err) {
      alert('Board list request fail.');
    }
  });
}
