import React from 'react';

class ProgressItem extends React.Component {
    constructor(props) {
        super(props);
    }
    circleClass() {
        let {active, done} = this.props;

        if(done) {
            return 'circle done';
        }
        if(active) {
            return 'circle active';
        }

        return 'circle';
    }
    barClass() {
        let {done, active} = this.props;

        if(done) {
            return 'bar done';
        }
        if(active) {
            return 'bar active';
        }

        return 'bar';
    }

    render() {
        let {lastItem, label, title, done} = this.props;

        return (
            <div className={"progress-item"}>
                <div className={this.circleClass()}>
                    <span className={"circle-label"}>{done ? '✓' : label}</span>
                    <span className={"title"}>{title}</span>
                </div>
                {(!lastItem) &&
                    <span className={this.barClass()}></span>
                }
            </div>
        );
    }
}
ProgressItem.defaultProps = {
    lastItem: false,
    active: false,
    done: false,
    label: '',
    title: ''
};

export default ProgressItem;
