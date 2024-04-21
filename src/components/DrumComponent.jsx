import { useRef, useEffect } from "react";

const DrumComponent = ({ diametro, tipo, keyName, onClick }) => {
    let componentClass, imgClass, imgSrc, imgAlt;
  
    switch (tipo) {
      case 'platillo':
        componentClass = 'drum-cymbal';
        imgClass = 'logo bottom';
        imgSrc = '/src/assets/images/cymbal-logo.png';
        imgAlt = 'Logo de platillo';
        break;
      case 'cuerpo':
        componentClass = 'drum-body';
        imgClass = 'logo top';
        imgSrc = '/src/assets/images/drum-logo.png';
        imgAlt = 'Logo de batería';
        break;
    }
  
    return (
      <div className={componentClass} style={{ width: `${diametro}`, height: `${diametro}` }} onClick={onClick}>
        <img className={imgClass} src={imgSrc} alt={imgAlt} />
        <p className='key'>{keyName}</p>
      </div>
    );
  }
  
  export const DrumKit = () => {
    const keySoundMapRef = useRef({
      ' ': new Audio('/src/assets/audio/kick.wav'),
      's': new Audio('/src/assets/audio/snare.wav'),
      'a': new Audio('/src/assets/audio/hihat.wav'),
      'q': new Audio('/src/assets/audio/crash1.wav'),
      'd': new Audio('/src/assets/audio/tom1.wav'),
      'f': new Audio('/src/assets/audio/tom2.wav'),
      't': new Audio('/src/assets/audio/crash2.wav'),
      'b': new Audio('/src/assets/audio/ride.wav'),
    });
  
    const playSound = (key) => {
      const soundFile = keySoundMapRef.current[key];
      if (soundFile) {
        soundFile.currentTime = 0; // Reset the audio file to the beginning
        soundFile.play();
      }
    }
  
    useEffect(() => {
      const handleKeyPress = (event) => {
        playSound(event.key);
      };
  
      // Add event listener for key press
      document.addEventListener('keydown', handleKeyPress);
  
      // Clean up event listener
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []);
  
    return (
      (
        <>
          <div className='drum-upper'>
            <DrumComponent diametro='100px' tipo='platillo' keyName='Q' onClick={() => playSound('q')}></DrumComponent>
            <DrumComponent diametro='50px' tipo='cuerpo' keyName='D' onClick={() => playSound('d')}></DrumComponent>
            <DrumComponent diametro='70px' tipo='cuerpo' keyName='F' onClick={() => playSound('f')}></DrumComponent>
            <DrumComponent diametro='120px' tipo='platillo' keyName='T' onClick={() => playSound('t')}></DrumComponent>
          </div>
          <div className='drum-lower'>
            <DrumComponent diametro='60px' tipo='platillo' keyName='A' onClick={() => playSound('a')}></DrumComponent>
            <DrumComponent diametro='80px' tipo='cuerpo' keyName='S' onClick={() => playSound('s')}></DrumComponent>
            <DrumComponent diametro='130px' tipo='cuerpo' keyName='Space' onClick={() => playSound(' ')}></DrumComponent>
            <DrumComponent diametro='140px' tipo='platillo' keyName='B' onClick={() => playSound('b')}></DrumComponent>
          </div>
        </>
      )
    );
  };