import React, { Component } from "react";
import $ from 'jquery';


class NavButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotated: 0,

        };
    }

    openMenu = () =>{
        
        if (this.state.rotated == 0){
            $(".fa-plus").css("transform", "rotate(45deg)"); 
            document.getElementById("myNav").style.height = "100%";
            this.setState({rotated: 1});          
        }
        else{
            $(".fa-plus").css("transform", "rotate(0deg)");
            document.getElementById("myNav").style.height = "0%";
            this.setState({rotated: 0});         
        }

        
    }

    render(){
        return(
            // <span onClick = {this.openMenu} class="navbutton navbar-toggle collapsed" data-toggle="modal" data-target="#nav-modal" aria-expanded="false"><i class="fas fa-plus"></i></span>
            <div className = 'navbarNative'>
                <span onClick = {this.openMenu} id="navbutton" aria-expanded="false"><i class="fas fa-plus"></i></span>
            </div>
            
        )
    }
}
export default NavButton;