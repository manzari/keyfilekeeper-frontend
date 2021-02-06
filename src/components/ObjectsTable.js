import React from 'react'
import {Table, Button, Spinner, DropdownButton, Dropdown} from 'react-bootstrap'
import {BsXCircle, BsCheckCircle} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import EditableField from "./EditableField";


const ObjectsTable = (props) => {
    if (
        !props.hasOwnProperty('objectsToDisplay')
        || !Array.isArray(props.objectsToDisplay)
        || !props.hasOwnProperty('objectMeta')
        || !props.objectMeta.hasOwnProperty('keys')
        || !props.objectMeta.hasOwnProperty('name')
    ) {
        return null
    }

    let tableName = props.objectMeta.name.toLowerCase()
    let actionColumn = (props.hasOwnProperty('deleteAction'))

    let columns = (meta) => {
        let columns = []
        Object.keys(meta.keys).forEach(
            (key) => columns.push(
                <th key={tableName + '_th-' + key}>
                    {meta.keys[key].column}
                </th>
            )
        )
        if (actionColumn) {
            columns.push(
                <th key={tableName + '_th-actions'} style={{textAlign: 'right'}}>Actions</th>)
        }
        return columns
    }

    let rows = (objectsToDisplay, meta) => {
        let rows = []
        objectsToDisplay.forEach(
            (objectToDisplay) => rows.push(row(objectToDisplay, meta))
        )
        return rows
    }

    let row = (objectToDisplay, meta) => {
        let row = []
        Object.keys(meta.keys).forEach(
            (key) => {
                row.push(field(objectToDisplay, key, meta.keys[key]))
            }
        )
        if (actionColumn) {
            row.push(actionField(objectToDisplay))
        }
        return (
            <tr key={tableName + '_item' + objectToDisplay.id}>
                {row}
            </tr>
        )
    }

    let field = (objectToDisplay, key, meta) => {
        let tdElementKey = tableName + '_item' + objectToDisplay.id + '_key-' + key
        let fieldValue = objectToDisplay[key]
        if (meta.hasOwnProperty('callback')) {
            fieldValue = meta.callback(objectToDisplay)
        }
        if (meta.type === 'dropdown') {
            return (
                <td key={tdElementKey}>
                    <DropdownButton id={tdElementKey + 'dropdown'}
                                    title="Volumes">
                        {
                            fieldValue.forEach(
                                (value, index) => {
                                    return (<Dropdown.Item href={"#/action-" + index}>{value}</Dropdown.Item>)
                                }
                            )
                        }
                    </DropdownButton>
                </td>
            )
        }
        if (meta.type === 'boolean') {
            let onclick = () => {
                if (meta.editable === true && meta.hasOwnProperty('patchCallback')) {
                    meta.patchCallback(objectToDisplay, fieldValue)
                }
            }
            let iconStyle = {marginLeft: '1rem'}
            return (
                <td key={tdElementKey}>
                    {
                        fieldValue
                            ? <BsCheckCircle onClick={onclick} style={iconStyle}/>
                            : <BsXCircle onClick={onclick} style={iconStyle}/>
                    }
                </td>
            )
        }
        if (meta.type === 'datetime') {
            console.log(fieldValue)
            return (
                <td key={tdElementKey}>
                    {fieldValue.stringValue}
                </td>
            )
        }
        if (meta.editable === true) {
            return (
                <td key={tdElementKey}>
                    <EditableField
                        value={fieldValue}
                        patchFieldValue={
                            (value) => {
                                props.patchAction({
                                    ...objectToDisplay,
                                    [key]: value
                                })
                            }
                        }/>
                </td>
            )
        }
        return (
            <td key={tdElementKey}>
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {fieldValue}
                </div>
            </td>
        )
    }

    let actionField = (objectToDisplay) => {
        let deleteButton = (handleButtonClick) => (
            <Button
                size="sm"
                variant="danger"
                onClick={handleButtonClick}
                style={{marginLeft: '0.1rem', marginRight: '0.1rem'}}
                disabled={props.deleteStatus !== undefined && props.deleteStatus[objectToDisplay.id] === 'request'}
            >
                {
                    props.deleteStatus[objectToDisplay.id] === 'request'
                        ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        : <MdDelete/>
                }
            </Button>
        )
        return (
            <td key={tableName + '_item' + objectToDisplay.id + '-actions'} style={{textAlign: 'right'}}>
                {props.hasOwnProperty('additionalActions') ? props.additionalActions(objectToDisplay, props.patchAction) : null}
                {props.hasOwnProperty('deleteAction') ? deleteButton(() => props.deleteAction(objectToDisplay.id)) : null}
            </td>
        )
    }

    let newButton = () => {
        if (!props.hasOwnProperty('createAction')) {
            return null;
        }
        let createParameters = [{}];
        if (props.hasOwnProperty('emptyObject')) {
            createParameters = [props.emptyObject];
        }
        if (props.hasOwnProperty('createParametersCallback')) {
            createParameters = props.createParametersCallback();
        }
        return (
            <div style={{textAlign: 'right', margin: '0 .5rem .5rem 0'}}>
                <Button
                    onClick={() => props.createAction(...createParameters)}
                    disabled={props.createStatus === 'request'}
                >
                    {
                        props.createStatus === 'request'
                            ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            : "New"
                    }
                </Button>
            </div>
        )
    }

    return (
        <>
            {newButton()}
            {
                props.objectsToDisplay.length === 0
                    ? <p>No {props.objectMeta.name} to display.</p>
                    : <Table borderless hover size="sm">
                        <thead>
                        <tr>
                            {columns(props.objectMeta)}
                        </tr>
                        </thead>
                        <tbody>
                        {rows(props.objectsToDisplay, props.objectMeta)}
                        </tbody>
                    </Table>
            }
        </>
    )
}

export default ObjectsTable
