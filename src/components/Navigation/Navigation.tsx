import * as React from 'react';
import './Navigation';

const Navigation = () => {
        return (
            <nav className='toolbar' style={{display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid black'}}>
                <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        );
};

export default Navigation;