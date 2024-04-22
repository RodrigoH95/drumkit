import { useRef, useEffect, useState } from "react";
import { kickAudio, snareAudio, hihatAudio, crash1Audio, tom1Audio, tom2Audio, crash2Audio, rideAudio } from '/src/utils/audioFiles';


const DrumComponent = ({ diametro, tipo, keyName, onClick, keysPressed }) => {
  let componentClass, imgClass, imgSrc, imgAlt;

  switch (tipo) {
    case 'platillo':
      componentClass = keysPressed.has(keyName.toLowerCase()) ? 'drum-cymbal active' : 'drum-cymbal';
      imgClass = 'logo bottom';
      imgSrc = '/src/assets/images/cymbal-logo.png';
      imgAlt = 'Logo de platillo';
      break;
    case 'cuerpo':
      componentClass = keysPressed.has(keyName.toLowerCase()) ? 'drum-body active' : 'drum-body';
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
  const [keysPressed, setKeysPressed] = useState(new Set());
  
  const keySoundMapRef = useRef({
    'space': kickAudio,
    's': snareAudio,
    'a': hihatAudio,
    'q': crash1Audio,
    'd': tom1Audio,
    'f': tom2Audio,
    't': crash2Audio,
    'b': rideAudio,
  });

  const handleKeyDown = (event) => {
    const key = event.key.trim() || 'space';
    if (!keysPressed.has(key)) {
      playSound(key);
      setKeysPressed(prevKeys => new Set(prevKeys).add(key));
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key.trim() || 'space';
    setKeysPressed(prevKeys => {
      const updatedKeys = new Set(prevKeys);
      updatedKeys.delete(key);
      return updatedKeys;
    });
  };

  const playSound = (key) => {
    const soundFile = keySoundMapRef.current[key];
    if (soundFile) {
      soundFile.currentTime = 0;
      soundFile.play();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    (
      <>
        <div className='drum-upper'>
          <DrumComponent diametro='100px' tipo='platillo' keyName='Q' onClick={() => playSound('q')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='50px' tipo='cuerpo' keyName='D' onClick={() => playSound('d')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='70px' tipo='cuerpo' keyName='F' onClick={() => playSound('f')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='120px' tipo='platillo' keyName='T' onClick={() => playSound('t')} keysPressed={keysPressed}></DrumComponent>
        </div>
        <div className='drum-lower'>
          <DrumComponent diametro='60px' tipo='platillo' keyName='A' onClick={() => playSound('a')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='80px' tipo='cuerpo' keyName='S' onClick={() => playSound('s')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='130px' tipo='cuerpo' keyName='Space' onClick={() => playSound('space')} keysPressed={keysPressed}></DrumComponent>
          <DrumComponent diametro='140px' tipo='platillo' keyName='B' onClick={() => playSound('b')} keysPressed={keysPressed}></DrumComponent>
        </div>
      </>
    )
  );
};