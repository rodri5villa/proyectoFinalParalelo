import React from 'react';
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

    useEffect(() => {
        fetchData(teamApi.getById(id));
    }, []);

    console.log(data);

    return (
        <>
            <section className="layout">
                <div className="header">
                <Header />
                </div>
            <div className="main2">
                {loading ? (
                    <LoadingSpinner /> // Aseg�rate de que 'LoadingSpinner' est� definido o importado correctamente
                ) : error ? (
                    <div>Error al cargar los datos</div>
                ) : data ? (
                    <div className="top">
                        <div className="left-team">
                            <label htmlFor="equipo"><b>Equipo</b></label>
                            <br></br><br></br>
                            <input type="text" id="equipo" name="equipo" value={data.name} readOnly />
                            <br></br><br></br><br></br>
                            <label htmlFor="ciudad"><b>Ciudad</b></label>
                            <br></br><br></br>
                            <input type="text" id="ciudad" name="ciudad" value={data.city} readOnly />
                            <br></br><br></br><br></br>
                            <label htmlFor="IdLeague"><b>IdLeague</b></label>
                            <br></br><br></br>
                            <input type="text" id="IdLeague" name="IdLeague" value={data.leagueId} readOnly />
                        </div>
                        <div className="rigth-team">
                                        <img href="" width="" alt="imagenEquipo"></img>
                             <div className="process">
                                <button >Restaurar</button>
                                <button >Actualizar</button>
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