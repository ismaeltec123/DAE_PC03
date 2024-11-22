import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { showCategoryService, updateCategoryService } from "../../services/CategoryService"; 

const initData = {
    id: '',
    description: '',
};

function CategoryEditFormPage() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [data, setData] = useState(initData);

    
    const setDataForm = async () => {
        try {
            const resp = await showCategoryService(id); 
            setData(resp.data); 
        } catch (error) {
            console.error("Error al cargar la categoría:", error);
            window.alert("No se pudo cargar la categoría. Inténtalo de nuevo.");
        }
    };

    
    const onChangeNombre = (e) => {
        const nData = { ...data, description: e.target.value };
        setData(nData);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategoryService(id, data); 
            window.alert("Categoría actualizada exitosamente.");
            navigate("/categories"); 
        } catch (error) {
            console.error("Error al actualizar la categoría:", error);
            window.alert("No se pudo actualizar la categoría. Inténtalo de nuevo.");
        }
    };

    
    useEffect(() => {
        setDataForm();
    }, []);

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Editar - Categoría</h3>
                </div>
                <form onSubmit={handleSubmit} className="row">
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Nombre</label>
                        <input
                            type="text"
                            onChange={onChangeNombre}
                            className="form-control"
                            value={data.description} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-primary me-2">Guardar</button>
                        <Link className="btn btn-secondary" to="/categories">Cancelar</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CategoryEditFormPage;
