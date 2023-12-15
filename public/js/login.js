$(document).ready(function() {
    $('.login-form').on('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting via the browser

        $.ajax({
            url: '/login', // Changed to the login endpoint
            type: 'POST',
            cache: false,
            data: {
                email_or_phone: $('input[name="email_or_phone"]').val(),
                password: $('input[name="password"]').val()
            },
            success: function() {
                alert('Login successful');
                // Redirect the user after a successful login
                window.location.href = '/studentDashboard';
            },
            error: function(jqXHR) {
                // Display an error message
                alert('There was an error: ' + jqXHR.responseText);
            }
        });
    });
});
