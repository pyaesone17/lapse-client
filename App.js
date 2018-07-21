import React from "react";
import { AsyncStorage, Text } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./src/store/reducers";
import mySaga from "./src/store/sagas";
import createSagaMiddleware from "redux-saga";
import { createStackNavigator } from "react-navigation";

import HomeContainer from "./src/containers/HomeContainer";
import DetailContainer from "./src/containers/DetailContainer";
import { setApiToState } from "./src/store/actions";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeContainer
        },
        Detail: {
            screen: DetailContainer
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#6c7ae0"
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
                color: "white"
            }
        }
    }
);

export default class App extends React.Component {
    state = {
        render: false
    };

    async componentDidMount() {
        const url = await AsyncStorage.getItem("url");
        const secret = await AsyncStorage.getItem("secret");

        store.dispatch(
            setApiToState({
                url,
                secret
            })
        );
        this.setState({
            render: true
        });
    }

    render() {
        if (this.state.render === false) {
            return <Text>Loading</Text>;
        }
        return (
            <Provider store={store}>
                <HomeStack />
            </Provider>
        );
    }
}
