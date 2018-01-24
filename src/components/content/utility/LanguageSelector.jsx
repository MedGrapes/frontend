import React from 'react';
import FlagIcon  from '../../utility/FlagIcon.js';
import classNames from 'classnames/bind';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.renderFlags = this.renderFlags.bind(this);
    }

    render() {
        return (
            <div className={"language-selector"}>
                {this.props.languages.map(this.renderFlags)}
            </div>
        );
    }
    renderFlags(item) {
        let  {changeLanguage} = this.props;
        var flagClass = classNames({
            'active': item.lang == this.props.activeLang
        });

        return (
            <span onClick={() => changeLanguage(item.lang)} key={item.lang}>
                <FlagIcon code={this.getCountry(item.lang)} className={flagClass} size={"2x"} />
            </span>
        )
    }
    getCountry(code) {
        code = code.toLowerCase();
        switch(code) {
            case 'en':
                return 'gb';
        }

        return code;
    }
}

export default LanguageSelector
