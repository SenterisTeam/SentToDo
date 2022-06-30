import {useStorage} from "../components/StorageProvider";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import styles from './TaskDetails.module.scss'
import Task from "../components/Task";

export interface Props {

}

function TaskDetails(props: Props) {
    const {tasks, addTask, editTask, removeTask} = useStorage()
    const {selectedToDo} = useParams()
    const navigate = useNavigate()

    const task = tasks.find(t => t.timestamp == selectedToDo)

    const onClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains(styles.container)) navigate('../../')
    }

    return <motion.div initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} animate={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                       className={styles.container} onClick={onClick}>
        <AnimatePresence>
            {task &&
                <Task key={task.timestamp} selected={false} task={task} onEditTask={editTask}
                      onRemoveTask={() => removeTask(task)} initialAnimationCompleated={true} extend={true}/>
            }
        </AnimatePresence>
    </motion.div>
}

export default TaskDetails;