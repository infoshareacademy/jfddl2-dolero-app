import React from 'react'

class Sidebar extends React.Component {

    state = {
        userName: 'Andrzej',
        accountBalance: 0
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Witaj {this.state.userName}</h2>
                    <h3>{this.state.accountBalance}</h3>
                </div>
                <form>
                    <input type="number" placeholder="Wprowadź kwotę"/>
                </form>
            </div>
        )
    }
}

export default Sidebar