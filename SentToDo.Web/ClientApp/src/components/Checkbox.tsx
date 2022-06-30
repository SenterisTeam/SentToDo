import {motion, useMotionValue, useTransform } from "framer-motion"
import React from "react";
import { useState } from "react"

export interface Props {
    checked: boolean,
    onChecked: (checked: boolean) => void
}

function Checkbox(props: Props) {
    const isChecked = props.checked;
    const pathLength = useMotionValue(0)
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1])
    
    const onClick = () => {
        props.onChecked(!isChecked)
    }
    
    console.log(isChecked)

    return (
        <div>
            <motion.div
                style={{
                    width: 30,
                    height: 30,
                    borderRadius: '100%',
                    cursor: "pointer",
                    border: "4px solid",
                    margin: "10px"
                }}
                animate={{
                    //scale: isChecked ? 1 : 0.8,
                    borderColor: isChecked
                        ? "#39e"
                        : "rgba(157,157,157,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onTap={onClick}
                whileHover={{scale: 1.1}}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 150 150"
                >
                    <motion.path
                        d="M38 74.707l24.647 24.646L116.5 45.5"
                        fill="transparent"
                        strokeWidth="20"
                        stroke="#39e"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: isChecked ? 0.9 : 0, opacity: isChecked ? 1 : 0 }}
                    />
                </svg>
            </motion.div>
        </div>
    )
}

export default React.memo(Checkbox)
