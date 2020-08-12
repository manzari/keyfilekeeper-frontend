import React from 'react'

const RoundedContainer = (props) => (
    <div
        style={{
            padding: '.5rem',
            borderRadius: '1rem',
            border: '0.1rem solid #f2f2f2',
            marginTop: '.5rem'
        }}>
        {props.children}
    </div>
)

export default RoundedContainer
