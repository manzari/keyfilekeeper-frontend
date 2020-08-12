import React from 'react'
import {Spinner} from "react-bootstrap";

const SpinnerOverlay = (props) => {
    if (props.status !== 'request') {
        return null
    }
    return (
        <div style={{
            position: 'fixed',
            display: 'flex',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spinner
                animation="border"
                role="status"
                size="lg"
                style={{height: '10rem', width: '10rem'}}
            />
        </div>
    )
}

export default SpinnerOverlay
