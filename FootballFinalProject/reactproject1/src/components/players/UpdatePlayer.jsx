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
    const [tempImage, setTempImage] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchData(playerApi.getById(id));
    }, [update]);

    useEffect(() => {
        setName(data.name || "");
        setLastName(data.lastName || "");
        setAttack(data.attack || "");
        setDefense(data.defense || "");
        setPass(data.pass || "");
        setTeamId(data.teamId || "");
        setImage(data.image);
    },[data])

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

    const handleUpdate = async () => {
        let updatedPlayer;
        if (tempImage) {
            const base64Image = await convertBlobToBase64(tempImage);
            updatedPlayer = {
                id: id,
                name: name,
                lastName: lastName,
                attack: attack,
                defense: defense,
                pass: pass,
                teamId: teamId,
                image: base64Image,
            };
        } else {
            updatedPlayer = {
                id: id,
                name: name,
                lastName: lastName,
                attack: attack,
                defense: defense,
                pass: pass,
                teamId: teamId,
                image: image,
            };
        }

        await fetchData(playerApi.update(id, updatedPlayer));
        setUpdate(!update);
    }

    const handleDelete = () => {
        fetchData(playerApi.delete(id));
        window.location.href = '/';
    };

    const handleRestore = () => {
        setName(data.name || "");
        setLastName(data.lastName || "");
        setAttack(data.attack || "");
        setDefense(data.defense || "");
        setPass(data.pass || "");
        setTeamId(data.teamId || "");
        setImage("");
    }

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
                                <input type="text" id="player" name="player" value={name} onChange={(e) => setName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="lastName"><b>Apellido</b></label>
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <br /><br />
                                <label htmlFor="teamId"><b>teamId</b></label>
                                <input type="text" id="teamId" name="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
                            </div>
                            <div className="mid-player">
                                        <img
                                            src={tempImage ? URL.createObjectURL(tempImage) : (image ? `data:image/png;base64,${image}` : null)}
                                            width="200"
                                            alt="  *Agregar Imagen"
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
                                        />                                <div className="processPlayer">
                                    <button onClick={handleRestore}>Restaurar</button>
                                    <button className={"update-button"} onClick={handleUpdate}>Actualizar</button>
                                    <button className={"delete-button"} onClick={handleDelete}>Eliminar</button>
                                </div>
                            </div>
                            <div className="right-player">
                                <label htmlFor="ataque"><b>Ataque</b></label>
                                <input type="text" id="ataque" name="ataque" value={attack} onChange={(e) => setAttack(e.target.value)} />
                                <br /><br />
                                <label htmlFor="defensa"><b>Defensa</b></label>
                                <input type="text" id="defensa" name="defensa" value={defense} onChange={(e) => setDefense(e.target.value)} />
                                <br /><br />
                                <label htmlFor="pase"><b>Pase</b></label>
                                <input type="text" id="pase" name="pase" value={pass} onChange={(e) => setPass(e.target.value)} />
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