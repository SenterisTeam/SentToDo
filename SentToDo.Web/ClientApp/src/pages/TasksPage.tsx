import {SavingState, useStorage} from "../components/StorageProvider";
import Task from "../components/Task";
import {useEffect, useMemo, useState} from "react";
import usePrevious from "../data/usePrevious";
import {ToDoHistoryEntry, ToDoTask} from "../api";
import {AnimatePresence, motion} from "framer-motion";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import styles from './TasksPage.module.scss'
import {Icon} from "semantic-ui-react";

export interface Props {

}

enum SortType {
    PRIORITY,
    TIMESTAMP,
    LAST_EDIT
}

type Sorter = (a: ToDoTask, b: ToDoTask, h: ToDoHistoryEntry[]) => number

const sorters = new Map<SortType, Sorter>()
sorters.set(SortType.PRIORITY, (a, b) => (b.priority ?? 0) - (a.priority ?? 0) || b.timestamp! - a.timestamp!)
sorters.set(SortType.TIMESTAMP, (a, b) => b.timestamp! - a.timestamp!)
sorters.set(SortType.LAST_EDIT, (a, b, h) => {
    const sortedHistory = h.sort((a, b) => b.timestamp! - a.timestamp!)
    const ah = sortedHistory.find(h => h.newValue?.timestamp == a.timestamp || h.oldValue?.timestamp == a.timestamp) ?? {timestamp: 0}
    const bh = sortedHistory.find(h => h.newValue?.timestamp == b.timestamp || h.oldValue?.timestamp == b.timestamp) ?? {timestamp: 0}
    return bh.timestamp! - ah.timestamp!
})

const list = {
    hidden: {
        
    },
    visible: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

function TasksPage(props: Props) {
    const {tasks, addTask, editTask, removeTask, savingState, history} = useStorage()
    const [taskSorter, setTaskSorter] = useState<number[]>([])
    const [sortType, setSortType] = useState<SortType>(SortType.TIMESTAMP)
    const prevSortType = usePrevious(sortType)
    const prevTasks = usePrevious(tasks)
    const [initalAnimationCompleated, setInitalAnimationCompleated] = useState(false)
    const navigate = useNavigate();
    const {selectedToDo} = useParams()
    
    const [newTaskName, setNewTaskName] = useState('')

    useEffect(() => {
        if (savingState == SavingState.SAVED || taskSorter.length != tasks.length || prevSortType != sortType) {
            setTaskSorter(tasks.sort((a, b) => sorters.get(sortType)!(a, b, history)).map(t => t.timestamp!))
        }
    }, [tasks, savingState, sortType])

    const sortedTasks = (tasks.length == taskSorter.length ? tasks : prevTasks ?? []).sort((a, b) => taskSorter.indexOf(a.timestamp!) - taskSorter.indexOf(b.timestamp!))
    
    const onClick = (e: React.MouseEvent<HTMLElement>, t: ToDoTask) => {
        if ((e.target as HTMLElement).classList.contains("task")) navigate(`task/${t.timestamp!.toString()}`)
    }
    
    return <>
        {/*<button onClick={() => addTask({name: "Test", priority: 0})}>Add</button>*/}
        {/*<br/>*/}
        {/*<button onClick={() => setSortType(SortType.PRIORITY)}>Priority</button>*/}
        {/*<button onClick={() => setSortType(SortType.TIMESTAMP)}>Creation time</button>*/}
        {/*<button onClick={() => setSortType(SortType.LAST_EDIT)}>Last edit</button>*/}
        <div className={styles.list}>
            <div>
                <motion.div layout layoutId={'newTask'} className={styles.add} initial={{opacity: 0}} animate={{opacity: 1}}>
                    <div className={styles.input}>
                        <input placeholder={"New task..."} value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}/>
                    </div>
                    <div className={styles.button}>
                        <button onClick={() => {
                            addTask({name: newTaskName, priority: 0});
                            setNewTaskName('')
                        }} className={styles.green}><Icon name={'add'}/></button>
                    </div>
                </motion.div>
                {sortedTasks.length > 0 && <motion.div initial="hidden" animate="visible" exit="hidden" variants={list} onAnimationComplete={() => setInitalAnimationCompleated(true)}>
                    <AnimatePresence>
                        {sortedTasks.map(t => 
                           <Task key={t.timestamp} selected={selectedToDo == t.timestamp} task={t} onEditTask={editTask} onRemoveTask={() => removeTask(t)} onClick={(e) => onClick(e, t)} initialAnimationCompleated={initalAnimationCompleated}/>
                        )}
                    </AnimatePresence>
                </motion.div>}
            </div>
        </div>
        
        <Outlet/>
    </>
}

export default TasksPage;
