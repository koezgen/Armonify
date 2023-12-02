import Header from "../components/Header";
import {useParams} from "react-router-dom";
const ArtistPage = () =>
{

    const { performer } = useParams();
    return (
        <div className="bg-[#081730]">
            <Header />
            <h1>
                {performer}
            </h1>
        </div>
    );
};

export default ArtistPage;