import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      marginTop:  theme.spacing.unit
    }
  });

class FieldSet extends React.Component {

    render() {
        let {form, mapper, builder, model, onChange, classes} = this.props
        // now render all the items in the fieldset
        let forms = form.items.map(
            (f, index) => builder(f, model, index, onChange, mapper, builder)
        );

        return (
            <FormControl component="fieldset" className={classes.root}>
                <div>
                    {forms}
                </div>
            </FormControl>
        )
    }
}

export default withStyles(styles)(FieldSet);
