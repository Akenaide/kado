import React from 'react'
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
            isVisible: true
        }


        this.user1 = {}

        let httpRequest = new XMLHttpRequest();


        httpRequest.open('POST', ExtAPI + "views/translationimages")
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    this.setState(() => {
                        const user = this.state.user1
                        user.data = JSON.parse(httpRequest.responseText)
                        return { user1: user }
                    })
                } else {
                    console.log("error get translation")
                }
            }
        }

        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send('url=' + encodeURIComponent(this.state.user1.deck))
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

    render() {
        const user1 = this.state.user1;
        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <Decklist deck={user1.data}></Decklist>
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