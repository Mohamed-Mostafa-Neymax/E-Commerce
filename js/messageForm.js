var contactForm = document.getElementById("messageForm")

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    var data = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };


    var postServer = new XMLHttpRequest();


    postServer.open("POST", "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us?fbclid=IwAR0zwgmMOhHa5RF3kq15icXBytn3TE3gqdk26WFGbE_IkMM8sZ3_l4zPl50",true);


    postServer.setRequestHeader("Content-Type", "application/json");
    


    postServer.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.log("Done");
            
        }else{
            console.log("Error");
            
        }
    }
    postServer.send(JSON.stringify(data));
});