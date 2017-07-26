/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

class TextArea extends React.Component {
    constructor(props) {
      super();
      this.state = {value: props.value};
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.model[this.props.form.key]
      })
    }

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        //console.log('TextArea', this.props.form);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    errorText={this.props.error}
                    value={this.state.value}
                    multiLine={true}
                    rows={this.props.form.rows}
                    rowsMax={this.props.form.rowsMax}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
            </div>
        );
    }
}

export default ComposedComponent(TextArea);
