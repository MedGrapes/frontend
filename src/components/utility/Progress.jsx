import React from 'react';
import ProgressItem from './ProgressItem.jsx';

class Progress extends React.Component {
    render() {
        let {progressState} = this.props;

        return (
            <div className={"progress-container"}>
                <ProgressItem title={"Select Document"} label={1} active={progressState == 0} done={progressState > 0} />
                <ProgressItem title={"Select Question"} label={2} active={progressState == 1} done={progressState > 1} />
                <ProgressItem title={"Check Annotation"} label={3} lastItem={true} active={progressState == 2} done={progressState > 2} />
            </div>
        );
    }
}

Progress.defaultProps = {
    progressState: 0
}

export default Progress;
