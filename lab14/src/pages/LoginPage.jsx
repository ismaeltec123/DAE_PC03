import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { loginService } from "../services/LoginServices";

const initData = {
    username: '',
    password: '',
};

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useContext(AppContext); 
    const [data, setData] = useState(initData);

    
    const onChangeUserName = (e) => {
        setData({ ...data, username: e.target.value });
    };

    
    const onChangePassword = (e) => {
        setData({ ...data, password: e.target.value });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (!data.username || !data.password) {
            window.alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const resp = await loginService(data); 
            console.log("Respuesta del servidor:", resp.data);

            
            if (resp && resp.data) {
                login(resp.data); 
                navigate("/series"); 
            } else {
                throw new Error("Error al procesar la respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            window.alert("El usuario o la contraseña son incorrectos.");
        }
    };

    return (
        <section className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                        <div className="card shadow-lg border-0 rounded">
                            <div className="card-body p-4">
                                <h1 className="fs-4 card-title fw-bold mb-4 text-center">Iniciar Sesión</h1>
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold" htmlFor="username">Nombre de Usuario</label>
                                        <input
                                            id="username"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value={data.username} 
                                            onChange={onChangeUserName} 
                                            required
                                            placeholder="Ingrese su nombre de usuario"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold" htmlFor="password">Contraseña</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={data.password} 
                                            onChange={onChangePassword} 
                                            required
                                            placeholder="Ingrese su contraseña"
                                        />
                                    </div>
                                    <div className="mb-4 d-flex align-items-center">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                id="remember"
                                                className="form-check-input"
                                            />
                                            <label htmlFor="remember" className="form-check-label">
                                                Recuérdame
                                            </label>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary ms-auto px-5 py-2">
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-4 small text-muted">
                            &copy; Tecsup 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
