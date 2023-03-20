import React from 'react';

function EmptyBox(props) {
    const spaces = props.size;
    return (
        <div style={{display : 'inline-block', verticalAlign : 'middle', visibility : 'hidden'}}>
        {new Array(spaces + 1).join( '-' )}
        </div>
    );
}

export default EmptyBox;