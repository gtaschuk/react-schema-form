import React, {Component} from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormCheckbox extends Component {
    constructor (props) {
        super(props);
        const {model, form} = this.props;
        const {key} = form;
        //If a boolean is stored, use it; if not, if a boolean is defined as schema's default, use it.
        const value = typeof this.props.value === 'boolean'
            ? this.props.value
            : typeof form.schema.default === 'boolean'
                ? form.schema.default
                : undefined
        this.props.setDefault(key, model, form, value)
    }
    handleChange = e => {
        this.props.onChangeValidate(e);
    };

    render() {
        return (
            <FormGroup row>
                <FormControlLabel
                    className={this.props.form.className}
                    label={this.props.form.title}
                    control={
                        <Checkbox
                            name={this.props.form.key.slice(-1)[0]}
                            value={this.props.form.key.slice(-1)[0]}
                            checked={this.props.value || false}
                            disabled={this.props.form.readonly}
                            onChange={this.handleChange}
                        />
                    }
                />
            </FormGroup>
        );
    }
}

export default ComposedComponent(FormCheckbox);
