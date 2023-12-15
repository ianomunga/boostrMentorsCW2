$(document).ready(function() {
    $('.admin-login-form').on('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting via the browser

        $.ajax({
            url: '/adminLogin', // Pointing to the admin-specific login endpoint
            type: 'POST',
            cache: false,
            data: {
                email_or_phone: $('input[name="email_or_phone"]').val(),
                password: $('input[name="password"]').val()
            },
            success: function() {
                alert('Hey Ian. Welcome back!');
                // Redirect the admin after a successful login
                window.location.href = '/dashboard'; // Redirecting to the admin dashboard
            },
            error: function(jqXHR) {
                // Display an error message
                alert('There was an error: ' + jqXHR.responseText);
            }
        });
    });
});
