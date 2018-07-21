import React, { Component } from "react";
import { View, Modal, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import styles from "../styles";

export default class ApiForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url : props.api.url,
            secret : props.api.secret
        }
    }

    
    handleChange = (name, value) => {
        this.setState({
            [name] : value
        })
    }   

    handleSubmit = () => {
        if(this.state.url===""||this.state.secret===""){
            Alert.alert(
                'Validation Error',
                'Please Fill input fields',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        }
        this.props.setApi({
            ...this.state
        })
        this.props.closeModal()

        setTimeout(() => 
            this.props.fetchLapse()
        ,500)
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                >
                    <TouchableOpacity
                        onPress={this.props.closeModal}
                        style={{ paddingRight: 10, height: 50 }}
                    >
                        <View>
                            <Text style={{ fontWeight: 'bold', textAlign: 'right'}}>CLOSE</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: "100%",
                            marginTop: 20,
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', textAlign:'left'}}>URL</Text>
                        <TextInput
                            placeholder="https://example.com/lapse"
                            style={{
                                height: 40,
                                borderColor: "gray",
                                marginTop: 10,
                                padding: 0,
                                marginBottom: 20,
                                borderBottomWidth: 1,
                                width: "100%"
                            }}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            onChangeText={(value) => this.handleChange("url",value)}
                            value={this.state.url}
                        />
                    </View>

                    <View
                        style={{
                            width: "100%",
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', textAlign:'left'}}>SECRET</Text>
                        <TextInput
                            placeholder="secretkey"
                            style={{
                                height: 40,
                                borderColor: "gray",
                                marginTop: 0,
                                padding: 0,
                                marginBottom: 10,
                                borderBottomWidth: 1,
                                width: "100%"
                            }}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            onChangeText={(value) => this.handleChange("secret",value)}
                            value={this.state.secret}
                        />
                    </View>
                    <View
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#6c7ae0",
                                marginBottom: 10,
                                borderRadius: 5,
                                width: "100%",
                                padding: 15
                            }}
                            onPress={this.handleSubmit}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 15
                                }}
                            >
                                Set Api
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        );
    }
}
