import React, {useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {Box3, Mesh, PerspectiveCamera, Vector3} from 'three';
import {MeshItem} from "./MeshItem";

// @ts-ignore
export function CameraController({positions, setPositions, scene, setSelect}) {

    function handleClick(mesh: Mesh) {
        setSelect(mesh)
    }

    const generateLayer = (layer: Record<string, any>): any => {

        switch (layer.type) {
            case 'Mesh':
                return <button className={'mesh-item-select'} onClick={() => handleClick(layer as Mesh)}>{layer.name}</button>

            case 'Object3D':
            default:
                return layer?.children.map((layerItem: Record<string, any>) => {
                    return generateLayer(layerItem)
                })
        }

    };

    return (
        <div className={'mesh-wrapper'}>
            {
                generateLayer(scene)
            }
        </div>
    )
}

export function CameraBoundToMesh({mesh, setMesh}: { mesh: Mesh, setMesh: any }) {
    const {camera} = useThree<{ camera: PerspectiveCamera }>();
    // Calculate the bounding box of the mesh
console.log(camera.position,'camera.position')

    // Set the camera's position and rotation based on the bounding box
    if(mesh) {
        const newPosition = new Vector3()
        newPosition.setFromMatrixPosition(mesh.matrixWorld)
        // const newPosition = mesh.parent.position;
        console.log(newPosition,'newPosition', camera.position)
        // camera.position.copy(newPosition);
        // // camera.position.z += Math.max(newPosition[0], size.y, size.z) * 0.5 / Math.tan(Math.PI * camera.fov / 360);
        // camera.lookAt(newPosition);
    }


    return null;
}