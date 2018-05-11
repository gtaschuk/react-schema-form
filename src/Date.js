import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Date extends React.Component {
    constructor(props) {
        super(props);
        this.onDatePicked = this.onDatePicked.bind(this);
    }

    onDatePicked(e) {
        let date = e.target.value;
        this.props.onChangeValidate(date);
    }

    render() {
        var value = null;
        if (this.props && this.props.value) {
            value = this.props.value;
        }

        return (
            <div
                style={{ width: "100%", display: "block" }}
                className={this.props.form.htmlClass}
            >
                <TextField
                    id="date"
                    label={this.props.form.title}
                    type="date"
                    onChange={this.onDatePicked}
                    disabled={this.props.form.readonly}
                />
            </div>
        );
    }
}

export default ComposedComponent(Date);
