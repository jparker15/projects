import React, { Component } from 'react'
//React is needed when using JSX
// Components is a class that will be the parent for any React Custom component we make

//Class comps used to store State
//React Redux used to manage those States

export default class NavBarClass extends Component {

    constructor(props){
        super(props)
        this.state={
            count:0
        }
        this.counterUp = this.counterUp.bind(this)
        this.counterDown = this.counterDown.bind(this)
        this.counterReset = this.counterReset.bind(this)
    }

    counterUp(){
        this.setState((prevState)=>({
            count: prevState.count + 1
        }))
    }
    counterDown(){
        this.setState((prevState)=>({
            count: prevState.count - 1
        }))
    }
    counterReset(){
        this.setState(()=>({
            count: 0
        }))
    }

    render(){

        const currCount = this.state.count

       return (
           <div
           style={{backgroundColor:"lightcoral"}}
           >
               <h1>
                   {`Class Count :${currCount}`}
               </h1>
               <button onClick={this.counterUp}
               >+</button>

               <button onClick={this.counterDown}>-</button>
               
               <button onClick={this.counterReset}>RESETTI</button>

           </div>
       )
   }
}
