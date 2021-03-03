import React, { useState } from 'react'
import Authentication from '../../util/Authentication/Authentication'
import Decklist from '../Decklist/Decklist'

import './Overlay.css'

const ExtAPI = "https://proxymaker.naide.moe/"
export default class Overlay extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.changeShownPlayer = this.changeShownPlayer.bind(this);

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
        this.state = {
            finishedLoading: false,
            theme: 'light',
            user1: this.mockConfig["user1"],
            user2: this.mockConfig["user2"],
            shownPlayer: "user1",
            isVisible: true
        }



    }

    getDecklist(player, num) {
        let httpRequest = new XMLHttpRequest();

        httpRequest.open('POST', ExtAPI + "views/translationimages")
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    this.setState(() => {
                        player.data = JSON.parse(httpRequest.responseText)
                        let key = "user" + num
                        return { key: player }
                    })
                } else {
                    console.log("error get translation")
                }
            }
        }

        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send('url=' + encodeURIComponent(player.deck))
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return { theme: context.theme }
            })
        }
    }

    visibilityChanged(isVisible) {
        this.setState(() => {
            return {
                isVisible
            }
        })
    }

    componentDidMount() {
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                if (!this.state.finishedLoading) {
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(() => {
                        return { finishedLoading: true }
                    })

                    this.getDecklist(this.state.user1, 1);
                    this.getDecklist(this.state.user2, 2);
                }
            })

            this.twitch.listen('broadcast', (target, contentType, body) => {
                this.twitch.rig.log(`New PubSub message!\n${target}\n${contentType}\n${body}`)
                // now that you've got a listener, do something with the result... 

                // do something...

            })

            this.twitch.onVisibilityChanged((isVisible, _c) => {
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })
        }
    }

    componentWillUnmount() {
        if (this.twitch) {
            this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
        }
    }

    changeShownPlayer(e) {
        e.persist();

        this.setState(() => {
            return { shownPlayer: "user" + e.target.value }
        })

    }

    render() {
        const user1 = this.state.user1;
        const user2 = this.state.user2;
        const shownPlayer = this.state.shownPlayer;

        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <div className="GroupDeck">
                            <button value="1" onClick={this.changeShownPlayer}>{user1.name}</button>
                            <button value="2" onClick={this.changeShownPlayer}>{user2.name}</button>
                        </div>
                        {shownPlayer == 'user1' &&
                            <Decklist deck={user1.data}></Decklist>
                        }
                        {shownPlayer == 'user2' &&
                            <Decklist deck={user2.data}></Decklist>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    Waiting ..
                </div>
            )
        }

    }
}