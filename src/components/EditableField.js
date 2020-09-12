import React, {useState} from 'react'
import ContentEditable from "./ContentEditable"

const EditableField = (props) => {
    const [text, setText] = useState(props.value);

    const handleChange = evt => {
        setText(evt.target.value);
    };

    const handleBlur = () => {
        console.log(text);
        props.patchFieldValue(text)
    };

    return (
        <ContentEditable html={text} onBlur={handleBlur} onChange={handleChange}/>
    );
}

export default EditableField
