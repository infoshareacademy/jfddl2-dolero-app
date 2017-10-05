import React from 'react';
import {Panel} from 'react-bootstrap'
class Diagrams extends React.Component {

    render() {
        return (
            <div>
                <h1>Monika</h1>

                <div>
                    <Panel header="Panel heading without title">
                        Panel content
                    </Panel>
                    <Panel header='witam'>
                        Panel content
                    </Panel>
                </div>

            </div>
        )
    }
}
export default Diagrams