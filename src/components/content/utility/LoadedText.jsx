import React from 'react';

class LoadedText extends React.Component {
    render() {
        let {rawJson} = this.props;
        if(rawJson && rawJson.meta) {
            var meta = rawJson.meta;
        }
        if(meta) {
            return (
                <div className={"hint"}>
                    <small>loaded {Math.min(meta.page * meta.pageSize, meta.itemCount)} from {meta.itemCount} entries</small>
                </div>
            );
        }else{
            return null;
        }
    }
}

export default LoadedText;
