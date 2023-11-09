import React, { useEffect, useRef } from 'react'

const About = () => {

    const inputRef = useRef(null)

    useEffect(() => {
        document.title = "Tentang Kami"
    }, [])

    const handleClick = () => {
        inputRef.current.focus();
        console.log(inputRef)
    }

    return (
        <div className='w-full'>
            <input type="text" placeholder='tes' />
            <input type="text" ref={inputRef} placeholder='tes2' />
            <button onClick={handleClick}>tes</button>
        </div>
    )
}

export default About
