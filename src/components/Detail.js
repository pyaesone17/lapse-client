import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import styles from "../styles";

export default class Detail extends Component {
    static navigationOptions = {
        title: "Detail"
    };

    getButtonDescription = () => {
        let { item } = this.props.navigation.state.params;
        let { deleteLapsesStatus, deleted } = this.props;

        if (deleted.includes(item.id)===true) {
            return "Deleted";
        }

        return deleteLapsesStatus === true ? "Deleting" : "Delete Lapse";
    };

    render() {
        let { item } = this.props.navigation.state.params;
        let { deleteLapse } = this.props;
        return (
            <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.id}</Text>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Title</Text>
                        <Text style={{ color: "#3f3f3f" }}>{item.title}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Class</Text>
                        <Text style={{ color: "#3f3f3f" }}>{item.class}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Method</Text>
                        <Text style={{ color: "#3f3f3f" }}>{item.method}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Url</Text>
                        <Text style={{ color: "#3f3f3f" }}>{item.url}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Payload</Text>
                        <Text style={{ color: "#3f3f3f" }}>{item.payload}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={{ color: "#7ec699" }}>{item.content}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#6c7ae0",
                        padding: 15,
                        marginBottom: 20,
                        borderRadius: 10
                    }}
                    onPress={()=>
                        deleteLapse({ id: item.id})
                    }
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold"
                        }}
                    >
                        {this.getButtonDescription()}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
