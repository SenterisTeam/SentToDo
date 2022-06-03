import {useStorage} from "../components/StorageProvider";
import Task from "../components/Task";
import {useEffect} from "react";

export interface Props {

}

function TasksPage(props: Props) {
    const {tasks, addTask, editTask, removeTask} = useStorage()

    useEffect(() => {
        console.log("search");
    }, [])
    
    return <>
        <button onClick={() => addTask({name: "Test"})}>Add</button>
        <ol>
            {tasks.map(t => <li key={t.timestamp}>
                <Task task={t} onEditTask={editTask} onRemoveTask={() => removeTask(t)}/> 
            </li>)}
        </ol>
    </>
}

export default TasksPage;
