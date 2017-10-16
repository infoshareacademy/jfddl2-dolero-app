import React from 'react';


class HistoryMore extends React.Component {

    render() {
        return (
            <tr>
                <td colSpan={3} >Opis:  {this.props.record.spending}</td>
            </tr>
        )
    }

}


export default HistoryMore