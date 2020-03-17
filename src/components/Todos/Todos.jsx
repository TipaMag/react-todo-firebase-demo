import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { Container } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'

import { getTodosData, addTodoItem, removeTodoItem } from './../../redux/todos-reducer'
import AddTodo from './AddTodo/AddTodo'


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 30,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Todos = ({ isAuth, todos, getTodosData, addTodoItem, removeTodoItem }) => {
    const classes = useStyles();

    useEffect(() => {
        getTodosData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onAddTodo = (value) => {
        addTodoItem(value)
    }
    const onRemoveTodo = (id) => {
        removeTodoItem(id)
    }

    if (!isAuth) return <Redirect to="/login" />
    return (
        <Container maxWidth="md" className={classes.root}>
            <CssBaseline />
            <AddTodo onAddTodo={onAddTodo} />
            <List className={classes.list}>
                {todos.map(value => {
                    return (
                        <ListItem key={value.id} button divider>
                            <ListItemText primary={value.title} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => onRemoveTodo(value.id)} edge="end">
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    todos: state.todos.todosData
})

export default connect(mapStateToProps, {
    getTodosData,
    addTodoItem,
    removeTodoItem
})(Todos)