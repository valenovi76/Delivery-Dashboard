
function sendMail(contactForm){
    emailjs.send("DeliveryDashboard", "dashboard",{
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "change_request":contactForm.summary.value,
    })

    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}