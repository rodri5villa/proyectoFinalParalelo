import { useState } from 'react';
import Header from '../tools/Header.jsx';
import './UpdateTeam.css';
import useFetch from '../tools/useFetch.jsx';
import { useEffect } from 'react';
import { teamApi } from '../api/Api.jsx';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../tools/LoadingSpinner.jsx';
import { useNavigate } from "react-router-dom";

function UpdateTeam() {
    const { data, loading, error, fetchData } = useFetch();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [leagueId, setLeagueId] = useState("");
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(teamApi.getById(id));
    }, [update]);

    useEffect(() => {
        if (data) {
            setName(data.name || "");
            setCity(data.city || "");
            setLeagueId(data.leagueId || "");
            setImage(data.image);
            setTempImage(null);
        }
    }, [data]);

    const handleUpdate = async () => {
        let updatedTeam;
        if (tempImage) {
            const base64Image = await convertBlobToBase64(tempImage);
            updatedTeam = {
                id: parseInt(id, 10),
                name: name,
                city: city,
                leagueId: leagueId,
                image: base64Image,
            };
        } else {
            updatedTeam = {
                id: parseInt(id, 10),
                name: name,
                city: city,
                leagueId: leagueId,
                image: image,
            }
        }
        fetchData(teamApi.update(id, updatedTeam));
        setUpdate(!update)
    };

    const handleDelete = () => {
        fetchData(teamApi.delete(id));
        window.location.href = '/';
    };

    const handleRestore = () => {
        setName(data.name || "");
        setCity(data.city || "");
        setLeagueId(data.leagueId || "");
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

    const handleNavigationPlayers = () => {
        navigate(`/Players/${id}`);
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
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>No hay datos de elementos disponibles</div>
                    )}
                    <div className="bottom">
                        <button onClick={handleNavigationPlayers}>Ver once inicial</button>
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