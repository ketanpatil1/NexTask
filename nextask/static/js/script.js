const addSectionBtn = document.querySelector(".add-section-btn");
const addSectionModal = document.querySelector(".add-section-dialog");

addSectionBtn.addEventListener("click", () => {
    addSectionModal.showModal();
});

const addTaskBtns = document.querySelectorAll(".add-task-btn");
const addTaskModal = document.querySelector(".add-task-dialog");
const addTaskSection = document.querySelector("#id_section");
const addTaskPriority = addTaskModal.querySelector("#id_priority");

addTaskBtns.forEach((element) => {
    element.addEventListener("click", () => {
        addTaskSection.value =
            element.parentNode.attributes.getNamedItem("section_id").value;
        addTaskPriority.querySelector("#id_priority_3").checked = true;
        addTaskModal.showModal();
    });
});

const deleteSectionBtns = document.querySelectorAll(".delete-section-btn");
const deleteSectionModal = document.querySelector(".delete-section-dialog");
const deleteSectionID = document.querySelector("#id_delete_section");
deleteSectionBtns.forEach((element) => {
    element.addEventListener("click", () => {
        deleteSectionID.value =
            element.parentNode.attributes.getNamedItem("section_id").value;
        deleteSectionModal.showModal();
    });
});

const deleteTaskBtns = document.querySelectorAll(".delete-task-btn");
const deleteTaskModal = document.querySelector(".delete-task-dialog");
const deleteTaskID = document.querySelector("#id_delete_task");
deleteTaskBtns.forEach((element) => {
    element.addEventListener("click", () => {
        deleteTaskID.value = element.parentNode.id;
        deleteTaskModal.showModal();
    });
});

const updateTaskBtns = document.querySelectorAll(".update-task-btn");
const updateTaskModal = document.querySelector(".update-task-dialog");
const updateTaskId = document.querySelector("#id_task_id");

const updateTaskTitle = updateTaskModal.querySelector("#id_title");
const updateTaskDescription = updateTaskModal.querySelector("#id_description");
const updateTaskPriority = updateTaskModal.querySelector(
    "#update_task_priority",
);
const updateTaskDate = updateTaskModal.querySelector("#id_goal_date");
const updateTaskTime = updateTaskModal.querySelector("#id_goal_time");

function dateToString(dateObject) {
    let day = dateObject.getDate();
    let monthIndex = dateObject.getMonth();
    let year = dateObject.getFullYear();
    let month = monthIndex + 1;
    return `${year}-${month.toString().padStart(2, 0)}-${day}`;
}

function timeTo24Fmt(timeString) {
    let minutes = timeString.match(/(?<=:)\w+/);
    let hours = timeString.match(/\w+(?=:)/);
    if (timeString.match("PM") && hours != "12") {
        hours = +hours + 12;
    }
    return `${hours.toString().padStart(2, 0)}:${minutes}`;
}

updateTaskBtns.forEach((element) => {
    element.addEventListener("click", () => {
        updateTaskId.value = element.parentNode.id;

        updateTaskTitle.value =
            element.parentNode.parentNode.querySelector(".task-title")
                .innerText;
        updateTaskDescription.value =
            element.parentNode.parentNode.querySelector(".task-desc").innerText;
        updateTaskPriority.querySelector(
            `#update_task_priority_${
                element.parentNode.parentNode.classList[0].slice(-1) - 1
            }`,
        ).checked = true;

        goal_date_p = element.parentNode.parentNode.querySelector(
            ".task-goal-date",
        );
        if (goal_date_p) {
            goal_date = new Date(goal_date_p.innerText);
            updateTaskDate.value = dateToString(goal_date);
        } else {
            updateTaskDate.value = null;
        }

        goal_time_p = element.parentNode.parentNode.querySelector(
            ".task-goal-time",
        );
        if (goal_time_p) {
            goal_time = goal_time_p.innerText;
            updateTaskTime.value = timeTo24Fmt(goal_time);
            console.log(timeTo24Fmt(goal_time));
        } else {
            updateTaskTime.value = null;
        }

        updateTaskModal.showModal();
    });
});

const closeModalBtn = document.querySelectorAll(".close-section");
closeModalBtn.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector("dialog[open]").close();
    });
});

const dropDown = document.querySelector("#myDropdown");
const userDropdownBtn = document.querySelector(".dropdown-btn");
userDropdownBtn.addEventListener("click", () => {
    dropDown.classList.toggle("show");
});
