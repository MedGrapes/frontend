import React from 'react';
import classNames from 'classnames/bind';
import QuestionExplorer from './QuestionExplorer.jsx';
import ConceptExplorer from './ConceptExplorer.jsx';
import {Panel} from 'react-bootstrap';


class MultiExplorer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            show: 'question'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.activeDocument != prevProps.activeDocument) {
            this.setState({
                show: 'question'
            });
        }
    }

    getTitle() {
        let {activeQuestion} = this.props;

        if(activeQuestion) {
            return ::this.getMultiExplorerTitle();
        }else {
            return (
                <div>
                    <span>QuestionExplorer</span>
                </div>
            );
        }
    }

    render() {
        let {show} = this.state;
        let {activeDocument, activeQuestion, onQuestionSelect} = this.props;

        var questionClass = classNames({
            hidden: show == "concept"
        });
        var conceptClass = classNames({
            hidden: show == "question"
        });

        return (
            <Panel header={::this.getTitle()}>
                    <QuestionExplorer
                        className={questionClass}
                        activeDocument={activeDocument}
                        activeItem={activeQuestion}
                        onItemSelect={onQuestionSelect} />
                    <ConceptExplorer
                        className={conceptClass}
                        activeQuestion={activeQuestion}
                        syncConcepts={this.props.explorerConceptSync}/>
            </Panel>
        );
    }

    getMultiExplorerTitle() {
        let {show} = this.state;
        var questionClass = classNames({
            fadeOut: show == "concept"
        });

        var conceptClass = classNames({
            pullRight: true,
            fadeOut: show == "question"
        });

        return (
            <div>
                <span
                    className={questionClass}
                    onClick={this.changeShow.bind(this, "question")}>
                    QuestionExplorer
                </span>
                <span
                    className={conceptClass}
                    onClick={this.changeShow.bind(this, "concept")}>
                    ConceptExplorer
                </span>
            </div>
        );

    }

    changeShow(button, event) {
        let {show} = this.state;

        if(show != button) {
            this.setState({
                show: button
            });
        }
    }
}

export default MultiExplorer;
