
import {Todotask} from "./Model/Todotask.js";
import {ViecCanlam} from "./Model/Itemcanlam.js"




const todoTaskList = new Todotask ();
const completedTaskList = new Todotask();



// tạo hàm xuất list to do ra giao diện 

const renderTodolist = () => {

    const content = todoTaskList.allTask.reduce((value,task) =>{
        return value += `

        <li>
        <span>${task.content}</span>
        <div class="buttons">
            <button class="remove" onclick = "deleteTask('${task.id}')"><i class="far fa-trash-alt"></i></button>
            <button class="complete" onclick = "completeTask('${task.id}')">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
            </button>
        </div>
    </li>

        `
    }, '' )

    // đưa value vào html 
    document.querySelector('#todo').innerHTML = content;

    const completedTask = completedTaskList.allTask.reduce((value,task) => {
        return value +=`
        <li>
        <span>${task.content}</span>
        <div class="buttons">
            <button class="remove" onclick = "deleteTask('${task.id}', true)"><i class="far fa-trash-alt"></i></button>
            <button class="complete" onclick = "completeTask('${task.id}',true)">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-check-circle"></i>
            </button>
        </div>
    </li>
        `
    },'')
    document.querySelector('#completed').innerHTML = completedTask;
}

//add thêm task

document.querySelector('#addItem').onclick = () => {
    const newTask = document.querySelector('#newTask').value;
    if (newTask.length === 0) {
        return (alert('Không được để trống'))
    }
    //tạo object task
    const task = new ViecCanlam()
    // gán giá trị cho thuộc tính content bằng newTask lấy dc từ user 
    task.content = newTask;

    todoTaskList.addTask(task)
    // completedTaskList.addTask(task)
    document.querySelector('#newTask').value = '';
    console.log(todoTaskList.allTask)
    
    renderTodolist();
    setLocalStorage();

}

//set local storage
const setLocalStorage = () => {

    localStorage.setItem('allTask', JSON.stringify(todoTaskList.allTask));
    localStorage.setItem('completedTask', JSON.stringify(completedTaskList.allTask))
    
}
//get local storage
const getLocalStorage = () => {
    const data = localStorage.getItem('allTask')
    const dataParse = JSON.parse(data) || []
    todoTaskList.allTask = dataParse.map(value => {
        const task = new ViecCanlam()
        for (let key in value) {
            task[key]=value[key]
        }
        return task
    })

    const dataCompleted = localStorage.getItem('completedTask')
    const datacompletedParse = JSON.parse(dataCompleted) || []
    completedTaskList.allTask = datacompletedParse.map(value => {
        const task = new ViecCanlam()
        for (let key in value) {
            task[key]=value[key]
        }
        return task
    })
    renderTodolist()
}

getLocalStorage()

//xoá task 

window.deleteTask = (id, completed = false) => {

    if(completed){
        completedTaskList.deleteTask(id); 
    }else{
        todoTaskList.deleteTask(id);
    }
    renderTodolist();
    setLocalStorage()
}

// tick task complete/uncomplete

window.completeTask = (id, completed = false) => {
    console.log(id)
    if(completed){
       const task = completedTaskList.findTask(id);
    //    đưa task tìm dc lên mục todo 
    todoTaskList.addTask(task);
    //xoá task khỏi list completedtask
    completedTaskList.deleteTask(id)
    }else{
       const task= todoTaskList.findTask(id);
       completedTaskList.addTask(task);
       todoTaskList.deleteTask(id);
    }
    renderTodolist();
    setLocalStorage()
}

//sort a-z z-a

window.sortTask = (order = 'asc') => {
    if (order == 'asc') {
        todoTaskList.sortTaskAZ()
    }

    else {
        
        todoTaskList.sortTaskZA()
    }
    renderTodolist()
    setLocalStorage()

}
    



