import React, { Component } from "react";
import ApiFormContainer from "../containers/ApiFormContainer";

import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

export default class Home extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.api.error != prevProps.api.error &&
            this.props.api.error === true
        ) {
            Alert.alert(
                "Validation Error",
                "Please Fill input fields",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
            this.props.clearError();
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: (
                <TouchableWithoutFeedback onPress={() => params.handleConfig()}>
                    <View style={{ paddingRight: 15, paddingLeft: 15}}>
                        <Ionicons name="ios-settings" color="white" size={22} />
                    </View>
                </TouchableWithoutFeedback>
            ),
            title: "Lapse"
        };
    };

    configureApi = () => {
        this.openModal();
    };

    state = {
        modalVisible: false
    };

    openModal = () => {
        this.setState({
            modalVisible: true
        });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    componentDidMount() {
        this.props.fetchLapse();
        this.props.navigation.setParams({ handleConfig: this.configureApi });
    }

    onRefresh = () => {
        this.props.fetchLapse();
    };

    pressDetail = lapse => {
        this.props.navigation.navigate("Detail", { item: lapse });
    };

    getButtonDescription = () => {
        let { deleteLapsesStatus } = this.props;

        return deleteLapsesStatus === true ? "Deleting" : "Delete All Lapses";
    };

    render() {
        let { lapses, lapsesStatus, clearLapse } = this.props;
        return (
            <View style={styles.container}>
                <ApiFormContainer
                    modalVisible={this.state.modalVisible}
                    closeModal={this.closeModal}
                />
                {lapsesStatus === true ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <ActivityIndicator size="small" color="#6c7ae0" />
                    </View>
                ) : (
                    <FlatList
                        data={lapses}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.onRefresh}
                            />
                        }
                        ListHeaderComponent={
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}
                                >
                                    Self Hosted Error Tracking system
                                </Text>
                            </View>
                        }
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => this.pressDetail(item)}
                            >
                                <Text style={{ color: "#7ec699" }}>
                                    ID : {item.id}
                                </Text>
                                <Text style={{ color: "#7ec699" }}>
                                    TITLE : {item.title}
                                </Text>
                                <Text style={{ color: "#7ec699" }}>
                                    CLASS : {item.class}
                                </Text>
                                <Text style={{ color: "#7ec699" }}>
                                    METHOD :{item.method}
                                </Text>
                                <Text style={{ color: "#7ec699" }}>
                                    URL : {item.url}
                                </Text>
                                <Text style={{ color: "#7ec699" }}>
                                    PAYLOAD : {item.payload}
                                </Text>
                            </TouchableOpacity>
                        )}
                        automaticallyAdjustContentInsets={false}
                        keyExtractor={function(item, id) {
                            return "lapse-" + item.id;
                        }}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 0.6,
                                    backgroundColor: "#e8e8e8"
                                }}
                            />
                        )}
                        ListFooterComponent={
                            <TouchableOpacity
                                style={{
                                    // backgroundColor: "red",
                                    padding: 15,
                                    marginBottom: 20,
                                    borderRadius: 10
                                }}
                                onPress={() => clearLapse()}
                            >
                                {lapses.length > 0 && (
                                    <Text
                                        style={{
                                            color: "red",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            fontSize: 15
                                        }}
                                    >
                                        {this.getButtonDescription()}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        }
                        numColumns={1}
                    />
                )}
            </View>
        );
    }
}
