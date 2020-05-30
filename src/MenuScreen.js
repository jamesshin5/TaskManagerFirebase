import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import { connect } from 'react-redux'

import AddList from './containers/AddList'
import lists from './reducers/lists'

class MenuScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', width: '100%' }}>

                    <AddList />

                    <View style={{ padding: 20, width: '100%' }}>
                        {this.props.lists.map(list =>
                            <View style={{ paddingTop: 10 }}>
                                <TouchableOpacity key={list.id} onPress={() => this.props.navigation.navigate('Tasks', { title: list.name, chosenID: list.id })}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '200',
                                        color: 'grey'
                                    }}>{list.name}</Text>
                                </TouchableOpacity>
                            </ View>
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    lists: state,
});

// const mapDispatchToProps = (dispatch) => ({
//     deleteList: (id) =>
//         dispatch({
//             type: 'DELETE_LIST',
//             id,
//         }),
// });


export default connect(mapStateToProps)(MenuScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    listInput: {
        padding: 20,
    }
});