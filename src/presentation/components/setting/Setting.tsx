import { useState } from "react";
import { uploadService } from "./../../../services/uploadService";

const Setting: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = async () => {
        if (image) {
            try {
                const imageUrl = await uploadService(image);
                console.log("Image uploaded: ", imageUrl);
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    }

    return (
        <div className="setting">
            <div>Setting</div>
            <input
                type="file"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                placeholder="upload image" />
            <button onClick={handleImageUpload}>Upload</button>
        </div>
    );
}

export default Setting;