import React from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import {QuestionWell} from './utility';
import {Tree} from './utility/tree';
import {ConceptsDetail} from './utility/conceptsDetail';
import {ConceptTree, ConceptManualStatus} from '../../service';
import {Manager, DefaultColorSet} from '../../service/colorManager';

class MappingEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rawJson: null,
            conceptsDetail: [],
            conceptTree: null,
            manualConceptStatus: new ConceptManualStatus(),
            colorManager: null
        };

        this.loadQuestion = this.loadQuestion.bind(this);
        this.selectConcept = this.selectConcept.bind(this);
    }

    getTitle() {
        return (
            <h2>Mapping Editor</h2>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.questionId != this.props.questionId && this.props.questionId){
            this.loadQuestion();
            this.setState({
                conceptsDetail: [],
                manualConceptStatus: new ConceptManualStatus()
            });
        }
    }

    loadQuestion() {
        var self = this;
        var url = "http://localhost:8090/question/show?questionId="+this.props.questionId;

        fetch(url)
            .then(function(response) {
                self.setState({loading: false});
                return response.json()
            }).then(function(json) {
                var conceptTree = new ConceptTree(json);
                var colorManager = new Manager(new DefaultColorSet());

                self.setState({
                    rawJson: json,
                    conceptTree: conceptTree,
                    colorManager: colorManager
                });
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
    }

    selectConcept(concept, event) {
        let {conceptsDetail} = this.state;

        if(event.target.checked) {
            conceptsDetail.push(concept);

        }else {
            for(var i = 0; i < conceptsDetail.length; i++) {
                if(conceptsDetail[i].id == concept.id) {
                    conceptsDetail.splice(i, 1);
                }
            }
        }

        this.setState({
            conceptsDetail: conceptsDetail
        });
    }

    render() {
        let {rawJson, conceptsDetail, conceptTree, colorManager, manualConceptStatus} = this.state;
        let {explorerConcepts} = this.props;

        if(conceptTree) {
            conceptTree.applyManualConcepts(manualConceptStatus);
        }

        if(rawJson && this.props.questionId) {
            return (
                <Panel header={this.getTitle()}>
                    <QuestionWell languages={rawJson.lang} />
                    <Row>
                        <Col md={3}>
                            <Tree
                                concepts={rawJson.concepts}
                                activeConcepts={conceptsDetail}
                                onConceptSelect={this.selectConcept}
                                tree={conceptTree}
                                colorManager={colorManager}  />
                        </Col>
                        <Col md={9}>
                            <ConceptsDetail
                                concepts={conceptsDetail}
                                explorerConcepts={explorerConcepts}
                                onManualConcept={::this.onManualConcept}
                                colorManager={colorManager}/>
                        </Col>
                    </Row>
                </Panel>
            );
        }else {
            return null;
        }
    }

    onManualConcept(concept, action) {
        let {manualConceptStatus} = this.state;

        if(action == "show") {
            manualConceptStatus.showConcept(concept);
        }
        if(action == "hide") {
            manualConceptStatus.hideConcept(concept);
        }

        this.setState({
            manualConceptStatus: manualConceptStatus
        });
    }

}

export default MappingEditor;
