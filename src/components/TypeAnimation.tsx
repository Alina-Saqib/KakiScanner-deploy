import  { useState, useEffect } from 'react';

export const TypeAnimation = ({ sequence, wrapper, speed, style, cursor ,setStatus}: any) => {
    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
   
  
    useEffect(() => {
      let timer: any;
      if (currentIndex < sequence.length) {
        timer = setTimeout(() => {
          const currentText = sequence[currentIndex];
          setText((prevText) =>
            currentText.substring(0, prevText.length + 1)
          );
          if (text.length === currentText.length) {
            setCurrentIndex(currentIndex + 1);
          }
        }, speed);
      }
  
      return () => clearTimeout(timer);
    }, [currentIndex, sequence, speed, text]);

    useEffect(() => {
        if (currentIndex === sequence.length && setStatus) {
            console.log("here")
            setStatus(true);
        }
    }, [currentIndex, sequence, setStatus]);
    
    
      const replaceBufferingColor = (str: any) => {
        return str.replace(/Buffering/g, '<span style="color: red;">Buffering</span>');
      };
    return (
        <span style={style}>
        {wrapper === 'span' ? (
        <span dangerouslySetInnerHTML={{ __html: replaceBufferingColor(text) }} />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: replaceBufferingColor(text) }} />
      )}
      {cursor && <span>|</span>}
      </span>
    );
  };