export const animationSlide = {
    hidden: {
        x: '100%', 
        opacity: 0 
    },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition : { delay: 0.2, duration: 0.1, type: 'spring', stiffness: '80'},
    },
    exit: { 
        x: '-100%', 
        opacity: 0,
        transition : { delay: 0.2, duration: 0.1 } 
    }
}