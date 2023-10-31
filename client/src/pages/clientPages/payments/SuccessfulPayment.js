import { useEffect } from "react";
import './SuccessfulPayment.css';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

const wordAnimation = {
  hidden: {},
  visible: {},
}

const characterAnimation = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 1,
      ease: [0.2, 0.65, 0.3, 0.9],
    }
  }
}
const text = "Thank you for your purchase";

const SuccessfulPayment = () => {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    toast.success('Successful Payment!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: 'light',
      closeOnClick: true,
      pauseOnHover: true,
    });
  }, []);

  useEffect(() => {
    if(inView) {
      ctrls.start("visible");
    }
    if(!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  return (
    <div className="Successful-Payment-Box">
      <Title aria-label={text} role="heading">
        {text.split(" ").map((word, index) => {
          return (
            <Word
              ref={ref}
              aria-hidden="true"
              key={index}
              initial="hidden"
              animate={ctrls}
              variants={wordAnimation}
              transition={{
                delayChildren: index * 0.2,
                staggerChildren: 0.05,
              }}
            >
              {word.split("").map((char, index) => {
                return (
                  <Character
                    aria-hidden="true"
                    key={index}
                    variants={characterAnimation}
                  >
                    {char}
                  </Character>
                );
              })}
            </Word>
          );
        })}
      </Title>
      <Link to={'/'}>
        <span>Back to Home</span>
      </Link>
    </div>
  )
}

export default SuccessfulPayment;