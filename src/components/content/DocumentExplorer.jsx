import React from 'react';
import AbstractExplorer from './AbstractExplorer.jsx';
import {LoadedText, DocumentSearchBox, MappingCount} from './utility';
import InfiniteScroll from 'react-infinite-scroller';
import {Panel, FormGroup, Checkbox, InputGroup, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'whatwg-fetch';

class DocumentExplorer extends AbstractExplorer {
    constructor(props) {
        super(props);

        this.onLoadingState = this.onLoadingState.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.state = Object.assign(this.state, {
            loading: true,
            searchOptions: {
                docSearch: true,
                questionSearch: false,
                searchText: ''
            }
        });
    }

    getTitle() {
        return (
            <div>
                <span>
                    Document Explorer
                </span>
            </div>
        );
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadMore(1);
    }

    componentDidUpdate(prevProps, prevState) {
        let {searchOptions} = this.state;

        if(searchOptions.searchText != prevState.searchOptions.searchText) {
            this.setState({
                items: [],
                loading: true
            });
            this.loadMore(1);
        }
    }

    onSearch(options) {
        this.setState({
            searchOptions: options,
            rawJson: null,
            items: []
        });
    }

    onLoadingState() {
        this.props.onResetExplorer();
        this.setState({
            loading: true
        });
        this.forceUpdate();
    }

    loadMore(page) {
        let {searchOptions} = this.state;
        var self = this;

        var url = 'http://localhost:8090/document/list?page='+page;
        if(searchOptions) {
            if(searchOptions.searchText) {
                url += '&search='+searchOptions.searchText;
            }
            url += "&isDocSearch="+searchOptions.docSearch;
            url += "&isQuestionSearch="+searchOptions.questionSearch;
        }
        fetch(url)
            .then(function(response) {
                self.setState({loading: false});

                return response.json()
            }).then(function(json) {
                var items = self.state.items;
                json.items.map((item) => {
                    items.push(item);
                });

                self.setState({
                    rawJson: json,
                    items: items
                });
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
    }

    hasMore() {
        let {rawJson} = this.state;

        if(rawJson) {
            return (rawJson.meta.page * rawJson.meta.pageSize) <= rawJson.meta.itemCount;
        }

        return true;
    }
    render() {
        let {showSidebar, onResetExplorer, activeItem} = this.props;
        let {rawJson, items, windowHeight, loading} = this.state;

        var renderItems = [];

        items.map((item) => {
            renderItems.push(this.renderListItem(item));
        });

        return (
            <div className={"documentExplorer"}>
                <Panel header={this.getTitle()}>
                    <DocumentSearchBox onSearch={this.onSearch} onLoadingState={this.onLoadingState}/>
                    <ListGroup style={ {maxHeight: (windowHeight-390) + "px"}}>
                        {loading &&
                            <div className={"spinner"}>
                                <span className={"glyphicon glyphicon-refresh glyphicon-animate-spin"}></span>
                            </div>
                        }
                        {this.renderListGroupContent(renderItems, loading)}
                    </ListGroup>

                    {!loading &&
                        <LoadedText rawJson={rawJson} />
                    }

                    {showSidebar &&
                        <div className={"verticalTitle panel-heading" } onClick={() => onResetExplorer(null)}>
                            {this.getTitle()}
                        </div>
                    }
                </Panel>
            </div>
        );
    }

    renderListGroupContent(renderItems, loading) {
        if(renderItems.length > 0) {
            return (
                <InfiniteScroll
                    key={1}
                    pageStart={1}
                    loadMore={this.loadMore.bind(this)}
                    hasMore={this.hasMore()}
                    loader={<div className="loader">Loading ...</div>}
                    useWindow={false}
                >
                    {renderItems}
                </InfiniteScroll>);
        }else {
            return (
                <div key={2}>No items found</div>
            );
        }

    }
    renderListItem(item) {
        return (
            <ListGroupItem
                key={item.id}
                active={super.checkActive(item.id)}
                onClick={this.handleClick.bind(this, item.id)}
                style={{paddingBottom: "2px"}}>
                {item.name}
                <span className={"badge"}>{item.questionCount}</span>
                <MappingCount annotator={item.annotator} />
            </ListGroupItem>
        );
    }
}

export default DocumentExplorer;
