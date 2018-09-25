import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class Text extends React.Component {

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)
    }

    render() {
        let { form, value, error, onChangeValidate } = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description }
                error={!!error}
                onChange={onChangeValidate}
                defaultValue={value}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(Text);
