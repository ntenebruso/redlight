import { useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Gallery({ galleryData, mediaMetadata }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    function prevSlide() {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }

    function nextSlide() {
        if (currentSlide < galleryData.items.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    return (
        <>
            <div className="h-[500px] relative">
                <button
                    className="absolute left-2 top-1/2 text-4xl text-black bg-white rounded-full"
                    onClick={prevSlide}
                >
                    <FiArrowLeft />
                </button>
                <img
                    className="h-full mx-auto"
                    src={
                        mediaMetadata[galleryData.items[currentSlide].media_id]
                            .s.u
                    }
                />
                <button
                    className="absolute right-2 top-1/2 text-4xl text-black bg-white rounded-full"
                    onClick={nextSlide}
                >
                    <FiArrowRight />
                </button>
            </div>
            <p>{galleryData.items[currentSlide].caption}</p>
        </>
    );
}
