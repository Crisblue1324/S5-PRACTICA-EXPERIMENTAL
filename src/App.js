import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'correo':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'El correo es requerido';
        } else if (!emailRegex.test(value)) {
          error = 'Formato de correo inválido';
        }
        break;

      case 'contraseña':
        if (!value) {
          error = 'La contraseña es requerida';
        } else if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
        }
        break;

      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fieldsToValidate = ['nombre', 'correo', 'contraseña'];
    fieldsToValidate.forEach(field => {
      validateField(field, formData[field]);
    });

    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasEmptyFields = Object.values(formData).some(field => field.trim() === '');

    if (!hasErrors && !hasEmptyFields) {
      alert('Formulario enviado correctamente!');
      console.log('Datos del formulario:', formData);
    } else {
      alert('Por favor, corrige los errores antes de enviar');
    }
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-primary text-white text-center">
                <h3>Registro de Usuario</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Campo Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : formData.nombre ? 'is-valid' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">
                        {errors.nombre}
                      </div>
                    )}
                  </div>

                  {/* Campo Correo */}
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.correo ? 'is-invalid' : formData.correo && !errors.correo ? 'is-valid' : ''}`}
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      placeholder="ejemplo@correo.com"
                    />
                    {errors.correo && (
                      <div className="invalid-feedback">
                        {errors.correo}
                      </div>
                    )}
                  </div>

                  {/* Campo Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="contraseña" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.contraseña ? 'is-invalid' : formData.contraseña && !errors.contraseña ? 'is-valid' : ''}`}
                      id="contraseña"
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={handleInputChange}
                      placeholder="Mínimo 8 caracteres"
                    />
                    {errors.contraseña && (
                      <div className="invalid-feedback">
                        {errors.contraseña}
                      </div>
                    )}
                  </div>

                  {/* Botón de envío */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;