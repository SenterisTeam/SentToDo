import {useStorage} from "../components/StorageProvider";

export interface Props {

}

function TasksPage(props: Props) {
    const {tasks, addTask, editTask, removeTask} = useStorage()
    
    return <>
        <button onClick={() => addTask({name: "Test"})}>Add</button>
        <ol>
            {tasks.map(t => <li key={t.timestamp}>
                <input onChange={(e) => editTask({...t, name: e.target.value})} value={t.name || ''}/> 
                <input type={"checkbox"} checked={t.completed || false} onChange={(e) => editTask({...t, completed: e.target.checked})}/>
                <button onClick={() => removeTask(t)}>Remove</button></li>)}
        </ol>
    </>
}

export default TasksPage;
