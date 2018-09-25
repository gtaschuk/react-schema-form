import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ComposedComponent from '../ComposedComponent';
import Text from '../Text';

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');


describe('ComposedComponent', function () {

  it('shows default value at text field', function () {
    const renderer = new ShallowRenderer();
    let cfg = {
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

    let Composed = ComposedComponent(Text);

    renderer.render(
      <Composed
        form={cfg.form}
        model={cfg.model}
        mapper={cfg.mapper}
      />);

    let result = renderer.getRenderOutput();

    expect(result.props.value).toEqual('steeve');
  });
});
