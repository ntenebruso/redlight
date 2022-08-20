import { useRef, useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function Gallery({ galleryData, mediaMetadata }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesEl = useRef(null);

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

    useEffect(() => {
        for (var i = 0; i < slidesEl.current.children.length; i++) {
            if (i < currentSlide) {
                slidesEl.current.children[i].style.left = "-100%";
            } else if (i > currentSlide) {
                slidesEl.current.children[i].style.left = "100%";
            } else {
                slidesEl.current.children[i].style.left = "0";
            }
        }
    }, [currentSlide]);

    return (
        <>
            <div className="h-[500px] relative">
                <button
                    className="absolute left-2 top-1/2 text-4xl text-black bg-white rounded-full z-10"
                    onClick={prevSlide}
                >
                    <FiArrowLeft />
                </button>
                <span className="block absolute top-2 right-2 bg-black bg-opacity-75 z-10 text-sm px-2 py-1 rounded-full">
                    {currentSlide + 1}/{galleryData.items.length}
                </span>
                <div
                    className="slides relative h-full overflow-hidden"
                    ref={slidesEl}
                >
                    {galleryData.items.map((item, index) => (
                        <div
                            className="h-full w-full block absolute left-0 transition-all"
                            key={index}
                        >
                            <img
                                className="h-full mx-auto"
                                src={mediaMetadata[item.media_id].s.u}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="absolute right-2 top-1/2 text-4xl text-black bg-white rounded-full z-10"
                    onClick={nextSlide}
                >
                    <FiArrowRight />
                </button>
            </div>
            <p>{galleryData.items[currentSlide].caption}</p>
        </>
    );
}
