import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';


const ScrollToTop = () => {

    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 300) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 300) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{ height: 40, width: 40, display: showScroll ? 'flex' : 'none' }} />
    );
}

export default ScrollToTop;