import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import utils from "./utils"

class FormCheckbox extends React.Component {

    render() {
        // let value = utils.selectOrSet(this.props.form.key, this.props.model, undefined, this.props.form.type);
        return (
            <FormGroup row>
                <FormControlLabel
                    className={this.props.form.className}
                    label={this.props.form.title}
                    control={
                        <Checkbox
                            name={this.props.form.key.slice(-1)[0]}
                            value={this.props.form.title}
                            checked={this.props.value}
                            disabled={this.props.form.readonly}
                            onChange={this.props.onChangeValidate}
                        />
                    }
                />
            </FormGroup>
        );
    }
}

export default ComposedComponent(FormCheckbox);
