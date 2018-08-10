import React from 'react'
import ComposedComponent from './ComposedComponent'
import {TextField} from '@material-ui/core'
import {selectOrSet} from './utils'

class TextArea extends React.Component {

    render() {
        let {form, value, error, onChangeValidate} = this.props
        value = selectOrSet(this.props.form.key, this.props.model) || ''
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
                onChange={onChangeValidate}
                error={!!error}
                value={value}
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
