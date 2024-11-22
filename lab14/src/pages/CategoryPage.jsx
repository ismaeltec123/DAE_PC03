import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {
    
    const urlApi = 'http://localhost:8000/series/api/v1/categories/';
    const [categories, setCategories] = useState([]);
    const navigate=useNavigate();

    const loadData = async () => {
        const resp = await axios.get(urlApi);
        console.log(resp.data);
        setCategories(resp.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este registro?')) { 
            await axios.delete(`${urlApi}${id}/`);
            const nLista = categories.filter(item => item.id !== id);
            setCategories(nLista);
        }  
    };
    const handleEdit=async(id) =>{
        navigate(`edit/${id}`);
    }


    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between">
                        <h3>Categorias</h3>
                        <div>
                            <Link className="btn btn-primary" to="/categories/new">Nuevo</Link>
                        </div>

                    </div>
                    
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className="text-center">Id</th>
                            <th className="text-center" style={{ width: "100px" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">
                                    <button onClick={() => handleEdit(item.id)} className="btn btn-secondary me-2 btn-sm">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoryPage;
