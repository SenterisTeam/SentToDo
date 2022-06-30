import {AnimatePresence, motion, useMotionValue, Variants} from "framer-motion";
import {ToDoTask} from "../api";
import Priority from "./Priority";
import {Icon} from "semantic-ui-react";
import styles from './Task.module.scss';
import Checkbox from "./Checkbox";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

export interface Props {
    task: ToDoTask,
    onEditTask: (t: ToDoTask) => void
    onRemoveTask: () => void,
    initialAnimationCompleated: boolean,
    onClick?: React.MouseEventHandler<HTMLElement>,
    selected: boolean,
    extend?: boolean
}

const animation: Variants = {
    hidden: {
        opacity: 0,
        x: 10
    },
    visible: {
        opacity: 1,
        x: 0
    }
}

function objectEquals(x: any, y: any): boolean {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) {
        return x === y;
    }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) {
        return false;
    }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) {
        return x === y;
    }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) {
        return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
        return true;
    }
    if (Array.isArray(x) && x.length !== y.length) {
        return false;
    }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) {
        return false;
    }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) {
        return false;
    }
    if (!(y instanceof Object)) {
        return false;
    }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) {
            return p.indexOf(i) !== -1;
        }) &&
        p.every(function (i) {
            return objectEquals(x[i], y[i]);
        });
}

function Task({task, onEditTask, onRemoveTask, initialAnimationCompleated, onClick, selected, extend}: Props) {
    const navigate = useNavigate()
    
    return <motion.div
        layout
        variants={animation}
        initial={initialAnimationCompleated ? 'hidden' : undefined}
        animate={initialAnimationCompleated ? 'visible' : undefined}
        exit={initialAnimationCompleated ? 'hidden' : undefined}
        onClick={onClick}
        className={`task ${styles.task} ${extend ? styles.extend : ''}`}
    >
        {!selected && <motion.div className={`task ${styles.content}`} layoutId={task.timestamp!.toString()}>
            {/*<input type={"checkbox"} checked={task.completed || false}*/}
            {/*       onChange={(e) => onEditTask({...task, completed: e.target.checked})}/>*/}
            <div className={styles.main}>
                <Checkbox checked={task.completed || false} onChecked={(c) => onEditTask({...task, completed: c})}/>
                <div className={`task ${styles.name}`}>
                    <div className={`task`}>
                        <text>{task.name && task.name.length > 1 ? task.name : '0000000000000000000000000000000'}</text>
                        <input onChange={(e) => onEditTask({...task, name: e.target.value})} value={task.name || ''}/>
                    </div>
                </div>
                <div className={styles.button}>
                    <button onClick={() => navigate(extend ? '../../' : `task/${task.timestamp}`)}><Icon name='pencil'/></button>
                </div>
                <div className={styles.button}>
                    <button className={styles.danger} onClick={() => onRemoveTask()}><Icon name='close'/></button>
                </div>
            </div>
            {extend && <>
                <div className={styles.second}>
                    <div className={styles.button}>
                        <button onClick={() => onEditTask({...task, priority: task.priority ? task.priority += 1 : 1})}>
                            <Icon
                                name='chevron up'/>
                        </button>
                    </div>
                    <AnimatePresence exitBeforeEnter>
                       <Priority priority={task.priority || 0} key={task.priority + " " + task.timestamp}/>
                    </AnimatePresence>
                    <div className={styles.button}>
                        <button
                            onClick={() => onEditTask({...task, priority: task.priority ? task.priority -= 1 : -1})}>
                            <Icon
                                name='chevron down'/>
                        </button>
                    </div>
                </div>
            </>}
        </motion.div>}
    </motion.div>
}

export default Task