import React from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.css';

class MappingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: this.isManual(props.concept)
        };
    }

    render() {
        let {concept} = this.props;
        let {clicked} = this.state;

        var classes = classNames(
            "glyphicon", "glyphicon-star",
            {[styles.checkedStar]: clicked}
        );

        return (
            <span className={classes} onClick={::this.toggleButton}></span>
        );
    }

    isManual(concept) {
        return concept.annotator.hasOwnProperty("manual");
    }

    toggleButton(e) {
        let {clicked} = this.state;
        let {concept} = this.props;

        if(clicked) {
            this.removeManualMapping(concept);
        }else {
            this.addManualMapping(concept);
        }

        this.setState({
            clicked: !clicked
        });
    }

    addManualMapping(concept) {
        fetch("http://localhost:8090/question/addConcept?conceptId="+concept.id+"&questionId="+concept.questionId);
        this.props.onManualConcept(concept, "show");
    }

    removeManualMapping(concept) {
        fetch("http://localhost:8090/question/removeConcept?conceptId="+concept.id+"&questionId="+concept.questionId);
        this.props.onManualConcept(concept, "hide");
    }

}

export default MappingButton;
