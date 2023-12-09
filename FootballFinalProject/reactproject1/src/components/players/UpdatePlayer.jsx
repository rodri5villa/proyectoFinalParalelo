import React, { useState } from 'react';
import Header from '../tools/Header.jsx';
import './UpdatePlayer.css';
import useFetch from '../tools/useFetch.jsx';
import { useEffect } from 'react';
import { playerApi } from '../api/Api.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../tools/LoadingSpinner.jsx';

function UpdatePlayer() {
    const { data, loading, error, fetchData } = useFetch();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState("");
    const [pass, setPass] = useState("");
    const [teamId, setTeamId] = useState("");
    const [image, setImage] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchData(playerApi.getById(id));
    }, [update]);

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setLastName(data.lastName || "");
            setAttack(data.attack || "");
            setDefense(data.defense || "");
            setPass(data.pass || "");
            setTeamId(data.teamId || "");
            setImage(data.image);
        }
    }, [data]);

    const handleUpdate = () => {
        const updatedPlayer = {
            id: parseInt(id, 10),
            name: name,
            lastName: lastName,
            attack: attack,
            defense: defense,
            pass: pass,
            teamId: teamId,
            image: image,
        };

        console.log("updatedPlayer", updatedPlayer);
        console.log("data", data);
        fetchData(playerApi.update(id, updatedPlayer));
        setUpdate(!update)
    }

    const handleRestore = () => {
        setName(data.name || "");
        setLastName(data.lastName || "");
        setAttack(data.attack || "");
        setDefense(data.defense || "");
        setPass(data.pass || "");
        setTeamId(data.teamId || "");
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
                            <div className="left-player">
                                <label htmlFor="player"><b>Jugador</b></label>
<<<<<<< HEAD
                                        <br /><br />
                                <input type="text" id="player" name="player" value={name} onChange={(e) => setName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="lastName"><b>Apellido</b></label>
                                        <br /><br />
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="ataque"><b>Ataque</b></label>
                                        <br /><br />
                                <input type="text" id="ataque" name="ataque" value={attack} onChange={(e) => setAttack(e.target.value)} />
                                <br /><br />
                                <label htmlFor="defensa"><b>Defensa</b></label>
                                        <br /><br />
                                <input type="text" id="defensa" name="defensa" value={defense} onChange={(e) => setDefense(e.target.value)} />
                                <br /><br />
                                <label htmlFor="pase"><b>Pase</b></label>
                                        <br /><br />
                                <input type="text" id="pase" name="pase" value={pass} onChange={(e) => setPass(e.target.value)} />
                                <br /><br />
                                <label htmlFor="teamId"><b>teamId</b></label>
                                        <br /><br />
=======
                                <br /><br />
                                <input type="text" id="player" name="player" value={name} onChange={(e) => setName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="lastName"><b>Apellido</b></label>
                                <br /><br />
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="ataque"><b>Ataque</b></label>
                                <br /><br />
                                <input type="text" id="ataque" name="ataque" value={attack} onChange={(e) => setAttack(e.target.value)} />
                                <br /><br />
                                <label htmlFor="defensa"><b>Defensa</b></label>
                                <br /><br />
                                <input type="text" id="defensa" name="defensa" value={defense} onChange={(e) => setDefense(e.target.value)} />
                                <br /><br />
                                <label htmlFor="pase"><b>Pase</b></label>
                                <br /><br />
                                <input type="text" id="pase" name="pase" value={pass} onChange={(e) => setPass(e.target.value)} />
                                <br /><br />
                                <label htmlFor="teamId"><b>teamId</b></label>
                                <br /><br />
>>>>>>> develop
                                <input type="text" id="teamId" name="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
                            </div>
                            <div className="rigth-player">
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

export default UpdatePlayer;