import React from 'react';
import SchemaForm from '../SchemaForm';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('SchemaForm test', function() {

  it('shows SchemaForm', function() {
    let cfg = {
      form: {},
      schema: {
        'type': 'object'
      },
      model: {},
      mapper: {}
    };

    let result = shallow(<SchemaForm
      schema={cfg.schema}
      mapper={cfg.mapper}
    />);

    expect(result.props().className).toEqual('SchemaForm');
  });
});
