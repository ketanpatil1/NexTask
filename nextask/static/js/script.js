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
        section = element.closest(".section");
        addTaskSection.value = section.dataset.id;
        addTaskPriority.querySelector("#id_priority_3").checked = true;
        addTaskModal.showModal();
    });
});

const deleteSectionBtns = document.querySelectorAll(".delete-section-btn");
const deleteSectionModal = document.querySelector(".delete-section-dialog");
const deleteSectionTitle = document.querySelector(".delete-section-title");
const deleteSectionID = document.querySelector("#id_delete_section");
deleteSectionBtns.forEach((element) => {
    element.addEventListener("click", () => {
        section = element.closest(".section");
        deleteSectionID.value = section.dataset.id;
        deleteSectionTitle.textContent = section.dataset.title;
        deleteSectionModal.showModal();
    });
});

const deleteTaskBtns = document.querySelectorAll(".delete-task-btn");
const deleteTaskModal = document.querySelector(".delete-task-dialog");
const deleteTaskTitle = document.querySelector(".delete-task-title");
const deleteTaskID = document.querySelector("#id_delete_task");
deleteTaskBtns.forEach((element) => {
    element.addEventListener("click", () => {
        task = element.closest("li");
        deleteTaskID.value = task.dataset.id;
        deleteTaskTitle.textContent = task.dataset.title;
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
    const day = dateObject.getDate().toString().padStart(2, 0);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, 0);
    const year = dateObject.getFullYear();
    return `${year}-${month}-${day}`;
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
        task = element.closest("li");

        updateTaskId.value = task.dataset.id;
        updateTaskTitle.value = task.dataset.title;
        updateTaskDescription.value = task.dataset.description;
        updateTaskPriority.querySelector(
            `#update_task_priority_${task.dataset.priority - 1}`,
        ).checked = true;

        goalDate = new Date(task.dataset.goalDate);
        updateTaskDate.value = goalDate ? dateToString(goalDate) : null;

        goalTime = task.dataset.goalTime;
        updateTaskTime.value = goalTime ? timeTo24Fmt(goalTime) : null;

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
document.addEventListener("click", (event) => {
    if (!dropDown.contains(event.target)) {
        dropDown.classList.remove("show");
    }
});
