import React from 'react';
import {ConceptSearchBox, LoadedText} from './utility';
import AbstractExplorer from './AbstractExplorer.jsx'
import {ConceptManager} from '../../service';
import InfiniteScroll from 'react-infinite-scroller';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'whatwg-fetch';

class ConceptExplorer extends AbstractExplorer {
    constructor(props) {
        super(props);

        this.conceptManager = new ConceptManager("");

        var selected = new Map();
        this.state = Object.assign(this.state, {
            selected: selected
        });

        this.onLoadingState = this.onLoadingState.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        var selected = new Map();

        if(prevProps.activeDocument != this.props.activeDocument) {
            this.setState({
                rawJson: null,
                items: [],
                selected: selected
            });
        }
    }

    onSearch(options) {
        this.setState({
            searchOptions: options,
            rawJson: null,
            items: []
        });
        this.loadMore(1);
    }

    onLoadingState() {
        this.setState({
            loading: true
        });
    }

    loadMore(page) {
        let {searchOptions} = this.state;

        var self = this;

        var url = 'http://localhost:8090/concept/search?page='+page+'&search='+searchOptions.searchText;
        if(searchOptions.accessionSearch) {
            url += "&isAccessionSearch=true";
        }
        if(searchOptions.synonymSearch) {
            url += "&isSynonymSearch=true";
        }
        if(searchOptions.nameSearch) {
            url += "&isNameSearch=true";
        }

        fetch(url)
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                var items = self.state.items;
                json.items.map((item) => {
                    items.push(item);
                });

                self.setState({
                    rawJson: json,
                    items: items,
                    loading: false
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

    handleClick(item, event) {
        var selected = this.state.selected;
        if(selected.has(item.id)) {
            selected.delete(item.id);

            this.props.syncConcepts(selected);
            this.setState({selected: selected});
        }else{
            item = Object.assign(item, {
                questionId: this.props.activeQuestion
            });

            var callback = function(item, property) {
                Object.assign(item, {
                    property: property,
                    annotator: {}
                });
                selected.set(item.id, item);
                this.props.syncConcepts(selected);
                this.setState({selected: selected});
            }
            callback = callback.bind(this, item);
            this.conceptManager.getConceptProperty(item.id, callback);

        }


    }

    checkActive(id) {
        return this.state.selected.has(id);
    }

    render() {
        let {rawJson, items, windowHeight, loading} = this.state;
        let {className} = this.props;

        var renderItems = [];

        items.map((item) => {
            renderItems.push(this.renderListItem(item));
        });

        return (
            <div className={className}>
                <ConceptSearchBox onSearch={this.onSearch} onLoadingState={this.onLoadingState} />
                <ListGroup style={ {height: (windowHeight-390) + "px"}}>
                {loading &&
                    <div className={"spinner"}>
                        <span className={"glyphicon glyphicon-refresh glyphicon-animate-spin"}></span>
                    </div>
                }
                {items.length > 0 &&
                    <InfiniteScroll
                        pageStart={2}
                        loadMore={this.loadMore.bind(this)}
                        initialLoad={false}
                        hasMore={this.hasMore()}
                        loader={<div className="loader">Loading ...</div>}
                        useWindow={false}
                    >
                        {renderItems}
                    </InfiniteScroll>

                }
                </ListGroup>
                <LoadedText rawJson={rawJson} />
            </div>
        );
    }
    renderListItem(item) {
        return (
            <ListGroupItem
                key={item.id}
                style={{paddingBottom: "2px"}}
                active={this.checkActive(item.id)}
                onClick={this.handleClick.bind(this, item)}>
                {item.name}
            </ListGroupItem>
        );
    }
}

export default ConceptExplorer;
