import React from 'react';
import LanguageSelector from './LanguageSelector.jsx'

class QuestionWell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {currentLanguage: null};

        this.getLang = this.getLang.bind(this);
        this.getCurrentLanguage = this.getCurrentLanguage.bind(this);
        this.getDefaultLang = this.getDefaultLang.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
    }

    getLang(langCode) {
        let {languages} = this.props;

        var el = languages.find(function(element) {
            if(element.lang.toLowerCase() == langCode.toLowerCase()) {
                return true;
            }
            return false;
        });

        return el;
    }

    getCurrentLanguage() {
        let {currentLanguage} = this.state;

        if(currentLanguage) {
            var lang = this.getLang(currentLanguage);
            if(lang) {
                return lang;
            }else {
                return this.getDefaultLang();
            }
        }else {
            return this.getDefaultLang();
        }
    }

    getDefaultLang() {
        var order = ["en", "de"];

        for(var i = 0; i < order.length; i++) {
            var lang = this.getLang(order[i]);
            if(lang) {
                return lang;
            }
        }

        return null;
    }
    onLanguageChange(lang) {
        this.setState({currentLanguage: lang});
    }

    render() {
        let {languages} = this.props;
        if(!languages) {
            return null;
        }


        var defaultLang = this.getCurrentLanguage();
        return (
            <div className={"well question-well"}>
                <LanguageSelector languages={languages} activeLang={defaultLang.lang} changeLanguage={this.onLanguageChange}/>
                <h3 style={this.languageSize(defaultLang.value)}>{defaultLang.value}</h3>
            </div>
        );
    }

    languageSize(text) {
        if(text.length > 100) {
            return {fontSize: '16px'};
        }
        return null;
    }
}

export default QuestionWell
