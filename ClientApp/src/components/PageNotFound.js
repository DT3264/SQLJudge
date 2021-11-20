import React from "react";

class PageNotFound extends React.Component {
    render (){
        return (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <h1>
                    404 PAGE NOT FOUND{" "}
                    <span role="img" aria-label="dog">
                        🐶
                    </span>
                </h1>
            </div>
        );
    }
}

export default PageNotFound;