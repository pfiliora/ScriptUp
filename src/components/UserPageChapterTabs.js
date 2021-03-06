import React, { Component } from 'react'
import { Menu, Segment, Header, Form, TextArea, Button, Sidebar, Popup } from 'semantic-ui-react'
import { writeInChapter, storeAnalysis } from '../actions'
import WatsonTone from './WatsonTone'


export default class ChapterTabs extends Component {

    state = { theme: '', activeItem: '1. Intro', chapters: this.context.store.getState().firebaseDB.books["-KnLjyje2E3iy_1ircEG"].chapters, bookName: this.context.store.getState().firebaseDB.books["-KnLjyje2E3iy_1ircEG"].name, title: this.context.store.getState().firebaseDB.books["-KnLjyje2E3iy_1ircEG"].chapters["-KnN1rmnHZWll8QQBafy"].title, text: this.context.store.getState().firebaseDB.books["-KnLjyje2E3iy_1ircEG"].chapters["-KnN1rmnHZWll8QQBafy"].text, submittedText: '', visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    componentDidMount() {
        const { store } = this.context;

        this.unsubscribe = store.subscribe(() => this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
        // console.log(this.state.text)
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSave = e => {
        e.preventDefault()

        const { store } = this.context;

        const { text } = this.state

        this.setState({ submittedText: text })

        store.dispatch(writeInChapter(
            text,
        ));
    }

    handleFullScreen = e => {
        const body = document.querySelector('#transcript');
        body.webkitRequestFullscreen();
        // body.mozRequestFullScreen();
        // body.requestFullscreen();
        // this.state.theme = 'inverted'
        this.setState({ theme: 'inverted' })
        // console.log(this.state.theme)
    }

    handleAnalyzerClick(e) {
        e.preventDefault();
        const { store } = this.context;
        this.setState({ visible: !this.state.visible })

        // console.log('clicked analyzer')
        // console.log(this.state.text)

        // let text = this.state.text

        const URL = "http://storey.webscript.io/";
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const opts = {
            method: 'POST',
            body: JSON.stringify({
                text: this.state.text,
            }),
            headers: myHeaders,
        }
        return fetch(URL, opts)
            .then(response => Promise.all([response, response.json()]))
            // .then(response => console.log('Final data', response))
            .then(response => store.dispatch(storeAnalysis(response)))
    }

    startDictation() {
        var two_line = /\n\n/g;
        var one_line = /\n/g;
        function linebreak(s) {
            return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
        }
        var first_char = /\S/;
        function capitalize(s) {
            return s.replace(first_char, function (m) { return m.toUpperCase(); });
        }

        if (window.hasOwnProperty('webkitSpeechRecognition')) {

            const recognition = new window.webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = "en-US";
            recognition.start();

            recognition.onresult = function (e) {
                document.getElementById('transcript').value
                    += linebreak(capitalize(e.results[0][0].transcript))
                recognition.stop();
            };

            recognition.onerror = function (e) {
                recognition.stop();
            }
        }
    }

    render() {
        let chapter1 = this.state.text
        let { bookName, title, chapters, theme, activeItem, visible } = this.state
        // let chapterStuff
        // for (const chapterContent in chapters) {
        //     if (chapters.hasOwnProperty(chapterContent)) {
        //         const chapterStuff = chapters[chapterContent]
        //         console.log(chapterStuff.title)
        //         // return chapterStuff
        //         // renderables.push(<div>{chapterStuff.title}</div>);
        //     }
        // }
        //    {chapterStuff.map((item, index) => (
        //         <Header key={index} />
        //     ))}

        const renderables = Object.keys(chapters).map(chapterContent => {
            const chapterStuff = chapters[chapterContent];
            return <Button>{chapterStuff.title}</Button>
        });

        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='overlay' width='thin' direction='right' visible={visible} icon='labeled' vertical>
                        <WatsonTone />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header floated='left'>{bookName} - <span size='tiny'>Chapter: {title}</span> </Header>
                            <Menu attached='top' tabular>
                                <Menu.Item>
                                    <Popup
                                        trigger={<Button basic circular icon='plus' />}
                                        content='Add a new chapter'
                                    />
                                    <Popup
                                        trigger={<Button basic circular icon='search' onClick={this.handleAnalyzerClick.bind(this)} />}
                                        content='Analyze the text for emotion & language'
                                    />
                                    <Popup
                                        trigger={<Button basic circular icon='microphone' onClick={this.startDictation} />}
                                        content='Voice dictation writing'
                                    /> <Popup
                                        trigger={<Button basic circular icon='maximize' onClick={this.handleFullScreen} />}
                                        content='Full Screen writing'
                                    />
                                </Menu.Item>
                            </Menu>
                            <Segment attached='bottom'>
                                <Form onSubmit={this.handleSave}>
                                    <TextArea id="transcript" name='text' autoHeight defaultValue={chapter1} onChange={this.handleChange} />
                                    <Button basic icon='save' />
                                </Form>
                            </Segment>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div >
        )
    }
}
ChapterTabs.contextTypes = {
    store: React.PropTypes.object
};

{/*<Menu.Item name='2. The Wildfire' active={activeItem === '2. The Wildfire'} onClick={this.handleItemClick} />
                                <Menu.Item name='3. Bad Juju' active={activeItem === '3. Bad Juju'} onClick={this.handleItemClick} />*/}
                                                                    // {renderables}
