import React from 'react'
import logo from './logo.png'
import './logo.css'

export default function Logo() {
    return (
        <div className='imgBox'>
            <img src={ logo } className='logoImg' alt=""/>
        </div>
    )
}
