import React from 'react'
import Content from "./Content";

const Help = (props) => {
    return (
        <Content>
            <h2>Help</h2>
            <ul>
                <li><a target="_blank" href={window.apiUrl + "/doc"}>API Documentation</a> (only in dev mode)</li>
                <li><a target="_blank" href="https://github.com/manzari/keyfilekeeper-server">Backend Source Code</a></li>
                <li><a target="_blank" href="https://github.com/manzari/keyfilekeeper-frontend">Frontend Source Code</a></li>
            </ul>
        </Content>
    )
}

export default Help
