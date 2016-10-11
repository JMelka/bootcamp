import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from "react-redux";

class Main extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        var tweets = this.props.tweets.map((val) => {
            return <li>{val}</li>
        });
        return (
            <div>
                <h1>{this.props.user}'s tweets: 
                    <ul>{tweets}</ul>
                </h1>
            </div>
        );
    }
}
var fn = connect((state) => {
    return {
        user: state.user,
        tweets: state.tweets,
    };
});
Main = fn(Main);

var initState = {
    user: 'Bill',
    tweets: ['I like cats.', 'Also food.']
};
const store = createStore(function (state = initState, action) {
    return state;
});

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    app
);