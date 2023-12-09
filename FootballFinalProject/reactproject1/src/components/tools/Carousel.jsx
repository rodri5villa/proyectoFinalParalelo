import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../tools/LoadingSpinner";
import useFetch from "../tools/useFetch";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

export default function Carousel({ api, id, setId, isLeague }) {
    const { data, loading, error, fetchData } = useFetch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const listRef = useRef(null);
    const navigate = useNavigate();

    if (!isLeague) {
        useEffect(() => {
            fetchData(api);
        }, []);

        useEffect(() => {
            if (data[currentIndex]) {
                setId(data[currentIndex].id);
            }
        }, [currentIndex, data]);
    } else {
        useEffect(() => {
            fetchData(api);
        }, [id]);
    }

    useEffect(() => {
        const listNode = listRef.current;

        if (listNode) {
            const imgNodes = listNode.querySelectorAll("li > img");

            if (imgNodes.length > 0 && currentIndex >= 0 && currentIndex < imgNodes.length) {
                const imgNode = imgNodes[currentIndex];

                imgNode.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [currentIndex]);

    useEffect(() => {
        const filteredIndex = data.findIndex(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (filteredIndex !== -1) {
            setCurrentIndex(filteredIndex);
        }
    }, [searchValue]);

    const handleSlide = (direction) => {
        if (direction === "next") {
            setCurrentIndex((prevIndex) =>
                prevIndex === data.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? data.length - 1 : prevIndex - 1
            );
        }
    };

    const handleNavigationAdd = () => {
        if (isLeague) {
            return () => navigate("/add-team");
        } else {
            return () => navigate("/add-league");
        }
    }

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div>Error al cargar los datos</div>
            ) : data.length > 0 ? (
                <>
                    <div className="carousel-header">
                        <input
                            type="text"
                            placeholder="Search.."
                            name="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <div className="add-button" onClick={handleNavigationAdd()}>+</div>
                    </div>
                    <div className="carousel-wrapper">
                        <div className="arrow" onClick={() => handleSlide('prev')}>&#10092;</div>
                        <div className="carousel">
                            <ul ref={listRef}>
                                {data.map((item) => {
                                    return (
                                        <li
                                            key={item.id}
                                            style={{
                                                height: item.id === data[currentIndex].id ? "100%" : "0",
                                                overflow: "hidden",
                                                transition: "height 0.5s ease",
                                            }}
                                            onClick={() => {
                                                if (isLeague) {
                                                    navigate(`/Team/${item.id}`);
                                                } else {
                                                    navigate(`/League/${item.id}`);
                                                }
                                            }}
                                        >
                                            <img
                                                src={item.image ? `data:image/png;base64,${item.image}` : null}
                                                alt={item.name}
                                                style={{
                                                    display: item.id === data[currentIndex].id ? "initial" : "none",
                                                    transition: "display 0s ease 0.5s",
                                                }}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>


                        <div className="arrow" onClick={() => handleSlide('next')}>&#10093;</div>
                    </div>
                </>
            ) : (
                <div>No hay datos de elementos disponibles</div>
            )}
        </>
    );
}