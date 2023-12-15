// studentDashboard.js
document.addEventListener('DOMContentLoaded', function() {
    var actionSelect = document.getElementById('actionSelect');
    var nameField = document.getElementById('nameField').querySelector('input');
    var emailField = document.getElementById('emailField').querySelector('input');
    var submitField = document.getElementById('submitField');

    actionSelect.addEventListener('change', function() {
        var action = this.value;

        // Reset field display and required attribute
        nameField.parentElement.style.display = 'none';
        emailField.parentElement.style.display = 'none';
        submitField.style.display = 'none';
        nameField.removeAttribute('required');
        emailField.removeAttribute('required');

        // Determine which fields to show and set required if needed
        switch(action) {
            case 'addMentor':
            case 'updateMentor':
                nameField.parentElement.style.display = 'block';
                emailField.parentElement.style.display = 'block';
                submitField.style.display = 'block';
                nameField.setAttribute('required', '');
                emailField.setAttribute('required', '');
                break;
            case 'displayMentorByName':
            case 'deleteMentor':
                nameField.parentElement.style.display = 'block'; 
                submitField.style.display = 'block';
                nameField.setAttribute('required', '');
                break;
            case 'displayMentors':
                submitField.style.display = 'block';
                break;           
            default:
                console.error('Invalid action selected');
                break;
        }
    });

    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
    
        var action = document.getElementById('actionSelect').value;
        var name = document.getElementById('nameField').querySelector('input').value;
        var email = document.getElementById('emailField').querySelector('input').value;
    
        var data = { name: name, email: email };
    
        switch (action) {
            case 'addMentor':
                sendAjaxRequest('/student/addMentor', data);
                break;
            case 'displayMentorByName':
                sendAjaxRequest('/student/displayMentorByName', { name: name });
                break;
            case 'updateMentor':
                sendAjaxRequest('/student/updateMentor', data);
                break;
            case 'deleteMentor':
                sendAjaxRequest('/student/deleteMentor', { email: email });
                break;
            case 'displayMentors':
                sendAjaxRequest('/student/displayMentors', {});
                break;
            default:
                // Handle default case or show an error
                console.error('Invalid action selected');
        }
    });
    
});

function sendAjaxRequest(url, data) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            // Check if response is an array
            if (Array.isArray(response)) {
                var tableHtml = '<table>';
                tableHtml += '<tr><th>Name</th><th>Email</th></tr>'; // Add table headers
                response.forEach(function(item) {
                    tableHtml += '<tr><td>' + item.name + '</td><td>' + item.email + '</td></tr>';
                });
                tableHtml += '</table>';
                document.getElementById('data-card').innerHTML = tableHtml;
            }
            // Check if response is an object
            else if (response && typeof response === 'object') {
                var formattedObjectResponse = 'Name: ' + response.name + ', Email: ' + response.email;
                document.getElementById('data-card').innerHTML = formattedObjectResponse;
            }
            // If response is neither an array nor an object
            else {
                document.getElementById('data-card').innerHTML = response;
            }
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
}

