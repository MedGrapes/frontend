import React from 'react';
import {FormGroup, InputGroup, FormControl, Button, Panel, Checkbox} from 'react-bootstrap';
import AbstractSearchBox from './AbstractSearchBox.jsx';
import classNames from 'classnames/bind';

class ConceptSearchBox extends AbstractSearchBox {
    constructor(props) {
        super(props);

        this.state.timeout = 1000;
        this.state.hasOptions = true;
        this.state.options = Object.assign(this.state.options, {
            accessionSearch: true,
            synonymSearch: false,
            nameSearch: false
        });
    }

    changeAccessionSearch(e) {
        var options = this.state.options;
        options.accessionSearch = e.target.checked;

        this.setState({options: options});
    }

    changeNameSearch(e) {
        var options = this.state.options;
        options.nameSearch = e.target.checked;

        this.setState({options: options});
    }

    changeSynonymSearch(e) {
        var options = this.state.options;
        options.synonymSearch = e.target.checked;

        this.setState({options: options});
    }

    renderOptions() {
        return (
            <InputGroup className={this.getOptionsClass()}>
                <Panel>
                    <h3 style={{'marginTop': 0}}>Fulltext Search</h3>
                    <FormGroup>
                        <Checkbox defaultChecked onChange={::this.changeAccessionSearch}>
                            accession id
                        </Checkbox>
                        <Checkbox onChange={::this.changeNameSearch}>
                            concept name property
                        </Checkbox>
                        <Checkbox onChange={::this.changeSynonymSearch}>
                            concept synonym property
                        </Checkbox>
                     </FormGroup>
                </Panel>
            </InputGroup>
        );
    }
}

export default ConceptSearchBox;
