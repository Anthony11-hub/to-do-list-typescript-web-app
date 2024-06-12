import { v4 as uuidV4 } from "uuid"

const list = document.getElementById("list") as HTMLUListElement;
const form = document.getElementById("add-new-task") as HTMLFormElement | null;
const input = document.getElementById("new-task") as HTMLInputElement;
const tasks: Task[] = loadTasks();
tasks.forEach(addTask);

type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value === "" || input?.value === null) return;

  const newTask: Task = {
    id: uuidV4(),
    text: input?.value,
    completed: false,
    createdAt: new Date().toISOString()
  }

  tasks.push(newTask)
  saveTasks()

  addTask(newTask);
  input.value = ""
})

function addTask(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.text)
  item.append(label)
  list.append(item)
}


function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const data = localStorage.getItem("TASKS")
  return data? JSON.parse(data) : []
}
