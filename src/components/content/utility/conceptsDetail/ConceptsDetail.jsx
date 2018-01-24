import React from 'react';
import DetailPanel from './DetailPanel.jsx';

class ConceptsDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {concepts, explorerConcepts} = this.props;
        var items = [];

        if(explorerConcepts) {
            for(var val of explorerConcepts.values()) {
                items.push(val);
            }
        }
        console.log("--");
        console.log(concepts);

        console.log(items);

        return (
            <div style={{"overflow-y": "auto"}}>
                <div style={{width: ((concepts.length + items.length) * 300) + "px"}}>
                    {concepts.map(::this.renderDetail)}
                    {items.map(::this.renderDetail)}
                </div>
            </div>
        );
    }

    renderDetail(item) {
        return (
            <DetailPanel
                key={item.id}
                concept={item}
                colorManager={this.props.colorManager}
                onManualConcept={this.props.onManualConcept} />
        );
    }

}

export default ConceptsDetail;
