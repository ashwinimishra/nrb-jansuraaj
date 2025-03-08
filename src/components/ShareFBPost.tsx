import React from "react";
import { X } from "lucide-react";

interface ShareFBPostProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title?: string;
}

const ShareFBPost: React.FC<ShareFBPostProps> = ({
    isOpen,
    onClose,
    url,
    title,
}) => {
    if (!isOpen) return null;
    // Function to open a responsive window
    const openResponsiveFBWindow = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Calculate new window dimensions based on the screen size
        let width = 600;
        let height = 400;

        // Adjust window size for small screens (like mobile devices)
        if (screenWidth < 768) {
            width = screenWidth - 50;  // Allow for margins/padding
            height = screenHeight - 150;
        }
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
        )}`;
        // Open the new window with responsive size
        window.open(
            facebookShareURL, // URL to open
            '_blank', // Open in a new tab or window
            `width=${width},height=${height},resizable=yes,scrollbars=yes`
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg w-80 relative">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <X className="w-5 h-5 text-yellow-600" />
                </button>
                <h2 className="text-lg font-semibold mb-4 text-yellow-800">
                    {title || "Check this out!"}
                </h2>
                <div
                    onClick={openResponsiveFBWindow}
                    className="w-full bg-yellow-500 text-white text-center py-2 rounded hover:bg-yellow-600 cursor-pointer transition"
                >
                    Share on Facebook
                </div>
            </div>
        </div>
    );
};

export default ShareFBPost;
