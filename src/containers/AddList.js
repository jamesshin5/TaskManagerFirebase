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

class AddList extends React.Component {
    state = {
        text: "",
    };

    addList = (text) => {
        this.props.dispatch({ type: "ADD_LIST", text });
        this.setState({ text: "" });
    };

    render() {
        return (
            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    placeholder="Add a list..."
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
                        this.addList(this.state.text);
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
                            style={{ color: "#de9595", padding: 10 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect()(AddList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
