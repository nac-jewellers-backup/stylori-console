import React from "react";
import MultiSelect from "./MultiSelect";
import Select from "./Select"

export default function CardRadioButton(props) {

    return (
        <>

            {
                props.select===true ?
                    <Select selectData={props.selectData}/>
                    :
                    <MultiSelect  MultiSelectData={props.MultiSelectData} />

            }
        </>

    );
}