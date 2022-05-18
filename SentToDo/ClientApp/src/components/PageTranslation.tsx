import {motion} from "framer-motion";
import React from "react";

export interface Props {
    children: React.ReactNode
}


function PageTranslation(props: Props) {
    return <motion.div initial={{opacity: 0, y: -10}}
                       animate={{opacity: 1, y: 0}}
                       exit={{opacity: 0, y: 10}}
                       transition={{duration: 0.5}}>
        {props.children}
    </motion.div>
}

export default PageTranslation;
