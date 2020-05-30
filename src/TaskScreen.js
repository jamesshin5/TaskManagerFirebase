import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import AddTask from './containers/AddTask'
import { connect } from 'react-redux';



class TaskScreen extends Component {

    deleteTask = (id) => {
        this.props.dispatch({
            type: 'DELETE_TASK',
            listID: this.props.route.params.chosenID,
            id,
        })
    }

    deleteList = (id) => {
        this.props.dispatch({
            type: 'DELETE_LIST',
            id,
        })
    }

    deletePressHandler = () => {
        this.deleteList(this.props.route.params.chosenID)
        this.props.navigation.navigate('Home')
    }


    list = this.props.lists.find(list => list.id === this.props.route.params.chosenID)

    render() {
        this.props.navigation.setOptions({
            headerTitle: this.props.route.params.title,
            headerRight: () => (
                <Button
                    onPress={() => this.deletePressHandler()}
                    title="Delete"
                    color="#de9595"
                />
            ),
        });

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', width: '100%' }}>

                    <AddTask listID={this.props.route.params.chosenID} />

                    <View style={{ padding: 20, width: '100%' }}>
                        {this.list.tasks.map(task =>
                            <View style={{ paddingTop: 10 }}>
                                <TouchableOpacity key={task.id} onPress={() => this.deleteTask(task.id)}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '200',
                                        color: 'grey'
                                    }}>{task.name}</Text>
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

export default connect(mapStateToProps)(TaskScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
});
