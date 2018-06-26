import * as React from 'react';
import './Navigation';

const Navigation = ({onRouteChange,isSignedIn}) => {
            if(isSignedIn) {
                return (
                    <nav className='toolbar' style={{display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid black'}}>
                        <p onClick={() => onRouteChange('signout')} className='f5 link dim black underline pa3 pointer'>Sign Out</p>
                    </nav>
                );
                }else{
                return (
                        <nav className='toolbar' style={{display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid black'}}>
                            <p onClick={() => onRouteChange('signin')}className='f5 link dim black underline pa3 pointer'>Sign In</p>
                            <p onClick={() => onRouteChange('register')} className='f5 link dim black underline pa3 pointer'>Register</p>
                        </nav>

                );
            }
};

export default Navigation;