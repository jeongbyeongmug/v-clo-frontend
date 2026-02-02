import { useNavigate } from "react-router-dom";

export default function FindPassword() {
    const navigate = useNavigate();
    return (
        <>
        <button onClick={() => {navigate(-1)}}>&lt;</button>
        FindPassword
        </>
    );
}//FindPassword