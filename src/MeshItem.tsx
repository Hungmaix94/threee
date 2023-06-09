import {useFrame, useThree} from '@react-three/fiber';
import React, {memo, useContext, useEffect, useMemo, useRef} from 'react'
import {Box3, Mesh, MeshStandardMaterial, PerspectiveCamera, Vector3} from "three";
import {CanvasWrapperContext} from "./App";
import {debounce} from "leva/plugin";

// @ts-ignore
const fitCameraToObject = function(camera, object, offset, controls) {
    offset = offset || 1.25;

    const boundingBox = new Box3();

    // get bounding box of object - this will be used to setup controls and camera
    boundingBox.setFromObject(object);
    const vec = new Vector3();
    const center = boundingBox.getCenter(vec);

    const size = boundingBox.getSize(vec);

    // get the max side of the bounding box (fits to width OR height as needed )
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));

    cameraZ *= offset; // zoom out a little so that objects don't fill the screen

    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if (controls) {
        // set camera to rotate around center of loaded object
        controls.target = center;

        // prevent camera from zooming out far enough to create far plane cutoff
        controls.maxDistance = cameraToFarEdge * 2;

        controls.saveState();
    } else {
        camera.lookAt(center);
    }
};

export const MeshItem = (props: any) => {
    const meshRef = useRef(null);
    const {meshSelected, setMeshSelected} = useContext(CanvasWrapperContext);
    const vec = new Vector3();
    const {}

    // const {camera} = useThree();
    useEffect(() => {
        if(meshRef.current === null) {
            return
        }
        if (meshSelected === props.uuid) {
            // @ts-ignore
            console.log(meshRef.current.position, 'meshRef.current.position')
            // camera.lookAt(meshRef.current.position);
            // camera.position.lerp(vec.set(5, 5, 5), 0.1);
            // camera.updateProjectionMatrix();
        }
    })
    // useFrame(() => {
    //     console.log("Hey, I'm executing every frame!")
    // })

    useEffect(()=> {
        // @ts-ignore
        console.log(meshRef.current.position,'000000000000000000')
    })



    return <mesh
        position={props.position}
        geometry={props.geometry}
        material={props.material}
        ref={meshRef}
        castShadow={true}

        onClick={(vectorEvent) => {
            fitCameraToObject(camera, )

        }}
    />
}
