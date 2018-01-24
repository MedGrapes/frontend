import React from 'react';
import styles from './Utility.css';
import classNames from 'classnames/bind';


class MappingCount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameter: []
        };

        this.renderAnnotator = this.renderAnnotator.bind(this);
    }

    render() {
        let {annotator} = this.props;
        let {parameter} = this.state;

        return (
            <div className={styles.mappingCount}>
                {annotator.map(this.renderAnnotator)}
                {parameter.length > 0 &&
                    <div className={styles.paramCount}>
                        <ul>
                            {parameter.map(this.renderParameter)}
                        </ul>
                    </div>
                }
            </div>
        );
    }

    renderAnnotator(item, index) {
        var className = classNames({
            [styles.active]: item.parameter == this.state.parameter,
            [styles.expandElement]: item.parameter
        });

        var onClickListener = this.onAnnotatorSelect.bind(this, item.parameter);
        if(!item.parameter) {
            onClickListener = null;

        }

        if(item.count > 0) {
            return (
                <span key={index} className={className} onClick={onClickListener}>{item.annotator} <i>{item.count}</i></span>
            );
        }else {
            return null;
        }
    }

    renderParameter(item, index) {
        return (
            <li key={index}>{item.parameter} <i>{item.count}</i></li>
        );
    }

    onAnnotatorSelect(item, event) {
        event.stopPropagation();
        if(item == this.state.parameter) {
            this.setState({parameter: []});
        }else {
            this.setState({
                parameter: item
            });
        }
    }
}

export default MappingCount;
