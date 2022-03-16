import {ToDoTask} from "../api";

export interface Props {
    task: ToDoTask,
    onChange?: (task: ToDoTask) => void
}

function ToDoTaskItem(props: Props) {
    const t = props.task
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        t.name = e.target.value
        props.onChange?.(t)
    }

    return <li><input value={t.name || ''} onChange={handleChange}/></li>
}

export default ToDoTaskItem;