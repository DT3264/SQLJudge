import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/sql/sql";
import { Controlled as ControlledEditor } from "react-codemirror2";

class Editor extends React.Component {
    handleChange = (editor, data, value) => {
        editor.refresh();
        this.props.onChange(value);
    };

    render() {
        return (
            <div>
                <ControlledEditor
                    onBeforeChange={this.handleChange}
                    value={this.props.value}
                    className="code-mirror-wraper"
                    editorDidMount={(editor) => {
                        editor.refresh();
                    }}
                    options={Object.assign({
                        lineWrapping: true,
                        lint: true,
                        mode: "sql",
                        lineNumbers: true,
                        theme: "material",
                        autofocus: true, 
                    })}
                />
            </div>
        );
    }
}

export default Editor;
