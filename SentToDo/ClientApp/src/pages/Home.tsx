import {Link} from "react-router-dom";
import {ToDoTask, ToDoTasksService} from "../api";
import PageTranslation from "../components/PageTranslation";
import {useEffect, useState} from "react";
import useApiList from "../useApiList";
import ToDoTaskItem from "../components/ToDoTaskItem";

function Home() {
    const [apiTasks, isLoading, error, fetchData] = useApiList<ToDoTask>(ToDoTasksService);
    const [tasks, setTasks] = useState<ToDoTask[]>()

    useEffect(() => setTasks(apiTasks), [apiTasks])

    const handleTaskChange = (t: ToDoTask, i: number) => {
        if (tasks) {
            tasks[i] = t;
            if (t.id) ToDoTasksService.put(t.id, t)
            setTasks([...tasks])
        }
    }

    return <PageTranslation>
        <h1>Hello!</h1>
        <Link to={'settings'}>A</Link>

        {isLoading && 'Loading...'}
        {error && error.message}
        <ul>
            {tasks && tasks.map((v, i) => <ToDoTaskItem key={v.id} task={v} onChange={(t) => handleTaskChange(t, i)}/>)}
        </ul>
    </PageTranslation>
}

export default Home;