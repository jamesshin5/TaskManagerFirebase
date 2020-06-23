import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }


    addTask = (text) => {
        console.log(this.selectedList)
        firebase.firestore().collection('Lists').where("name", "==", this.props.listName)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    firebase.firestore().collection("Lists").doc(doc.id)
                    .update({tasks: firebase.firestore.FieldValue.arrayUnion({name: text, id: Math.random().toString()})});
                   
                });
            })

        this.setState({ text: "" });
    };
    

    render() {
        return (
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Add an item..."
                    style={{
                        borderWidth: 1,
                        borderColor: "#f2f2e1",
                        backgroundColor: "#eaeaea",
                        height: 50,
                        flex: 1,
                        padding: 10,
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        this.addTask(this.state.text);
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            backgroundColor: "#eaeaea",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name="md-add"
                            size={30}
                            style={{ color: "#ADD8E6", padding: 10 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect()(AddTask);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
