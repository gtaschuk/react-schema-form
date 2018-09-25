import React from 'react'
import SchemaForm from '../SchemaForm'
import {render, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import utils from '../utils'

configure({adapter: new Adapter()})

function onModelChange(key, val, type) {
    let newModel = {}
    utils.selectOrSet(key, newModel, val, type)
}

let cfg = {
    schema: {
        'type': 'object',
        'title': 'Types',
        'properties': {
            'date': {
                'title': 'Birthday',
                'type': 'object'
            }
        }
    },
    from: [
        {
            'key': 'date',
            'type': 'date'
        }
    ],
    model: {
        'date': '2018-08-11'
    }
}

describe('Date capture main test', () => {

    it('Bowie"s birthday :', function () {
        const result = render(<SchemaForm
            form={cfg.form}
            schema={cfg.schema}
            model={cfg.model}
            onModelChange={onModelChange}
        />)

        expect(result.find('input')[0].attribs.value).toEqual('1947-01-8')
    })
})
