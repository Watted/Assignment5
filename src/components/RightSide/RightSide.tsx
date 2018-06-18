import * as React from 'react';
import './RightSide.css';


const RightSide = ()=> {
    return(
        <div className='right-side'>
            <textarea className='content'/>
            <div className='action'>
                <input className='load-text'/>
                <button className='btn-send'/>
            </div>
        </div>
    );
};

export default RightSide;