import React from 'react';

class AbstractExplorer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: 0,
            rawJson: null,
            items: []
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        this.hasMore = this.hasMore.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderListItem = this.renderListItem.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({windowHeight: window.innerHeight});
    }

    getTitle(){};
    renderListItem(){};

    handleClick(id, e) {
        console.log(e.target);
        let {onItemSelect} = this.props;

        // onItemSelect(e.target.dataset.id);
        onItemSelect(id);
    }

    checkActive(id) {
        if(this.props.activeItem == id){
            return true;
        }else{
            return false;
        }
    }



}
export default AbstractExplorer;
