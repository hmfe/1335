import React from 'react'

const ErrorDisplay = (props) => {
    if (props.errorMessage) {
        return (
            <aside className="alert">
                <strong>Error retrieving data: </strong>
                <span>{props.errorMessage}</span>
            </aside>
        )
    }
    return (null)
}

export default ErrorDisplay