import React from 'react';
import {FormGroup, InputGroup, FormControl, Button, Panel, Checkbox} from 'react-bootstrap';
import AbstractSearchBox from './AbstractSearchBox.jsx';
import classNames from 'classnames/bind';

class DocumentSearchBox extends AbstractSearchBox {
    constructor(props) {
        super(props);

        this.state.hasOptions = true;
        this.state.options = Object.assign(this.state.options, {
            docSearch: true,
            questionSearch: false,
        });
    }

    changeDocSearch(e) {
        var options = this.state.options;
        options.docSearch = e.target.checked;

        this.setState({options: options});
    }

    changeQuestionSearch(e) {
        var options = this.state.options;
        options.questionSearch = e.target.checked;

        var timeout = 500;
        if(e.target.checked) {
            timeout = 1000;
        }

        this.setState({options: options, timeout: timeout});
    }

    renderOptions() {
        return (
            <InputGroup className={this.getOptionsClass()}>
                <Panel>
                    <h3 style={{'marginTop': 0}}>Fulltext Search</h3>
                    <FormGroup>
                        <Checkbox defaultChecked onChange={::this.changeDocSearch}>
                            document names
                        </Checkbox>
                        <Checkbox onChange={::this.changeQuestionSearch}>
                            question text
                        </Checkbox>
                     </FormGroup>
                </Panel>
            </InputGroup>
        );
    }
}

export default DocumentSearchBox;
