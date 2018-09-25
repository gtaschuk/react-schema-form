const React = require('react');
const Text = require('../Text').default;
const Composed = require('../ComposedComponent').default;
const Shalow = require('react-test-renderer/shallow');

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

test('Composed component test', () => {

    const renderer = new Shalow();
    const cfg = {
        form: {
            key: ['name'],
            schema: {
                default: 'steeve',
                title: 'name',
                type: 'String',
            },
            type: 'text',
            title: 'name',
        },
        model: {name: 'steeve'},
        mapper: {}
    };

    const TestText = Composed(Text);
    renderer.render(<TestText
        form={cfg.form} 
        model={cfg.model}
        mapper={cfg.mapper}
    >zaloopa</TestText>);

    const result = renderer.getRenderOutput();

    expect(result.props.value).toEqual('steeve');
});
  