import React from 'react';
import './style.css'
function WhiteContainer(props) {
    return (
        <div className='container-1' {...props}>
            <div className='container-2' {...props}>
                <div className='container-3'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default WhiteContainer;