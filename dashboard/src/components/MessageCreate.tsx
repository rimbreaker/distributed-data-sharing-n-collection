import React from 'react'
import { Create, SimpleForm, TextInput, DateInput } from 'react-admin'

function MessageCreate<T>(props: T) {
    return (
        <Create title='create a message' {...props}>
            <SimpleForm >
                <TextInput multiline source='message' />
                <DateInput label='Created' source='createdAt' />
            </SimpleForm>
        </Create>
    )
}

export default MessageCreate