import { useState, useEffect } from "react";
import { uploadService } from "./../../../services/uploadService";
import { decodeToken } from "../../../utils/authUtil";

const Setting: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            setUserId(decodedToken.userId);
        } else {
            console.log("No token found in localStorage");
        }
    }, []);

    const handleImageUpload = async () => {
        if (image && userId !== null) {
            try {
                const imageUrl = await uploadService(image, userId);
                console.log("Image uploaded: ", imageUrl);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    };

    return (
        <div className="setting">
            <div>Setting</div>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                placeholder="upload image"
            />
            <button onClick={handleImageUpload}>Upload</button>
        </div>
    );
};

export default Setting;