import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import PlayerConfig from '../PlayerConfig/PlayerConfig'

import './Config.css'

class Player {
    constructor(name, deck) {
        this.name = name ? name : ""
        this.deck = deck ? deck : ""
    }
}

// const ExtAPI = "http://localhost:8010/"
const ExtAPI = "https://proxymaker.naide.moe/"

export default class ConfigPage extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            user1: new Player(),
            user2: new Player(),
        }

        this.mockConfig = {
            "user1": {
                "name": "1",
                "deck": "https://www.encoredecks.com/deck/CudnvVQTW"
            },
            "user2": {
                "name": "2",
                "deck": "https://www.encoredecks.com/deck/YHir4YTdX"
            }

        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserChange = this.handleUserChange.bind(this)

    }

    handleUserChange(user, number) {
        if (number == 1) {
            this.setState({ user1: user });
        } else {
            this.setState({ user2: user });

        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return { theme: context.theme }
            })
        }
    }

    componentDidMount() {
        // do config page setup as needed here
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                if (!this.state.finishedLoading) {
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(() => {
                        return { finishedLoading: true }
                    })
                }
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })


            let config = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : this.mockConfig

            this.setState(() => {
                return {
                    user1: config ? config.user1 : new Player(),
                    user2: config ? config.user2 : new Player()
                }
            })
        }
    }

    handleSubmit(event) {

        window.Twitch.ext.rig.log("1", this.state.user1);
        window.Twitch.ext.rig.log("2", this.state.user2);
        this.twitch.configuration.set('broadcaster', '1.0', { "user1": this.state.user1, "user2": this.state.user2 })
        let httpRequest = new XMLHttpRequest();

        httpRequest.open('POST', ExtAPI + "views/cache?force=true",)
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send('decks=' + encodeURIComponent(this.state.user1.deck) + ',' + encodeURIComponent(this.state.user2.deck));


        event.preventDefault();
    }

    render() {
        const user1 = this.state.user1;
        const user2 = this.state.user2;

        if (this.state.finishedLoading && this.Authentication.isModerator()) {
            return (
                <div className="Config">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <form onSubmit={this.handleSubmit}>

                            <PlayerConfig user={user1} onUserChange={this.handleUserChange} number={1} />
                            <PlayerConfig user={user2} onUserChange={this.handleUserChange} number={2} />

                            <input type="submit" value="Submit"></input>
                        </form>

                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="Config">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        Loading...
                    </div>
                </div>
            )
        }
    }
}