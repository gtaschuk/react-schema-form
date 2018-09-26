import React, {Component} from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Number extends Component {

    constructor(props) {
        super(props);
        const {model, form, value} = this.props;
        const {key} = form;
        this.props.setDefault(key, model, form, value)
    }

    render() {
        let { error, form, value, onChangeValidate} = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
                error={!!error}
                onChange={onChangeValidate}
                value={value || ''}
                ref={this.numberField}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(Number);
