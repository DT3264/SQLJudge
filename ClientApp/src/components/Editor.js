import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/sql/sql";
import { Controlled as ControlledEditor } from "react-codemirror2";

class Editor extends React.Component {
    handleChange = (editor, data, value) => {
        this.props.onChange(value);
    };

    render() {
        return (
            <div
                className="editor-container"
                style={{ borderBlockColor: "blue", border: "blue" }}
            >
                <ControlledEditor
                    onBeforeChange={this.handleChange}
                    value={this.props.value}
                    className="code-mirror-wraper"
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: "sql",
                        lineNumbers: true,
                        theme: "material",
                    }}
                />
            </div>
        );
    }
}

export default Editor;
