import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import AddTask from './containers/AddTask'
import { connect } from 'react-redux';



class TaskScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
        }
        var listString = this.props.route.params.title.toString();
    }
    
    componentDidMount() {
        var that = this;
        const ref = firebase.firestore().collection('Lists');
        var docRef = ref.where("name", "==", this.props.route.params.title)
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            var retrievedTasks = doc.get('tasks');
            console.log(retrievedTasks)
            that.setState({
                tasks: retrievedTasks
            })
        });
    })   
    }

    deleteTask = (title, taskID) => {
        firebase.firestore().collection('Lists').where('id', '==', this.props.route.params.chosenID)
        .get()
        .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    firebase.firestore().collection("Lists").doc(doc.id)
                    .update({tasks: firebase.firestore.FieldValue.arrayRemove({name: title, id: taskID})});
                   
                });
            })
    }

    deleteList = () => {

            firebase.firestore().collection('Lists').where("name", "==", this.props.route.params.title)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    firebase.firestore().collection("Lists")
                    .doc(doc.id)
                    .delete()
                    .then(() => {
                    console.log("Document successfully deleted!");
                    }).catch(error => {
                    console.error("Error removing document: ", error);
                    });
                });
            })

    }

    deletePressHandler = () => {
        this.deleteList()
        this.props.navigation.navigate('Home')
    }


    // list = this.props.lists.find(list => list.id === this.props.route.params.chosenID)

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

                    <AddTask listName={this.props.route.params.title} />

                    <View style={{ padding: 20, width: '100%' }}>
                        {this.state.tasks.map(task =>
                            <View style={{ paddingTop: 10 }} key={task.id}>
                                <TouchableOpacity onPress={() => this.deleteTask(task.name, task.id)}>
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
