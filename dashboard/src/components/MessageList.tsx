import React from 'react'
import { List, Datagrid, TextField, DateField, DeleteButton } from 'react-admin'

const MessageList = (props: any) => {
    return (
        <List {...props}>
            <Datagrid>
                <DateField source='createdAt' />
                <TextField source='name' />
                <TextField source='message' />
                <DeleteButton basePath='/message' />
            </Datagrid>
        </List>
    )
}

export default MessageList