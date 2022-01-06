import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'

const MessageList = (props: any) => {
    return (
        <List {...props}>
            <Datagrid>
                <DateField source='createdAt' />
                <TextField source='name' />
                <TextField source='message' />
                <EditButton basePath='/messages' />
                <DeleteButton basePath='/messages' />
            </Datagrid>
        </List>
    )
}

export default MessageList