import { useState } from 'react';
import Header from '../tools/Header';
import useFetch from '../tools/useFetch';
import { leagueApi, teamApi } from '../api/Api';
import Select from '../tools/Select';

function AddTeam() {
    const { data, loading, error, fetchData } = useFetch();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [leagueId, setLeagueId] = useState(0);
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);

    const handleRestore = () => {
        setName('');
        setCity('');
        setImage(null);
        setTempImage(null);
    }

    const handleAdd = async () => {
        let newLeague;
        if (tempImage) {
            const base64Image = await convertBlobToBase64(tempImage);
            newLeague = {
                name: name,
                city: city,
                leagueId: leagueId,
                image: base64Image,
            };
        } else {
            newLeague = {
                name: name,
                city: city,
                leagueId: leagueId,
                image: image,
            };
        }
        fetchData(teamApi.create(newLeague));
        //window.location.href = '/';
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

    return (
        <>
            <section className="layout">
                <div className="header">
                    <Header />
                </div>
                <div className="main2">
                    <div className="top">
                        <div className="left-player">
                            <label htmlFor="equipo"><b>Equipo</b></label>
                            <input type="text" id="equipo" name="Equipo" value={name} onChange={(e) => setName(e.target.value)} />
                            <br /><br /><br />
                            <label htmlFor="ciudad"><b>Ciudad</b></label>
                            <input type="text" id="ciudad" name="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
                            <br></br>
                            <label htmlFor="IdLeague"><b>Liga</b></label>
                            <Select className="select" api={leagueApi.get()} setId={setLeagueId} />
                        </div>
                        <div className="rigth-team">
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
                            />
                            <div className="process">
                                <button onClick={handleRestore}>Restaurar</button>
                                <button className={"update-button"} onClick={handleAdd}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    @Rodrigo Villa & Borja Martinez
                </div>
            </section>
        </>
    );
}

export default AddTeam;