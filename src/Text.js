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
        //console.log('Text props', this.props);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                 />
            </div>
        );
    }
}

export default ComposedComponent(Text);
