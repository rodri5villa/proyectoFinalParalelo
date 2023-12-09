import React, { useState } from 'react';
import Header from '../tools/Header.jsx';
import './UpdateLeague.css';
import useFetch from '../tools/useFetch.jsx';
import { useEffect } from 'react';
import { leagueApi } from '../api/Api.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../tools/LoadingSpinner.jsx';

function UpdateLeague() {
<<<<<<< HEAD
    
   const { data, loading, error, fetchData } = useFetch();
   const { id } = useParams();
   const [name, setName] = useState("");
   const [country, setCountry] = useState("");
   const [image, setImage] = useState(null);
   const [update, setUpdate] = useState(false);

    useEffect(() => {
    fetchData(leagueApi.getById(id));
=======
    const { data, loading, error, fetchData } = useFetch();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchData(leagueApi.getById(id));
>>>>>>> develop
    }, [update]);

    useEffect(() => {
        if (data) {
<<<<<<< HEAD
        setName(data.name || "");
        setCountry(data.country || "");
        setImage(data.image);
        }
    }, [data]);

    const handleUpdate = () => {
        const updatedLeague = {
            id: parseInt(id, 10),
            name: name,
            country: country,
            image: image,
        };

        console.log("updatedLeague", updatedLeague);
        console.log("data", data);
        fetchData(leagueApi.update(id, updatedLeague));
        setUpdate(!update)
    }

    const handleRestore = () => {
        setName(data.name || "");
        setCountry(data.country || "");
        setImage("");
    }
=======
            setName(data.name || '');
            setCountry(data.country || '');
            setImage(data.image);
            setTempImage(null);
        }
    }, [data]);

    const handleUpdate = async () => {
        let updatedLeague;
        if (tempImage) {
            const base64Image = await convertBlobToBase64(tempImage);
            updatedLeague = {
                id: parseInt(id, 10),
                name: name,
                country: country,
                image: base64Image,
            };
        } else {
            updatedLeague = {
                id: parseInt(id, 10),
                name: name,
                country: country,
                image: image,
            };
        }
        fetchData(leagueApi.update(id, updatedLeague));
        setUpdate(!update);
    };

    const handleDelete = () => {
        fetchData(leagueApi.delete(id));
        window.location.href = '/';
    };

    const handleRestore = () => {
        setName(data.name || '');
        setCountry(data.country || '');
        setImage(data.image);
        setTempImage(null);
    };

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Image = reader.result.split(',')[1];
                resolve(base64Image);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

>>>>>>> develop

    return (
        <>
            <section className="layout">
                <div className="header">
                    <Header />
                </div>
                <div className="main2">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <div>Error al cargar los datos</div>
                    ) : data ? (
<<<<<<< HEAD
                        <div className="top">
=======
                        <div className="top">  
>>>>>>> develop
                            <div className="left-league">
                                <label htmlFor="liga"><b>Liga</b></label>
                                <br /><br />
                                <input type="text" id="liga" name="liga" value={name} onChange={(e) => setName(e.target.value)} />
                                <br /><br /><br />
                                <label htmlFor="pais"><b>Pais</b></label>
                                <br /><br />
                                <input type="text" id="pais" name="pais" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="rigth-league">
<<<<<<< HEAD
                                <img width="" alt="imagenEquipo" />
                                <div className="process">
                                    <button onClick={handleRestore}>Restaurar</button>
                                    <button onClick={handleUpdate}>Actualizar</button>
=======
                                <img
                                    src={tempImage ? URL.createObjectURL(tempImage) : (image ? `data:image/png;base64,${image}` : null)}
                                    width="200"
                                    alt="imagenEquipo"
                                    onClick={() => document.getElementById('fileInput').click()}
                                />
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                    const file = e.target.files[0];
                                    setTempImage(file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImage(reader.result);
                                        };
                                        if (file) {
                                        reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <div className="process">
                                    <button onClick={handleRestore}>Restaurar</button>
                                    <button className={"update-button"} onClick={handleUpdate}>Actualizar</button>
                                    <button className={"delete-button"} onClick={handleDelete}>Eliminar</button>
>>>>>>> develop
                                </div>
                            </div>
                        </div>
                    ) : (
<<<<<<< HEAD
                       <div>No hay datos de elementos disponibles</div>
                    )}
                </div>
                <div className="footer">
                 @Rodrigo Villa & Borja Martinez
=======
                        <div>No hay datos de elementos disponibles</div>
                    )}
                </div>
                <div className="footer">
                    @Rodrigo Villa & Borja Martinez
>>>>>>> develop
                </div>
            </section>
        </>
    );
<<<<<<< HEAD
    
=======

>>>>>>> develop
}

export default UpdateLeague;