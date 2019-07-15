import React from "react"


export default function Inputfield(props){
    return (
        <div style= {{paddingBottom : "10px"}}>
            <div style={{paddingBottom : "7px"}}><label>{props.name}</label></div>
            <div><input
                {...props}
                className = {"inputField " + ((props.className !== undefined) ? props.className : "")}
            /></div>
        </div>
    )
}