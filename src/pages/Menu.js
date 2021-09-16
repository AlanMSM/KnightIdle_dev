import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';

const cookies = new Cookies();
var classImg = "";

class Menu extends Component{
    state={
        form:{
            username:'',
            password:'',
            pClass:''
        }
    }

    //FUNCIONES PARA LOGOUT
    //REMUEVE LAS COOKIES ID, USERNAME Y PASSWORD
    cerrarSesion=()=>{
        cookies.remove('id', {path:"/"});
        cookies.remove('username', {path:"/"});
        cookies.remove('password', {path:"/"});
        window.location.href='./';
    }
    //COMPRUEBA SI EXISTEN COOKIES; SI NO, ENTONCES DEVUELVE A /
    componentDidMount(){
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    //FUNCIONES PARA RADIOBUTTON
    //CAMBIA LA CLASE DEL JUGADOR
    onRadChange=async e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        this.imgChange();
    }
    imgChange=e=>{
        if (this.state.form.pClass==="Warrior"){
            classImg="https://wotlkdoc.readthedocs.io/_images/01-Warrior.png";
        }else if(this.state.form.pClass==="Mage"){
            classImg="https://ih1.redbubble.net/image.186491993.2034/st,small,507x507-pad,600x600,f8f8f8.jpg";
        }else if(this.state.form.pClass==="Rogue"){
            classImg="https://img.rankedboost.com/wp-content/uploads/2019/05/WoW-Classic-Rogue-Guide.png";
        }else{
        }
    }

    // ESTRUCTURA VISUAL
    render(){
        return(
            //CONTENEDOR MAIN
            <div className="divMain">
                <button className="btnLogout" onClick={()=>this.cerrarSesion()}>Cerrar sesión</button> {/* BOTON LOGOUT */}

                {/* CONTENEDOR SECUNDARIO */}
                <div className="divMain2">
                    {/* CONTENEDOR BOTONES RADIO */}
                    <div className="divRadio">
                        <div className="radioClass">
                            <div className="form-check">  {/* WARRIOR */}
                                <input 
                                    className="form-check-input" type="radio" name="pClass" id="classRadio1" value="Warrior"
                                    onChange={this.onRadChange}></input>
                                <label className="form-check-label" htmlFor="classRadio1">Warrior</label>
                            </div>
                            <div className="form-check"> {/* MAGE */}
                                <input 
                                    className="form-check-input" type="radio" name="pClass" id="classRadio2" value="Mage"
                                    onChange={this.onRadChange}></input>
                                <label className="form-check-label" htmlFor="classRadio2" >Mage</label>
                            </div>
                            <div className="form-check"> {/* ROGUE */}
                                <input 
                                    className="form-check-input" type="radio" name="pClass" id="classRadio3" value="Rogue"
                                    onChange={this.onRadChange}></input>
                                <label className="form-check-label" htmlFor="classRadio3">Rogue</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="labelVarClass">{this.state.form.pClass}</label>
                        <img className="classIcon" src={classImg}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;