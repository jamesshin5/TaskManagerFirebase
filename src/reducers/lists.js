const initialState = [
    {
        name: 'Camp', tasks: [
            { name: 'Bonfire', id: 9999 },
            { name: 'All the Shine', id: 9998 },
            { name: 'Firefly', id: 9997 }
        ], id: 0
    },
    {
        name: 'Because the Internet', tasks: [
            { name: '3005', id: 9996 },
            { name: 'Flight of the Navigator', id: 9995 },
            { name: 'Telegraph Ave', id: 9994 }
        ], id: 1
    },
    {
        name: 'Awaken, My Love', tasks: [
            { name: 'Redbone', id: 9993 },
            { name: 'Boogieman', id: 9992 },
            { name: 'Terrified', id: 9991 }
        ], id: 2
    },
]

let nextId = 3
const lists = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                {
                    name: action.text,
                    tasks: [],
                    id: (nextId++).toString()
                }, ...state

            ]
        case 'DELETE_LIST':
            return state.filter(list => list.id !== action.id)

        case 'ADD_TASK':

            var newTask = { name: action.text, id: nextId++ }
            var chosenList = state.filter(list => list.id === action.listLocation)[0]
            console.log(chosenList)
            var oldListsFiltered = state.filter(list => list.id !== action.listLocation)
            chosenList.tasks.push(newTask)
            state = [chosenList].concat(oldListsFiltered)
            return state

        case 'DELETE_TASK':

            var chosenDelete = state.filter(list => list.id === action.listID)[0]
            var newTask = chosenDelete.tasks.filter(task => task.id !== action.id)
            chosenDelete.tasks = newTask
            var filteredDelete = state.filter(list => list.id !== action.listID)
            state = [chosenDelete].concat(filteredDelete)
            return state


        default:
            return state
    }
}

export default lists