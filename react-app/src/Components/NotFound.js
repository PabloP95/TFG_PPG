import React, { Component } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import './NotFound.css'
export class NotFound extends Component {
    render() {

        return (
            <div class="mainbox">
                <div class="err">4</div>
                <FaQuestionCircle className="far icon-spin" />
                <div class="err2">4</div>
                <div class="msg">
                    Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                    <p>
                        Let's go <a className="notFoundA" href="/">home</a> and try from there.
                    </p>
                </div>
            </div>
        )
    }
}

export default NotFound
