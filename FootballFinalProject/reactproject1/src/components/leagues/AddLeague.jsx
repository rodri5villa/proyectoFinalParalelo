import { useState } from 'react';
import Header from '../tools/Header';
import useFetch from '../tools/useFetch';
import { leagueApi } from '../api/Api';

function AddLeague() {
    const { data, loading, error, fetchData } = useFetch(); 
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);

    const handleRestore = () => {
        setName('');
        setCountry('');
        setImage(null);
        setTempImage(null);
    }

    const handleAdd = async () => {
        let newLeague;
        if (tempImage) {
            const base64Image = await convertBlobToBase64(tempImage);
            newLeague = {
                name: name,
                country: country,
                image: base64Image,
            };
        } else {
            newLeague = {
                name: name,
                country: country,
                image: image,
            };
        }
        fetchData(leagueApi.create(newLeague));
        window.location.href = '/';
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

export default AddLeague;