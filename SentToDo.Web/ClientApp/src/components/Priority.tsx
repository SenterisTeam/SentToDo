import {motion} from "framer-motion";
import React from "react";
import {useEffect} from "react";

export interface Props {
    priority: number
}

function Priority(props: Props) {
    return <span><text>Priority: </text> <motion.p initial={{ y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -10, opacity: 0}} transition={{duration: 0.2}}>{props.priority}</motion.p></span>
}

export default React.memo(Priority, (a, b) => a.priority == b.priority);