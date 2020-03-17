import { base } from './../firebase-config'

const SET_TODOS_DATA = 'SET_TODOS_DATA'
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'


let initialState = {
    todosData: []
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOS_DATA:
            return {
                ...state,
                todosData: action.todosData
            }
        case ADD_TODO:
            return {
                ...state,
                todosData: [action.newTodo, ...state.todosData]
            }
        case REMOVE_TODO:
            return {
                ...state,
                todosData: [...state.todosData.filter(item => item.id !== action.id)]
            }
        default:
            return state
    }
}

const setTodosData = (todosData) => ({
    type: SET_TODOS_DATA,
    todosData
})
const setNewTodo = (newTodo) => ({
    type: ADD_TODO,
    newTodo
})
const removeTodo = (id) => ({
    type: REMOVE_TODO,
    id
})

export const getTodosData = () => (dispatch) => {
    let todosData = []
    base.collection("todos").get()
        .then(snapshot => {
            snapshot.forEach((doc) => {
                let todoItem = { ...doc.data(), id: doc.id }
                todosData.push(todoItem)
            })
            dispatch(setTodosData(todosData))
        })
    // dispatch(onChangeTodosData())
}

// export const onChangeTodosData = () => (dispatch) => {
//     base.collection("todos").onSnapshot((snapshot) => {
//         let changes = snapshot.docChanges()
//         changes.forEach(change => {
//             console.log(change.doc.data())
//         })
//     })
// }


export const addTodoItem = (value) => (dispatch) => {
    const newTodo = {
        title: value,
        comleted: false,
    }
    base.collection("todos").add(newTodo)
    .then(docRef => {
        dispatch(setNewTodo({...newTodo, id: docRef.id}))
    })
    .catch(error => {
        console.error("Error adding document: ", error)
    })
}
export const removeTodoItem = (id) => (dispatch) => {
    base.collection("todos").doc(id).delete()
        .then(() => {
            dispatch(removeTodo(id))
        })
}


export default todosReducer