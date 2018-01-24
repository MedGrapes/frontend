import React from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.css';
import MappingButton from './MappingButton.jsx';


class DetailPanel extends React.Component {
    constructor(props) {
        super(props);

        this.renderProperties = this.renderProperties.bind(this);
    }

    render() {
        let {concept, colorManager} = this.props;

        var items = concept.property.map(this.renderProperties);
        var color = colorManager.getColor(concept.id).getBackground();

        return (
            <div className={classNames("panel", "panel-default", styles.panel)}>
                <div className={"panel-heading"} style={{backgroundColor: color}}>
                    {concept.name}
                    <MappingButton
                        concept={concept}
                        onManualConcept={this.props.onManualConcept} />
                </div>
                <table className={"table"}>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }

    renderProperties(item, index) {
        switch(item.name) {
            case "definition":
                return this.renderDefinition(item, index);
            break;
            default:
                return this.renderDefaultProp(item, index);
            break;
        }

    }
    renderDefinition(item, index) {
        if(item.value.length > 150) {
            return ([
                <tr key={index+"def_head"}>
                    <td className={styles.hintText} colSpan={2}>
                        {item.name}
                    </td>
                </tr>,
                <tr key={index+"def_body"}>
                    <td className={styles.defBody} colSpan={2}>[...]</td>
                </tr>]
            );
        }else {
            return ([
                <tr key={index+"def_head"}>
                    <td className={styles.hintText} colSpan={2}>{item.name}</td>
                </tr>,
                <tr key={index+"def_body"}>
                    <td className={styles.defBody} colSpan={2}>{item.value}</td>
                </tr>]
            );
        }
    }
    renderDefaultProp(item, index)  {
        return (
            <tr key={index}>
                <td className={styles.hintText}>{item.name}</td>
                <td>{item.value}</td>
            </tr>
        );
    }
}
export default DetailPanel;
