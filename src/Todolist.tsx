import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    topic: string,
    tasks: ArrPropsType[],
    removeTask: (taskID: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (newTitle: string) => void
}

type ArrPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState('');

    let trimmedTitle = title.trim();

    const addTaskHandler = () => {
        if (trimmedTitle !== '') {
            props.addTask(title);
            setTitle('');
        } else {
            setTitle('');
            setError('It is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const tsarFooHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return (
        <div className="App">
            <div>
                <h3>{props.topic}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyPressHandler}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    <div className='error'>{error}</div>
                </div>
                <ul>
                    {props.tasks.map(el => {
                        // const removeTaskHandler = () => {
                        //     props.removeTask(el.id)
                        // }
                        return (
                            <li key={el.id}>
                                <button onClick={()=>removeTaskHandler(el.id)}>X</button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span></li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>tsarFooHandler('all')}>All</button>
                    <button onClick={()=>tsarFooHandler('active')}>Active</button>
                    <button onClick={()=>tsarFooHandler('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}