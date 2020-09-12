import React, {useRef, useState} from 'react'
import {Table, Button, Spinner} from 'react-bootstrap'
import {MdDelete} from 'react-icons/md'
import ContentEditable from "react-contenteditable";
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
        if (meta.editable === true) {
            let patchFieldValue = (value) => {
                props.patchAction({
                    ...objectToDisplay,
                    [key]: value
                })
            }
            return (
                <td key={tableName + '_item' + objectToDisplay.id + '_key-' + key}>
                    <EditableField value={objectToDisplay[key]} patchFieldValue={patchFieldValue}/>
                </td>
            )
        }
        return (
            <td key={tableName + '_item' + objectToDisplay.id + '_key-' + key}>
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {objectToDisplay[key]}
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

    let newButton = (handleButtonClick) => (
        <div style={{textAlign: 'right', margin: '0 .5rem .5rem 0'}}>
            <Button
                onClick={handleButtonClick}
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

    return (
        <>
            {
                props.hasOwnProperty('createAction') && props.hasOwnProperty('emptyObject')
                    ? newButton(() => props.createAction(props.emptyObject))
                    : null
            }
            <Table borderless hover size="sm">
                <thead>
                <tr>
                    {columns(props.objectMeta)}
                </tr>
                </thead>
                <tbody>
                {rows(props.objectsToDisplay, props.objectMeta)}
                </tbody>
            </Table>
        </>
    )
}

export default ObjectsTable
