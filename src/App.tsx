import './App.css'
import {Canvas, useThree} from '@react-three/fiber'
import {Lamborghini} from './Lamborghini'
import {Center, Environment, Html, OrbitControls, useGLTF} from "@react-three/drei";
import React, {createContext, Suspense, useEffect, useRef, useState} from "react";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {CameraBoundToMesh, CameraController} from "./CameraMoveToMesh";
import {Mesh} from "three";
import {MeshItem} from "./MeshItem";

interface ICanvasContext {
    scene: Record<string, any>,
    nodes: Record<string, any>,
    meshes: any,
    positions: number[],
    setPositions: (positions: number[]) => void,
    materials: Record<string, any>,
    meshSelected?: string,
    setMeshSelected?: any,
}

export type GLTFResult = GLTF & {
    nodes: Record<string, any>;
    materials: Record<string, any>;
}

export const CanvasWrapperContext = createContext<ICanvasContext>({
    scene: {},
    nodes: {},
    meshSelected: '',
    positions: [],
    meshes: [],
    materials: {},
    setPositions(nodes) {
    },
});

function App() {
    const [select, setMeshSelected] = useState<Mesh>();
    const meshes = useRef<Mesh[]>([]);
    const [positions, setPositions] = useState([5, 5, 5]);
    const {scene, nodes, materials,} = useGLTF('lambo.glb') as GLTFResult;
    console.log(nodes,'nodes')
    return (
        <CanvasWrapperContext.Provider value={{
            scene,
            nodes,
            materials,
            positions,
            setPositions,
            meshes: meshes,
            meshSelected: select?.uuid,
            setMeshSelected
        }}>
            <div className="App">
                <Canvas>
                    <Suspense>
                        <Lamborghini scale={0.015}/>
                    </Suspense>
                    <OrbitControls enablePan={true} enableZoom={true}/>
                    <ambientLight intensity={1}/>
                    <Environment preset={'forest'} background={true}/>
                </Canvas>
            </div>

            <CameraController

                scene={scene}
                positions={positions}
                setPositions={setPositions}
                setSelect={setMeshSelected}
            ></CameraController>

        </CanvasWrapperContext.Provider>

    )
}

export default App
