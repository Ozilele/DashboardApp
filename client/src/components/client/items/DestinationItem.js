import './destination.css';
import { useRef } from 'react';
import { motion, useScroll, useTransform, cubicBezier, easeIn } from 'framer-motion';
import image from '../../../img/some_1.png';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import useImageLoaded from '../../../hooks/useImageLoaded';

const DestinationItem = ({ id, city, country, count }) => {

  const { ref, onLoad, loaded } = useImageLoaded();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1], { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) });
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.55, 1]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className='destination-item'
    >
      <div className='destination-item-img'>
        <img 
          ref={ref}
          style={{ opacity: loaded ? 1 : 0}}
          onLoad={onLoad}
          loading='lazy'
          src={image} 
          alt={id} 
        />
      </div>
      <div className='destination-item-box'>
        <h3>{0}{id + 1}</h3>
        <div></div>
        <ThumbUpAltOutlinedIcon className='thumb-up-icon'/>
        <span>{count}</span>
      </div>
      <div className='destination-item-location'> 
        <h4>{country}</h4>
        <div>
          <CircleIcon className='circle-icon'/>
          <h5>{city}</h5>
        </div>
      </div>
    </motion.section>
  )
}

export default DestinationItem;