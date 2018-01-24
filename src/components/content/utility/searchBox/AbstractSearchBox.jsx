import React from 'react';
import {FormGroup, InputGroup, FormControl, Button, Panel, Checkbox} from 'react-bootstrap';
import classNames from 'classnames/bind';

class AbstractSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.toogleOptions = this.toogleOptions.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.getOptionsClass = this.getOptionsClass.bind(this);

        this.state = {
            showOptions: false,
            hasOptions: false,
            timeout: 500,
            options: {
                searchText: ''
            }
        };
    }

    componentWillMount() {
       this.timer = null;
   }

    toogleOptions() {
        this.setState({
            showOptions: !this.state.showOptions
        });
    }

    getOptionsClass() {
        return classNames(
            'search-options',
            {'show': this.state.showOptions}
        );
    }

    changeSearch(e) {
        var options = this.state.options;
        options.searchText = e.target.value;

        clearTimeout(this.timer);

        this.setState({options: options, showOptions: false});
        this.props.onLoadingState();

        this.timer = setTimeout(
            () => this.props.onSearch(Object.assign({}, options)),
            this.state.timeout
        );
    }

    render() {
        let {showOptions, hasOptions} = this.state;

        return (
            <FormGroup className={"search"}>
                <InputGroup className={"search-input"}>
                    <FormControl type="text" placeholder={"search..."} onChange={this.changeSearch}/>
                    <InputGroup.Button>
                        <Button bsStyle={"default"}>
                            <span className="glyphicon glyphicon-search" />
                        </Button>
                        {hasOptions &&
                            <Button bsStyle={"primary"} onClick={this.toogleOptions}>
                                <span className="glyphicon glyphicon-cog" />
                            </Button>
                        }
                    </InputGroup.Button>
                </InputGroup>
                {::this.renderOptions()}
            </FormGroup>
        );
    }
    renderOptions() {
        return null;
    }
}

export default AbstractSearchBox;
