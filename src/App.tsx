import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "NEWNEW", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id != taskID));
    }

    let tasksForToDoList = tasks;

    if (filter === 'active') {
        tasksForToDoList = tasks.filter(el => !el.isDone);
    }

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(el => el.isDone);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist topic={'developer 1'}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
