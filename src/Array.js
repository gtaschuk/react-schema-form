import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button, DeleteIcon, IconButton} from '@material-ui/core'
import _ from 'lodash'
import utils from './utils'
import ComposedComponent from './ComposedComponent'


const styles = theme => ({
    arrayItem: {
        position: 'relative',
        border: '1px dotted #aaa',
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    deleteItemButton: {
        position: 'absolute',
        top: -theme.spacing.unit,
        right: -theme.spacing.unit
    },
    addButton: {
        marginTop: theme.spacing.unit
    }
})


class Array extends Component {
    static ITEM_ID = '_SCHEMAFORM_ITEM_ID'
    static _SEQUENCE = 1

    static assignItemId(item) {
        if (item && !item[Array.ITEM_ID]) {
            // define hidden property with internal id
            Object.defineProperty(item, Array.ITEM_ID, {
                enumerable: false,
                writable: true
            })
            item[Array.ITEM_ID] = Array._SEQUENCE++
        }
        return item
    }

    constructor(props) {
        super(props)
        this.onAppend = this.onAppend.bind(this)
        this.onDelete = this.onDelete.bind(this)
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        this.state = {
            model: utils.selectOrSet(this.props.form.key, this.props.model) || []
        }
        //console.log('constructor', this.props.form.key, this.props.model, this.state.model);
    }

    static getDerivedStateFromProps(props, state) {
        let propsKey = props.form.key
        if (props.form && propsKey === state.formKey && props.model &&
            props.model[propsKey] === state.model) {
            return null // nothing changed
        }
        let model = utils.selectOrSet(propsKey, props.model) || []
        return {
            formKey: propsKey,
            model: model.map(Array.assignItemId)
        }
    }

    componentDidMount() {
        // Always start with one empty form unless configured otherwise.
        if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
            this.onAppend()
        }
    }

    onAppend = () => {
        //console.log('onAppend is called this.state.model', this.state.model);
        let empty
        if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
            let items = this.props.form.schema.items
            if (items.type && items.type.indexOf('object') !== -1) {
                empty = {}

                // Check for possible defaults
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = typeof items['default'] !== 'undefined' ? items['default'] : empty

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        utils.traverseSchema(items, function (prop, path) {
                            if (typeof prop['default'] !== 'undefined') {
                                utils.selectOrSet(path, empty, prop['default'])
                            }
                        })
                    }
                }

            } else if (items.type && items.type.indexOf('array') !== -1) {
                empty = []
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty
                }
            } else {
                // No type? could still have defaults.
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty
                }
            }
        }
        let newModel = this.state.model
        Array.assignItemId(empty)
        newModel.push(empty)
        this.setState({model: newModel})
        this.props.onChangeValidate(this.state.model)
        //console.log('After append this.state.model', newModel);
    }

    onDelete = (index) => () => {
        let newModel = this.state.model
        newModel.splice(index, 1)
        this.setState({model: newModel})
        this.props.onChangeValidate(this.state.model)
    }

    setIndex = (index) => (form) => {
        if (form.key) {
            form.key[form.key.indexOf('')] = index
        }
    }

    copyWithIndex = (form, index) => {
        let copy = _.cloneDeep(form)
        copy.arrayIndex = index
        utils.traverseForm(copy, this.setIndex(index))
        return copy
    }

    render() {
        let {classes, form} = this.props
        let arrays = []
        let model = this.state.model
        for (let i = 0; i < model.length; i++) {
            let item = model[i]
            let forms = form.items.map((form, index) =>
                this.props.builder(this.copyWithIndex(form, i), this.props.model, index, this.props.mapper, this.props.onChange, this.props.builder)
            )
            arrays.push(
                <div className={classes.arrayItem} key={item && item[Array.ITEM_ID] || i}>
                    <IconButton onClick={this.onDelete(i)} className={classes.deleteItemButton}>
                        <DeleteIcon fontSize='small'/>
                    </IconButton>
                    {forms}
                </div>
            )
        }
        return (
            <div>
                <div>
                    <label>{this.props.form.title}</label>
                    <div>{arrays}</div>
                </div>
                <Button className={classes.addButton} variant="contained" color="primary" onClick={this.onAppend}>
                    {this.props.form.add || 'Add'}
                </Button>
            </div>
        )
    }
}

export default ComposedComponent(withStyles(styles)(Array))
