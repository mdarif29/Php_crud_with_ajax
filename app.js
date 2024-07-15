$(document).ready(function() {
    loadUsers();

    // Handle form submission
    $('#userForm').on('submit', function(e) {
        e.preventDefault();
        const userData = $(this).serialize();
        const userId = $('#userId').val();

        if (userId) {
            // Update user
            $.post('update_user.php', userData, function(response) {
                alert(response.message);
                updateUserRow(userId, userData);
                resetForm();
            }, 'json');
        } else {
            // Create user
            $.post('create_user.php', userData, function(response) {
                alert(response.message);
                addUserRow(response.id, userData);
                resetForm();
            }, 'json');
        }
    });

    // Load users
    function loadUsers() {
        $.get('read_users.php', function(data) {
            $('#userTable tbody').html(data);
            initializeDataTable();
        });
    }

    // Reset form
    function resetForm() {
        $('#userId').val('');
        $('#name').val('');
        $('#email').val('');
        $('#age').val('');
        $('#userForm button[type="submit"]').text('Save');
    }

    // Add user row to table
    function addUserRow(id, userData) {
        const user = new URLSearchParams(userData);
        const row = `
            <tr data-id="${id}">
                <td>${id}</td>
                <td>${user.get('name')}</td>
                <td>${user.get('email')}</td>
                <td>${user.get('age')}</td>
                <td>
                    <button class="btn btn-sm btn-warning editUser" data-id="${id}">Edit</button>
                    <button class="btn btn-sm btn-danger deleteUser" data-id="${id}">Delete</button>
                </td>
            </tr>`;
        $('#userTable tbody').append(row);
    }

    // Update user row in table
    function updateUserRow(id, userData) {
        const user = new URLSearchParams(userData);
        const row = $(`tr[data-id="${id}"]`);
        row.find('td:eq(1)').text(user.get('name'));
        row.find('td:eq(2)').text(user.get('email'));
        row.find('td:eq(3)').text(user.get('age'));
    }

    // Edit user
    $(document).on('click', '.editUser', function() {
        const userId = $(this).data('id');
        $.get('get_user.php', { id: userId }, function(user) {
            $('#userId').val(user.id);
            $('#name').val(user.name);
            $('#email').val(user.email);
            $('#age').val(user.age);
            $('#userForm button[type="submit"]').text('Update');
        }, 'json');
    });

    // Delete user
    $(document).on('click', '.deleteUser', function() {
        const userId = $(this).data('id');
        $.post('delete_user.php', { id: userId }, function(response) {
            alert(response.message);
            removeUserRow(userId);
        }, 'json');
    });

    // Remove user row from table
    function removeUserRow(id) {
        $(`tr[data-id="${id}"]`).remove();
    }

    // Initialize DataTable with buttons
    function initializeDataTable() {
        $('#userTable').DataTable({
            destroy: true, // To reinitialize the table after data is loaded
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'print'
            ]
        });
    }
});
