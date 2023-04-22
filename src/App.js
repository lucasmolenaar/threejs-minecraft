import { Canvas } from '@react-three/fiber';
import './App.css';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
import { Menu } from './components/Menu';

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />

        <FPV />
        <Physics>
          <Ground />
          <Cubes />
          <Player />
        </Physics>
      </Canvas>

      <div className='absolute center cursor'>+</div>
      <TextureSelector />
      <Menu />
    </>
  );
}

export default App;
