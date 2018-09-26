import React from 'react'
import TextField from '@material-ui/core/TextField'
import ComposedComponent from './ComposedComponent'

class TextArea extends React.Component {

    constructor(props) {
        super(props)
        const {model, form, value} = props
        const {key} = form
        this.props.setDefault(key, model, form, value)
    }

    render() {
        let {form, error, value, onChangeValidate} = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
                onChange={onChangeValidate}
                error={!!error}
                value={value || ''}
                multiline
                rows={form.rows}
                rowsMax={form.rowsMax}
                disabled={form.readonly}
                fullWidth
            />
        )
    }
}

export default ComposedComponent(TextArea)
