import React, { useState } from 'react';
import Header from '../tools/Header.jsx';
import './UpdateLeague.css';
import useFetch from '../tools/useFetch.jsx';
import { useEffect } from 'react';
import { leagueApi } from '../api/Api.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../tools/LoadingSpinner.jsx';

function UpdateLeague() {
    
   const { data, loading, error, fetchData } = useFetch();
   const { id } = useParams();
   const [name, setName] = useState("");
   const [country, setCountry] = useState("");
   const [image, setImage] = useState(null);
   const [update, setUpdate] = useState(false);

    useEffect(() => {
    fetchData(leagueApi.getById(id));
    }, [update]);

    useEffect(() => {
        if (data) {
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
                        <div className="top">
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
                                <img width="" alt="imagenEquipo" />
                                <div className="process">
                                    <button onClick={handleRestore}>Restaurar</button>
                                    <button onClick={handleUpdate}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                       <div>No hay datos de elementos disponibles</div>
                    )}
                </div>
                <div className="footer">
                 @Rodrigo Villa & Borja Martinez
                </div>
            </section>
        </>
    );
    
}

export default UpdateLeague;