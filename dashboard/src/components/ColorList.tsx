import React from 'react'
import { List, Datagrid, TextField, DateField, DeleteButton, ImageField } from 'react-admin'

const ColorList = (props: any) => {
    return (
        <List {...props}>
            <Datagrid>
                <DateField source='createdAt' />
                <ImageField source='colorUrl' />
                <TextField source='name' />
                <TextField source='id' />
                <DeleteButton basePath='/color' />
            </Datagrid>
        </List>
    )
}

export default ColorList