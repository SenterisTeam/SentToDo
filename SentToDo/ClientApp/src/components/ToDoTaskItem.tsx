import {ToDoTask} from "../api";

import styles from './ToDoTaskItem.module.scss';

export interface Props {
    task: ToDoTask,
    onChange?: (task: ToDoTask) => void
}

function ToDoTaskItem(props: Props) {
    const t = props.task
    const handleChange = (f: (t: ToDoTask) => ToDoTask) => {
        props.onChange?.(f(t))
    }

    return <div className={styles.item}>
        <input value={t.name || ''} onChange={(e) => handleChange((t) => ({...t, name: e.target.value}))}/>
        <input type={"checkbox"} checked={t.isComplete} onChange={(e) => handleChange((t) => ({...t, isComplete: e.target.checked}))}/>
    </div>
}

export default ToDoTaskItem;