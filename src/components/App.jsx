import React from 'react';
import Navigation from './layout/Navigation.jsx';
import Content from './layout/Content.jsx';
import FlagIcon from './utility/FlagIcon.js';


class App extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Content />
            </div>
        );
    }
}

export default App;
