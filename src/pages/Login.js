/* eslint-disable no-dupe-keys */
import React, {Component} from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie'
const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username:"",
            password:""
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit=async()=>{
        if (this.state.form.username.length!==undefined){
            if(this.state.form.password.length!==0){
                await axios.get(baseUrl,{params: {username:this.state.form.username, password:md5(this.state.form.password)}})
                .then(response=>{
                    return(response.data);
                })
                .then(response=>{
                    if(response.length>0){
                        var respuesta=response[0];
                        cookies.set('id',respuesta.id, {path: "/"});
                        cookies.set('username',respuesta.username, {path: "/"});
                        // alert(`Bienvenido ${respuesta.username}`);
                        window.location.href="./home";
                    }else{
                        alert('El usuario o la contraseña son incorrectos');
                    }
                })
                .catch(error=>{
                    console.log("error");
                })
            }else{
                alert('ingrese pass')
            }
        }else{
            alert('ingrese user')
        }
    }

    handleKeypress(e){
        if(e.charCode===13){
            this.handleSubmit();
        }
    }
    constructor(){
        super();
        this.state={
            name:"react-bootstrap key enter event"
        };
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    componentDidMount(){
        if(cookies.get('username')){
            window.location.href="./home";
        }
    }


    render(){
        return(
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <h1 className="h1Login">Login</h1>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeypress}
                            required
                        />
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeypress}
                            required
                        />
                        <button className="btn btn-primary" onClick={()=>this.handleSubmit()}>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;