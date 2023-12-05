import LoadingSpinner from "../tools/LoadingSpinner";
import useFetch from "../tools/useFetch";
import "./Teams.css";
function Teams() {

    const { data, loading, error, fetchData } = useFetch();

    return (
        <>
            {loading ? (<LoadingSpinner />) : (
                <>
                    <div className="teams-header">1
                    </div>
                    <div className="teams-body">2
                    </div>
                </>
            )}
        </>
    );
}

export default Teams;