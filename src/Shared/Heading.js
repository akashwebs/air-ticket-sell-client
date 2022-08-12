import React from 'react';

const Heading = ({children}) => {
    return (
        <div className='my-7'>
            <h2 className='text-4xl font-extrabold mb-4'>{children}</h2>
            <hr />
        </div>
    );
};

export default Heading;