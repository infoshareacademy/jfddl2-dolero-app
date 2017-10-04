import React from 'react'

class Sidebar extends Component.React {

    state = {
        userName : '',
        accountBalance: 0
    }

    render() {
        return(
            <div>
                <h2>Witaj {this.state.userName}</h2>
                <h3>{this.state.accountBalance}</h3>
            </div>
        )
    }
}

export default Sidebar