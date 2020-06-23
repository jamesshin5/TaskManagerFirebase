import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { DrawerLayoutAndroidBase } from "react-native";


const initialState = [
    // {
    //     name: 'Camp', tasks: [
    //         { name: 'Bonfire', id: 9999 },
    //         { name: 'All the Shine', id: 9998 },
    //         { name: 'Firefly', id: 9997 }
    //     ], id: 0
    // },
    // {
    //     name: 'Because the Internet', tasks: [
    //         { name: '3005', id: 9996 },
    //         { name: 'Flight of the Navigator', id: 9995 },
    //         { name: 'Telegraph Ave', id: 9994 }
    //     ], id: 1
    // },
    // {
    //     name: 'Awaken, My Love', tasks: [
    //         { name: 'Redbone', id: 9993 },
    //         { name: 'Boogieman', id: 9992 },
    //         { name: 'Terrified', id: 9991 }
    //     ], id: 2
    // },
]

const lists = (state = initialState, action) => {
    const data = firebase.firestore();
    switch (action.type) {
        case 'ADD_LIST':
            data.collection("Lists").add({
            name: action.text,
            id: Math.random().toString(),
            tasks: []
            })
            .then(docRef => {
            // data.collection('Lists').doc(docRef.id).collection('Tasks')
            console.log("Document written with ID: ", docRef.id);
            });
        
            return state
            // return [{
            //     name: action.text,
            //     tasks: [],
            //     id: (nextId++).toString()
            // }, ...state]
    
        // case 'ADD_TASK':
            

            // var listID = chosenList.name
            // data.collection('Lists').doc(listID).collection('Tasks').add(newTask)
            // .then(function() {
            //     console.log("Document successfully written!");
            // })
            // .catch(function(error) {
            //     console.error("Error writing document: ", error);
            // });



            // var newTask = { name: action.text, id: nextId++ }
            // var chosenList = state.filter(list => list.id === action.listLocation)[0]

            // var oldListsFiltered = state.filter(list => list.id !== action.listLocation)
            // chosenList.tasks.push(newTask)
            // state = [chosenList].concat(oldListsFiltered)
        //     return state


        // case 'DELETE_TASK':

            // var chosenDelete = state.filter(list => list.id === action.listID)[0]
            // var newTask = chosenDelete.tasks.filter(task => task.id !== action.id)
            // chosenDelete.tasks = newTask
            // var filteredDelete = state.filter(list => list.id !== action.listID)
            // state = [chosenDelete].concat(filteredDelete)
            // return state


        default:
            return state
    }
}

export default lists
