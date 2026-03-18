let timeoutIds = []

// function scheduleReminder(title, description, date, time){
let scheduleReminder = (title, description, date, time) => {
    if("Notification" in window) {
        Notification.requestPermission().then(function(permission){
            if(Notification.permission !== "granted"){
                alert("Please allow the notification access!");
                // location.reload()
            }
        });
    }

    // const title = document.querySelector(".add-task-dialog #id_title").value;
    // const description = document.querySelector("#id_description").value;
    // const date = document.querySelector("#id_goal_date").value;
    // const time = document.querySelector("#id_goal_time").value;

    if (time) {
        let dateTimeString = date + " " + time;
        let scheduleTime = new Date(dateTimeString);
        let currentTime = new Date();
        let timeDifference = scheduleTime - currentTime;

        if(timeDifference > 0){
            let timeoutId = setTimeout(function (){
                let notification = new Notification(title, {
                    body: description,
                    requireInteraction: true,
                });
            }, timeDifference);

            timeoutIds.push(timeoutId);
        } else{
            // alert("The scheduled time is in the past!");
        }
        console.log(title, description, date, time)
    }
}

// let notifi = document.querySelector(".add-task-dialog .primary");
//
// notifi.addEventListener("click", (event) => {
//     event.preventDefault();
//     scheduleReminder();
// })
