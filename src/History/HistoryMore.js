import React from 'react';


class HistoryMore extends React.Component {

    render() {
        return (
            <tr
            onClick={this.props.changeBackUrl}
            key={this.props.record.id+5}
            >
                <td colSpan={3} >Opis:  {this.props.record.spending}</td>
            </tr>
        )
    }

}


export default HistoryMore