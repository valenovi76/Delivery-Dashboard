
function sendEmail(contactForm) {
    emailjs.send("gmail", "milestone2", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "request_summary": contactForm.requestsummary.value
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}