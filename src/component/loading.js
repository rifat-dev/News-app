import React from 'react'

function Loading() {
    return (
        <div className='d-flex align-items-center' >
            <strong>Loading...</strong>
            <div
               className='spinner-border text-danger ml-auto'
               role='sratus'
               aria-hidden='true'
               
            > 

            </div>
        </div>
    );
}

export default Loading;
