import React from 'react';
import styles from './Tree.css';

class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: []}
        this.counter = 0;

        this.isNodeExpanded = this.isNodeExpanded.bind(this);
        this.isSubNodeExpanded = this.isSubNodeExpanded.bind(this);
    }

    componentWillUpdate(prevProps, prevState) {
        this.counter = 0;
    }

    componentDidUpdate(nextProps, nextState) {
        if(this.props.concepts != nextProps.concepts) {
            this.setState({
                expanded: [],
            });
        }
    }

    render() {
        let {concepts, tree} = this.props;
        console.log(tree);
        var items = [];
        var self = this;

        tree.getAnnotator().forEach(function(annotator) {
            items.push(::self.renderAnnotator(annotator));
        });

        return (
            <ul className={styles.tree}>
                {items}
            </ul>
        );
    }
    renderAnnotator(annotator) {
        let {tree} = this.props;
        var key = "a__"+annotator;
        var self = this;
        var items = [];

        if(annotator == "reference" || annotator == "manual") {
            tree.getConcepts(annotator, "default").forEach(function(val, key) {
                items.push(::self.renderConcept(val));
            });
        }else {
            tree.getParameter(annotator).forEach(function(parameter) {
                items.push(::self.renderParameter(annotator, parameter));
            });
        }

        return (
            <li key={key}>
                <input type="checkbox" id={key} checked={::this.isAnnotatorNodeExpanded(key, annotator)} onChange={this.treeChange.bind(this, key)} />
                <label className={styles.tree_label} htmlFor={key}>{annotator}</label>

                <ul>
                    {items}
                </ul>
            </li>
        );

    }

    renderParameter(annotator, parameter) {
        let {tree} = this.props;
        var key = "a__"+annotator+"p__"+parameter;
        var self = this;
        var items = [];

        tree.getConcepts(annotator, parameter).forEach(function(val, key) {
            items.push(::self.renderConcept(val));
        });

        return (
            <li key={key}>
                <input type="checkbox" id={key} checked={::this.isParameterNodeExpanded(key, annotator, parameter)} onChange={this.treeChange.bind(this, key)} />
                <label className={styles.tree_label} htmlFor={key}>{parameter}</label>

                <ul>
                    {items}
                </ul>
            </li>
        );
    }

    renderConcept(concept) {
        let {colorManager} = this.props;
        var key = "c__" + concept.id;
        var style = {};

        if(this.isSubNodeExpanded(concept.id)) {
            style = {color: colorManager.getColor(concept.id).getFont()};
            console.log(colorManager.getColor(concept.id));
        }

        return (
            <li key={key} style={style}  className={styles.sub_tree} >
                <input type="checkbox" id={key} data-concept={concept} checked={this.isSubNodeExpanded(concept.id)} onChange={this.props.onConceptSelect.bind(this, concept)} />
                <label htmlFor={key} className={styles.tree_label}>{concept.name}</label>
            </li>
        );

    }

    treeChange(id, event) {
        let {expanded} = this.state;

        if(event.target.checked) {
            expanded.push(id);

        }else {
            for(var i = 0; i < expanded.length; i++) {
                if(expanded[i] == id) {
                    expanded.splice(i, 1);
                }
            }
        }

        this.setState({
            expanded: expanded
        });

    }
    isAnnotatorNodeExpanded(id, annotator) {
        let{tree, activeConcepts} = this.props;

        if(tree.annotatorHasConcept(activeConcepts, annotator)) {
            return true;
        }

        return this.isNodeExpanded(id);
    }

    isParameterNodeExpanded(id, annotator, parameter) {
        let{tree, activeConcepts} = this.props;

        if(tree.parameterHasConcept(activeConcepts, annotator, parameter)) {
            return true;
        }

        return this.isNodeExpanded(id);
    }

    isNodeExpanded(id) {

        if(this.state.expanded.indexOf(id) >= 0) {
            return true;
        }else {
            return false;
        }
    }

    isSubNodeExpanded(id) {
        let {activeConcepts, tree} = this.props;


        for(var i = 0; i < activeConcepts.length; i++) {
            if(activeConcepts[i].id == id) {
                return true;
            }
        }

        return tree.isManualConceptActive(id);

        return false;
    }


}

export default Tree
