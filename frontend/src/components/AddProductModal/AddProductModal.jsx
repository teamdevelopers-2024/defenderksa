import React, { useState } from "react";
import Spinner from "../Spinner/Spinner";

const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
    const [productName, setProductName] = useState("");
    const [articleNumber, setArticleNumber] = useState("");
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [loading , setLoading ] = useState(false)

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array

        // Check if the number of selected images exceeds the limit
        if (files.length > 4) {
            alert("You can upload a maximum of 4 images.");
            e.target.value = ""; // Reset the file input
            return;
        }

        // Check if any image exceeds the size limit (5MB = 5 * 1024 * 1024 bytes)
        const oversizedImages = files.filter((file) => file.size > 5 * 1024 * 1024);
        if (oversizedImages.length > 0) {
            alert("Each image should not exceed 5MB in size.");
            e.target.value = ""; // Reset the file input
            return;
        }

        setImages(files); // Set valid images
    };



    const handleVideoChange = async (e) => {
        const file = e.target.files[0]; // Single video file

        if (!file) return;

        // Check video size (30MB = 30 * 1024 * 1024 bytes)
        if (file.size > 30 * 1024 * 1024) {
            alert("The video size should not exceed 30MB.");
            e.target.value = ""; // Reset the file input
            return;
        }

        // Check video duration (10 seconds)
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);

        videoElement.onloadedmetadata = () => {
            if (videoElement.duration > 10) {
                alert("The video duration should not exceed 10 seconds.");
                e.target.value = ""; // Reset the file input
                return;
            }
            setVideo(file); // Valid file
        };

        videoElement.onerror = () => {
            alert("Invalid video file.");
            e.target.value = ""; // Reset the file input
        };
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (images.length === 0 && !video) {
          alert("Please upload at least one image or video.");
          return;
        }
      
        const cloudinaryImageUrl = `https://api.cloudinary.com/v1_1/dvrvmosez/upload`;
        const cloudinaryVideoUrl = `https://api.cloudinary.com/v1_1/dvrvmosez/video/upload`;
        const uploadPreset = "react_media_upload"; // Replace with your upload preset
      
        try {
            setLoading(true)
          // Upload images and save public IDs
          const uploadedImages = await Promise.all(
            images.map(async (image) => {
              const formData = new FormData();
              formData.append("file", image);
              formData.append("upload_preset", uploadPreset);
      
              const response = await fetch(cloudinaryImageUrl, {
                method: "POST",
                body: formData,
              });
      
              const data = await response.json();
              return { url: data.secure_url, publicId: data.public_id }; // Save URL and public_id
            })
          );
      
          // Upload video and save public ID
          let uploadedVideo = null;
          if (video) {
            const formData = new FormData();
            formData.append("file", video);
            formData.append("upload_preset", uploadPreset);
      
            const response = await fetch(cloudinaryVideoUrl, {
              method: "POST",
              body: formData,
            });
      
            const data = await response.json();
            uploadedVideo = { url: data.secure_url, publicId: data.public_id }; // Save URL and public_id
          }
      
          // Prepare product data with public IDs
          const productData = {
            productName,
            articleNumber,
            images: uploadedImages, // Array of { url, publicId }
            video: uploadedVideo, // Object { url, publicId }
          };
      
          console.log("Product Data with Public IDs:", productData);
          onSubmit(productData); // Pass product data to parent component
      
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          alert("Failed to upload images or video. Please try again.");
        } finally {
            setLoading(false)
        }
      };
      

    if (!isOpen) return null;

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         {loading &&<Spinner/>}
            <div className="bg-white rounded-2xl shadow-xl w-96 p-6">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Product Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            />
                    </div>

                    {/* Article Number */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Article Number</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter article number"
                            value={articleNumber}
                            onChange={(e) => setArticleNumber(e.target.value)}
                            required
                            />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Upload Images</label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            accept="image/*" // This ensures only image files can be selected
                            onChange={handleImageChange}
                            multiple
                            required
                            />

                    </div>

                    {/* Video Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Upload Video</label>
                        <input
                            type="file"
                            className="w-full border rounded-lg p-2"
                            accept="video/*" // This ensures only video files can be selected
                            onChange={
                                handleVideoChange
                            }
                            />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            onClick={onClose}
                            >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
                            </>
    );
};

export default AddProductModal;
