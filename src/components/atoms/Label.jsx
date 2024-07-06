import React from "react";

function Label(props) {
    return (
        <label className="font-semibold text-lg">
            {props.text}
        </label>
    );
}

export default Label;
