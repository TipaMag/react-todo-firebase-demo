import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    textField: {
        flex: 1,
        marginRight: 20,
    }
}))

const AddTodo = ({onAddTodo}) => {
    const classes = useStyles()
    const [value, setValue] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onAddTodo(value)
        setValue('')
    }

    return (
        <form onSubmit={onSubmitHandler} className={classes.root} noValidate autoComplete="off">
            <TextField className={classes.textField} label="todo text..." variant="outlined" 
                onChange={e => setValue(e.target.value)}
                value={value}
            />
            <Button type='submit' color="primary" disabled={!value.trim('')}>
                add todo
            </Button>
        </form>
    )
}

export default AddTodo