import React from 'react'
import { List, Datagrid, TextField, DateField, DeleteButton } from 'react-admin'

const AllList = (props: any) => {
    return (
        <List {...props}>
            <Datagrid>
                <DateField source='createdAt' />
                <TextField source='name' />
                <TextField source='message' />
                <DeleteButton basePath='/all' />
            </Datagrid>
        </List>
    )
}

export default AllList