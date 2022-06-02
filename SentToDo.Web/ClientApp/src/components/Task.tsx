import {ToDoTask} from "../api";

export interface Props {
    task: ToDoTask,
    onEditTask: (t: ToDoTask) => void
    onRemoveTask: () => void
}

function Task({task, onEditTask, onRemoveTask}: Props) {
    return <>
        <input onChange={(e) => onEditTask({...task, name: e.target.value})} value={task.name || ''}/>
        <input type={"checkbox"} checked={task.completed || false} onChange={(e) => onEditTask({...task, completed: e.target.checked})}/>
        <button onClick={() => onRemoveTask()}>Remove</button>
    </>
}

export default Task;