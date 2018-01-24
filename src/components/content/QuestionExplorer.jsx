import React from 'react';
import AbstractExplorer from './AbstractExplorer.jsx'
import {LoadedText, MappingCount} from './utility';
import InfiniteScroll from 'react-infinite-scroller';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import 'whatwg-fetch';

class QuestionExplorer extends AbstractExplorer {
    getTitle() {
        return (
            <h2>Questions</h2>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeDocument != this.props.activeDocument) {
            this.setState({
                rawJson: null,
                items: []
            });
            this.loadMore(1);
        }
    }
    loadMore(page) {
        let {activeDocument} = this.props;
        if(!activeDocument) return;

        var self = this;

        fetch('http://localhost:8090/question/list?page='+page+'&documentId='+activeDocument)
            .then(function(response) {
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
        if(this.props.activeDocument == null){
            return (<div> </div>);
        }

        let {rawJson, items, windowHeight} = this.state;
        let {className} = this.props;

        var renderItems = [];

        items.map((item) => {
            renderItems.push(this.renderListItem(item));
        });

        return (
            <div className={className}>
                <ListGroup style={ {height: (windowHeight-342) + "px"}}>
                    {items.length > 0 &&
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.loadMore.bind(this)}
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
                onClick={this.handleClick.bind(this, item.id)}>
                {item.value}
                <span className={"badge"}>{item.questionCount}</span>
                <MappingCount annotator={item.annotator} />
            </ListGroupItem>
        );
    }
}

export default QuestionExplorer;
