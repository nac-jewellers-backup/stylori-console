import React from "react"


export default function Button(props){
    return (
        <div style= {{paddingBottom : "10px"}}>
            <button
             className={((props.className !== undefined) ? props.className : "")}
             type = {((props.type !== undefined) ? props.type : "button")}
            >
                {props.name}
            </button>
        </div>
    )
}