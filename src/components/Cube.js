import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';
import { useStore } from '../hooks/useStore';
import { useState } from 'react';

export const Cube = ({ position, texture }) => {
  const [hovered, setHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));
  const activeTexture = textures[texture + 'Texture'];

  const [addCube, removeCube] = useStore(state => [
    state.addCube,
    state.removeCube,
  ]);

  return (
    <mesh
      onPointerOver={e => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={e => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={e => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        } else if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
      ref={ref}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={hovered ? 'grey' : 'white'}
        map={activeTexture}
        transparent={true}
        opacity={texture === 'glass' ? 0.8 : 1}
        attach='material'
      />
    </mesh>
  );
};
