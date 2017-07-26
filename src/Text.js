/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

class Text extends React.Component {
    constructor(props) {
      super();
      this.state = {value: props.value};
    }

    componentWillReceiveProps(nextProps) {
      if(typeof nextProps.model != "undefined") {
        console.log(nextProps);
        var newValue = nextProps.model[this.props.form.key];
        this.setState({
          value: newValue
        })
        //this.refs.textField.value = newValue;
      }
    }

    render() {
        //console.log('Text props', this.props.form.readonly);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.props.onChangeValidate}
                    value={this.state.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}} />
            </div>
        );
    }
}

export default ComposedComponent(Text);
