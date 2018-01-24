import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import DocumentExplorer from '../content/DocumentExplorer.jsx';
import QuestionExplorer from '../content/QuestionExplorer.jsx';
import MultiExplorer from '../content/MultiExplorer.jsx';
import MappingEditor from '../content/MappingEditor.jsx';
import Progress from '../utility/Progress.jsx';
import classNames from 'classnames/bind';
import 'whatwg-fetch';

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeDocument: null,
            activeQuestion: null,
            explorerConcepts: null
        };
        this.selectDocument = this.selectDocument.bind(this);
        this.selectQuestion = this.selectQuestion.bind(this);
        this.resetExplorer = this.resetExplorer.bind(this);
    }


    selectDocument(docId) {
        let {documentJson} = this.state;

        this.setState({
            activeDocument: docId,
            activeQuestion: null
        });
    }

    selectQuestion(questionId) {
        this.setState({
            activeDocument: this.state.activeDocument,
            activeQuestion: questionId
        });
    }

    resetExplorer() {
        this.setState({
            activeDocument: null,
            activeQuestion: null
        });
    }

    documentExplorerStyle(param) {
        let {activeDocument, activeQuestion} = this.state;

        if(!activeDocument) {
            var style = {
                xs: 12,
                md: 4,
                mdOffset: 4
            };
        }else {
            if(activeQuestion) {
                var style = {
                    xs: 12,
                    md: 3,
                    mdOffset: -3
                };
            }else{
                var style = {
                    xs: 12,
                    md: 3,
                    mdOffset: 2
                };
            }
        }

        return style[param];
    }

    questionExplorerStyle(param) {
        let {activeDocument, activeQuestion} = this.state;

        var style = {
            md: 4,
            xs: 6
        };
        if(activeQuestion) {
            var style = {
                md: 3,
                xs: 6
            };
        }

        return style[param];
    }



    progressState() {
        let {activeDocument, activeQuestion} = this.state;

        if(!activeDocument) {
            return 0;
        }else{
            if(!activeQuestion) {
                return 1;
            }else {
                return 2;
            }
        }
    }

    questionExplorerClass() {
        let {activeDocument} = this.state;

        return classNames({
            'show noan': activeDocument,
            'col-md-offset-05': this.progressState() == 2
        });
    }

    render() {
        let {activeDocument, activeQuestion, documentJson} = this.state;

        return (

            <div>
                <h1 className={"front-title"}>Manual Annotation Mapping</h1>
                <Grid fluid={true}>
                    <Row className={"show-grid " + "progress-" + this.progressState()}>
                        <Col    xs={this.documentExplorerStyle('xs')}
                                md={this.documentExplorerStyle('md')}
                                mdOffset={this.documentExplorerStyle('mdOffset')}
                                className={"show"}>
                            <DocumentExplorer
                                activeItem={activeDocument}
                                onResetExplorer={this.resetExplorer}
                                onItemSelect={this.selectDocument}
                                showSidebar={this.progressState() == 2} />
                        </Col>
                            <Col xs={this.questionExplorerStyle('xs')} md={this.questionExplorerStyle('md')} className={this.questionExplorerClass()}>
                                <MultiExplorer
                                    activeDocument={activeDocument}
                                    activeQuestion={activeQuestion}
                                    onQuestionSelect={this.selectQuestion}
                                    explorerConceptSync={::this.explorerConceptSync}/>
                            </Col>
                        <Col xs={6} md={(activeDocument && activeQuestion) ? 8 : 1} className={(activeDocument && activeQuestion) ? 'show' : ''}>
                            <MappingEditor
                                questionId={activeQuestion}
                                explorerConcepts={this.state.explorerConcepts} />
                        </Col>
                    </Row>
                </Grid>
                <Progress progressState={this.progressState()} />
            </div>
        );
    }

    explorerConceptSync(concepts) {
        this.setState({
            explorerConcepts: concepts
        });
    }
}

export default Content;
