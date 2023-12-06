import { useState, useEffect } from "react";
import LoadingSpinner from "../tools/LoadingSpinner";
import useFetch from "../tools/useFetch";
import "./Carousel.css";

export default function Carousel({ api }) {
    const { data, loading, error, fetchData } = useFetch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideStyle, setSlideStyle] = useState({});

    useEffect(() => {
        fetchData(api.get());
    }, []);

    useEffect(() => {
        const width = document.querySelector('.carousel')?.offsetWidth;
        setSlideStyle({ transform: `translateX(-${currentIndex * width}px)` });
    }, [currentIndex]);

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

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div>Error al cargar los datos</div>
            ) : data.length > 0 ? (
                <>
                    <div className="carousel-header">{data[currentIndex].name}</div>
                    <div className="carousel-wrapper">
                        <div className="arrow" onClick={() => handleSlide('prev')}>&#10092;</div>
                        <div className="carousel" style={slideStyle}>
                            {data.map((item, index) => (
                                <div key={index} className="slide">
                                    {item.id === data[currentIndex].id ? item.name : null }
                                </div>
                            ))}
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

