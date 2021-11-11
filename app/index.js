// importing scss
import '../scss/main.scss';

// declaring a global array to store the tasks
let movies = [];


const taskURI = 'task.json'
const taskXHR = new XMLHttpRequest();
taskXHR.open('GET', taskURI);

// getting elements from html to add event listeners
const toggle = document.getElementById("addbutton");
const content = document.getElementById("add");

// to display the add task details toggle
toggle.addEventListener("click", function () {
    content.style.display = (content.dataset.toggled ^= 1) ? "block" : "none";
});

// event listner check if the add tasks button is pressed
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addtask').addEventListener('click', addMovie);
});


// event listner to check if the delete the tasks button pressed
const todoList = document.querySelector(".todo-list");
todoList.addEventListener('click', deleteCheck);

/**
 * 
 * @param {*} ev Task Object with title, description,date and time
 */

// Adding the new task if all parameters intered to an array as an object, the last element is passed to be dsplayed
const addMovie = (ev) => {
    ev.preventDefault();
    // checking if field left empty
    if (document.getElementById("title").value.length == 0 || document.getElementById("description").value.length == 0 || document.getElementById("date").value.length == 0 || document.getElementById("time").value.length == 0) {
        alert("All fields are required")
    } else {
        let movie = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        }
        movies.push(movie);
        document.forms[0].reset();

        console.warn('added', { movies });
        load(movies.slice(-1));

    }
}


// converting the json data to an array
taskXHR.onload = function () {
    if (this.status === 200) {
        const responseText = this.responseText;
        // convert it to task object
        const task = JSON.parse(responseText);
        load(task);
        joinArrays(task);
    }
};
taskXHR.send();


// Function to join the json array and the new tasks added array
const joinArrays = function (allElements) {
    movies = allElements.concat(movies);
}


/**
 * Adds tasks as the list item to the parent.
 * 
 * at param describes the input element with type inside
 * @param {task} task the task object
 * @param {HTMLElement} parent the parent object
 */

// to create one person
const createTask = (task, parent) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${task.title}`));
    li.classList.add("todo")
    const button2 = document.createElement("button");
    button2.innerHTML = '<i class="fas fa-check"></i>';
    button2.classList.add("complete-btn");
    button2.setAttribute("id", "complete");
    li.appendChild(button2)
    li.setAttribute("id", "element4");
    parent.appendChild(li);
    const linebreak = document.createElement("br");
    parent.appendChild(linebreak);

};

/**
 * Loads all tasks to the ordered list element
 * @param {tasks[]} task
 * @returns {boolean} returns true if successful
 */

// retreive order list element and add to html
const load = (tasks) => {
    const ol = document.getElementById('list');
    tasks.forEach(task => {
        createTask(task, ol);

    });
    return true;
}

// function once the eventlistener is active
function deleteCheck(e) {
    const item = e.target;

   

    // if anywhere other than the delete button is pressed toggle to details view bar
    if (item.classList[0] == "todo" && item.classList[0] != "complete-btn") {
        const view = document.getElementById("viewContainer");
        document.querySelectorAll('.todo').forEach(item => {
            item.addEventListener('click', event => {
                view.style.display = (view.dataset.toggled ^= 1) ? "block" : "none";
            })
        })

        //  Display the full details
        const todo = item;
        const title = todo.textContent;
        for (let i = 0; i < movies.length; i++) {
            if (title == movies[i].title) {
                const eachTask = movies[i];
                document.getElementById("demo1").innerHTML = eachTask.title;
                document.getElementById("demo2").innerHTML = eachTask.description;
                document.getElementById("demo3").innerHTML = eachTask.date;
                document.getElementById("demo4").innerHTML = eachTask.time;
            }
        }

    }

    
         // this deletes the task if the delete button pressed
         if (item.classList[0] == "complete-btn") {
            const todo = item.parentElement;
            const view = document.getElementById("viewContainer");
            todo.remove();
            view.style.display ="none";
        }
    
    


}