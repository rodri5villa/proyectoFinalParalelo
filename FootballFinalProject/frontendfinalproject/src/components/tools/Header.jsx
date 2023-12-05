import "./Header.css";
import { useNavigate } from "react-router-dom";
export default function Header() {

    const navigation = useNavigate();

    const handleHomeClick = () => {
        navigation("/");
    }

    return (
        <>
            <div className="header-button" onClick={handleHomeClick}>
                &#8962;
            </div>
        </>
    )
}