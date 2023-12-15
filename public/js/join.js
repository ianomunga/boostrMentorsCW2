$(document).ready(function() {
    $('.signup-form').on('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting via the browser

        $.ajax({
            url: '/join',
            type: 'POST',
            cache: false,
            data: {
                email_or_phone: $('input[name="email_or_phone"]').val(),
                password: $('input[name="password"]').val()
            },
            success: function() {
                alert('Your submission was successful');
                // Redirect the user after a successful signup
                window.location.href = '/studentDashboard'; 
            },
            error: function(jqXHR) {
                // Display an error message
                alert('There was an error: ' + jqXHR.responseText);
            }
        });
    });
});
