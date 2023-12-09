import React, { useState } from 'react';
import Header from '../tools/Header.jsx';
import './UpdateTeam.css';
import useFetch from '../tools/useFetch.jsx';
import { useEffect } from 'react';
import { teamApi } from '../api/Api.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../tools/LoadingSpinner.jsx';

function UpdateTeam() {
    const { data, loading, error, fetchData } = useFetch();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [leagueId, setLeagueId] = useState("");
    const [image, setImage] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchData(teamApi.getById(id));
    }, [update]);

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setCity(data.city || "");
            setLeagueId(data.leagueId || "");
            setImage(data.image);
        }
    }, [data]);

    const handleUpdate = () => {
        const updatedTeam = {
            id: parseInt(id, 10),
            name: name,
            city: city,
            leagueId: leagueId,
            image: image,
        };
        console.log("updatedTeam", updatedTeam);
        console.log("data", data);
        fetchData(teamApi.update(id, updatedTeam));
<<<<<<< HEAD
        setUpdate(!update) 
    }

    const handleRestore = () => {
        setName(data.name || ""); 
=======
        setUpdate(!update)
    }

    const handleRestore = () => {
        setName(data.name || "");
>>>>>>> develop
        setCity(data.city || "");
        setLeagueId(data.leagueId || "");
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
                            <div className="left-team">
                                <label htmlFor="equipo"><b>Equipo</b></label>
                                <br /><br />
                                <input type="text" id="equipo" name="equipo" value={name} onChange={(e) => setName(e.target.value)} />
                                <br /><br /><br />
                                <label htmlFor="ciudad"><b>Ciudad</b></label>
                                <br /><br />
                                <input type="text" id="ciudad" name="ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
                                <br /><br /><br />
                                <label htmlFor="IdLeague"><b>IdLeague</b></label>
                                <br /><br />
                                <input type="text" id="IdLeague" name="IdLeague" value={leagueId} onChange={(e) => setLeagueId(e.target.value)} />
                            </div>
                            <div className="rigth-team">
                                <img src={image} width="" alt="imagenEquipo" />
                                <div className="process">
                                    <button onClick={handleRestore}>Restaurar</button>
                                    <button onClick={handleUpdate}>Actualizar</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>No hay datos de elementos disponibles</div>
                    )}
                    <div className="bottom">
                        <button >Ver once inicial</button>
                    </div>
                </div>
                <div className="footer">
                    @Rodrigo Villa & Borja Martinez
                </div>
            </section>
        </>
    );
}

export default UpdateTeam;