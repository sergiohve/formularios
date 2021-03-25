import React, { useState } from 'react'
import styled from 'styled-components'
import  {useForm} from "react-hook-form"
import { BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
    useLocation,
    useHistory  
  } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { validate, clean, format, getCheckDigit } = require('rut.js');
const InputStyled = styled.input`

    font-family: 'Montserrat',sans-serif;
    font-size: 17px;
    font-weight: 400;
    background: #fff;
    border: 1px solid #fff;
    color: #474756;
    height: 60px;
    padding: 5px 25px;
    border-radius: 50px;
    box-shadow: 0px 10px 13px 0px rgba(112, 171, 219, 0.23);
    width:100%;

`

const Apv = () => {
    const {register, errors, handleSubmit}= useForm();
    const history = useHistory();
    const { state } = useLocation();
    const estado = state;
    const titulo = 'Cotiza tu '+estado[0].nombreSeguro
    const [rut1, setRut] = useState("")
    const [datos, setDatos] = useState({
        nombre: '',
        edad: '',
        sexo: '',
        fumador: '',
        rut: '',
        ingreso: '',
        mail: '',
        telefono: '',
        estado: '',
        tipoSeguro: estado[0].tipoSeguro,
        nombreSeguro: estado[0].nombreSeguro
    })

    const handleInputChange = (event) => {
       
        
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
            
                
                
        })
    }
   
    const notify = () => toast.success(' Datos enviados correctamente!!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    const redirectTimeout = () => {
        setTimeout(() => {
            history.push('/')
          }, 2500);
        
    }

    
    const enviarDatos = (event) => {
       
        console.log('enviando datos...' + datos.nombre + ' ' + datos.mail + ' ' + datos.telefono)
        console.log('rut', validate(format(datos.rut)));
       
        if( validate(format(datos.rut))){
		
            console.log("Se valido")

        axios.post(`${process.env.REACT_APP_API_URL}/apvs`, {

            nombre: datos.nombre,
            edad: datos.edad,
            sexo: datos.sexo,
            fumador: datos.fumador,
            rut: format(datos.rut),
            ingreso: datos.ingreso,
            mail: datos.mail,
            telefono: datos.telefon,
            estado: datos.estado,
            tipoSeguro: estado[0].tipoSeguro,
            nombreSeguro: estado[0].nombreSeguro

          })
          .then(function (response) {
            console.log(response);
            notify()
            redirectTimeout()
          })
          .catch(function (error) {
            console.log(error);
          });
        }else{
			console.log("no es validado")
			setRut("Rut invalida")
		}


    }

    return (
<>
            <section className="cabecera primera">
				<div className="container">
					<div className="paginas">
						<div className="formulario">
							<div className="row">
								<div className="col-12">
									<div className="titulo">
                                        <h1 ><img style={{
                                                  width: "100px",
                                                  height: "100px",
                                                  padding: '10px',
                                                  border: "1px solid #1274ae",
                                                  background: "#fff",
                                                  borderRadius: "100%",
                                                  lineHeight: "56px",
                                                  boxShadow: "0px 10px 13px 0px rgba(112, 171, 219, 0.1)",
                                                  margin: "auto"

                                        }} className="img-fluid ico" 
                                                 src={estado[0].urlIcon}
                                                 alt="Cotiza tu Seguro de Salud" /> 
                                                 <h1 dangerouslySetInnerHTML={ {__html:  titulo} }></h1>
                                                 </h1>
									</div>
								</div>
								<div className="col-12 col-lg-8 offset-lg-2">
									<div className="cont">
										<form onSubmit={handleSubmit(enviarDatos)}>
											<div className="row">
                                                {/* 
												<div className="col-6 col-lg-6">
													<p className="text-right">Edad: <strong>32 años</strong></p>
												</div>
												<div className="col-6 col-lg-6">
													<p>Género: <strong>Mujer</strong></p>
                                                </div>
                                                */}
											</div>
											<div className="row">
                                            <div className="col-12 col-lg-6">
													<div className="form-group">
                                                        <InputStyled 
                                                        placeholder="Nombre" 
                                                        type="text"
                                                        name="nombre" 
                                                        onChange={handleInputChange} 
                                                        className="form-control"
                                                        ref={register({
                                                            required:{
                                                                value:true, 
                                                                message: "Nombre obligatorio"
                                                            },
                                                            minLength: {
                                                                value: 5, 
                                                                message: 'Mínimo 5 carácteres'
                                                                }
                                                        })}
                                                        />
                                                          {
                                                            errors.nombre && <span className="text-danger text-small d-block mb-2">{errors.nombre.message}</span>
                                                        }
                                                        
													</div>
												</div>
												<div className="col-12 col-lg-6">
													<div className="form-group">
                                                        <InputStyled placeholder="Edad" 
                                                        type="Number" 
                                                        name="edad"
                                                        onChange={ handleInputChange } 
                                                        className="form-control"
                                                        ref={register({
                                                            required:{
                                                                value:true, 
                                                                message: "Edad obligatorio"
                                                            },
                                                            maxLength: {
                                                                value: 2, 
                                                                message: 'No más de 2 numeros!'
                                                                },
                                                            minLength: {
                                                                value: 1, 
                                                                message: 'Mínimo 1 número'
                                                                }
                                                        })}
                                                        />
                                                        {
                                                            errors.edad && <span className="text-danger text-small d-block mb-2">{errors.edad.message}</span>
                                                        }
                                                        
													</div>
												</div>
                                                 {/* 
												<div className="col-12 col-lg-6">
													<div className="form-group">
														<div className="selector">
															<div className="dropdown bootstrap-select"><select className="selectpicker" title="Isapre" tabindex="-98"><option className="bs-title-option" value=""></option>
																<option>Isapre 1</option>
																<option>Isapre 2</option>
																<option>Isapre 3</option>
																<option>Isapre 4</option>
															</select><button type="button" className="btn dropdown-toggle bs-placeholder btn-light" data-toggle="dropdown" role="button" title="Isapre"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Isapre</div></div> </div></button><div className="dropdown-menu " role="combobox"><div className="inner show" role="listbox" aria-expanded="false" tabindex="-1"><ul className="dropdown-menu inner show"></ul></div></div></div>
														</div>
													</div>
                                                </div>
                                                 */}
	                                            
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Sexo"
                                                 type="text"
                                                 name="sexo"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required:{
                                                        value:true, 
                                                        message: "Sexo obligatorio"
                                                    },
                                                    minLength: {
                                                        value: 1, 
                                                        message: 'Más de 1 carácter!'
                                                        },
                                                   
                                                })}
                                                 />
                                                  {
                                                    errors.sexo && <span className="text-danger text-small d-block mb-2">{errors.sexo.message}</span>
                                                  }
													</div>
												</div>
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Fumador"
                                                 type="text"
                                                 name="fumador"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required:{
                                                        value:true, 
                                                        message: "Sexo obligatorio"
                                                    },
                                                    minLength: {
                                                        value: 1, 
                                                        message: 'Más de 1 carácter!'
                                                        },
                                                   
                                                })}
                                                 />
                                                  {
                                                    errors.fumador && <span className="text-danger text-small d-block mb-2">{errors.fumador.message}</span>
                                                  }
													</div>
												</div>
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Rut"
                                                 type="text"
                                                 name="rut"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required: {
                                                        value: format(datos.rutDueno),
                                                        message: 'RUT obligatorio'
                                                    },
                                                    minLength: {
                                                        value: 9,
                                                        message: 'RUT invalido'
                                                    },
                                                     maxLength: {
                                                        value: 9,
                                                        message: 'RUT invalido'
                                                    }
        
                                                })}
                                                 />
                                                 {
                                                    errors.rut && <span className="text-danger text-small d-block mb-2">{errors.rut.message}</span>
                                                  }
                                                   <div className="text-danger text-small d-block mb-2">{rut1}</div>
													</div>
												</div>
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Ingreso"
                                                 type="text"
                                                 name="ingreso"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required:{
                                                        value:true, 
                                                        message: "Ingreso obligatorio"
                                                    },
                                                    minLength: {
                                                        value: 4, 
                                                        message: 'Más de 4 carácteres'
                                                        },
                                                   
                                                })}
                                                 />
                                                  {
                                                    errors.ingreso && <span className="text-danger text-small d-block mb-2">{errors.ingreso.message}</span>
                                                  }
													</div>
												</div>
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Mail"
                                                 type="Email"
                                                 name="mail"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required:{
                                                        value:true, 
                                                        message: "Email obligatorio"
                                                    },
                                                    minLength: {
                                                        value: 5, 
                                                        message: 'Más de 5 carácter!'
                                                        },
                                                   
                                                })}
                                                 />
                                                   {
                                                    errors.mail && <span className="text-danger text-small d-block mb-2">{errors.mail.message}</span>
                                                  }
													</div>
												</div>
                                                <div className="col-12 col-lg-6">
													<div className="form-group">
                                                    <InputStyled
                                                 
                                                 placeholder="Telefono"
                                                 type="Number"
                                                 name="telefono"
                                                 onChange={handleInputChange}
                                                 className="form-control"
                                                 ref={register({
                                                    required:{
                                                        value:true, 
                                                        message: "Teléfono obligatorio"
                                                    },
                                                    minLength: {
                                                        value: 8, 
                                                        message: 'Más de 8 números!'
                                                        },
                                                   
                                                })}
                                                 />
                                                 {
                                                    errors.telefono && <span className="text-danger text-small d-block mb-2">{errors.telefono.message}</span>
                                                  }
													</div>
												</div>

											</div>
											<button type="submit" className="boton"><span>Enviar</span></button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
        </>
    )
}

export default Apv
