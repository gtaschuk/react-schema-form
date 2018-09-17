import React from 'react'
import SchemaForm from '../SchemaForm'
import shallowRenderer from 'react-test-renderer/shallow'

describe('SchemaForm test', function () {

    it('shows SchemaForm', function () {
        let cfg = {
            form: {},
            schema: {
                'type': 'object'
            },
            model: {},
            mapper: {}
        }
        shallowRenderer.render(<SchemaForm
            schema={cfg.schema}
            mapper={cfg.mapper}
        />)
        let result = shallowRenderer.getRenderOutput()
        expect(result.type).toEqual('div')
        expect(result.props.children).toEqual([])
    })
})
