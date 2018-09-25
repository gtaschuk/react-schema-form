import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class TextArea extends React.Component {

    render() {
        let { form, value, error, onChangeValidate } = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
                onChange={onChangeValidate}
                error={!!error}
                defaultValue={value}
                multiline
                rows={form.rows}
                rowsMax={form.rowsMax}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(TextArea);
