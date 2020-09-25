import React,{useState} from 'react'

export default function NavBarFunc(props) {
    
    const [count,setCount] = useState(0);

    const counterUp =()=>{
        setCount(count + 1)
    }
    const counterDown =()=>{
        setCount(count - 1)
    }
    const counterReset =()=>{
        setCount(0)
    }
    
    return (
        <div
        style={{backgroundColor:"lightblue"}}
        >
           <h1>
                {`Func Count :${count}`}
            </h1>
            <button onClick={counterUp}
            >+</button>

            <button onClick={counterDown}>-</button>
               
            <button onClick={counterReset}>RESETTI</button>
            
        </div>
    )
}
