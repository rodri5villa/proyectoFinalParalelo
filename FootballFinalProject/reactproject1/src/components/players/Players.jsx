import Header from "../tools/Header";
import "./Players.css";
import useFetch from "../tools/useFetch.jsx";
import { useEffect } from "react";
import { playerApi } from "../api/Api.jsx";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../tools/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Players() {
    const { data, loading, error, fetchData } = useFetch();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(playerApi.getByTeamId(id))
    }, []);

    const handleNavigateToPlayer = (id) => {
        navigate(`/Player/${id}`);
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Attack</th>
                                        <th>Defense</th>
                                        <th>Pass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(player => (
                                        <tr
                                            key={player.id}
                                            onClick={() => handleNavigateToPlayer(player.id)}
                                        >
                                            <td>{player.id}</td>
                                            <td>{player.name}</td>
                                            <td>{player.lastName}</td>
                                            <td>{player.attack}</td>
                                            <td>{player.defense}</td>
                                            <td>{player.pass}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default Players;
