import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput, EditProps } from 'react-admin'

const MessageEdit = (props: EditProps) => {
    return (
        <Edit title='Edit a message' {...props}>
            <SimpleForm >
                <TextInput disabled source='id' />
                <TextInput source='name' />
                <TextInput multiline source='message' />
                <DateInput label='Created' source='createdAt' />
            </SimpleForm>
        </Edit>
    )
}

export default MessageEdit