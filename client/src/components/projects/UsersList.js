import React, { Component } from 'react'

export default class UsersList extends Component {
    render() {
        let users = this.props.users;
        let numOfUsers = this.props.users.length;
        return (
            <div>
                {
                    numOfUsers < 3 ?
                        users.map((user) => (
                            <div>{user}</div>
                        )) :
                        (
                            users.slice(0, 2).map((user) => (
                                <div>{user}</div>
                            ))
                        )
                }
                {
                    numOfUsers < 3 ?
                        null :
                        <div>And {numOfUsers - 2} other users</div>
                }
            </div>
        )
    }
}
