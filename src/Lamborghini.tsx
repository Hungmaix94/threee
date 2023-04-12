import React, {useCallback, useContext, useEffect, useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import {MeshItem} from "./MeshItem";
import {CanvasWrapperContext, GLTFResult} from "./App";

let x = 1;

export function Lamborghini(props: any) {
    const {scene,} = useContext(CanvasWrapperContext)
    const generateLayer = useCallback((layer: Record<string, any>): any => {

        switch (layer.type) {
            case 'Mesh':
                return <MeshItem {...layer} key={layer.uuid}/>;
            case 'Object3D':
            default:

                return <group {...layer} key={layer.uuid}>
                    {
                        layer?.children?.map((layerItem: Record<string, any>) => {
                            return generateLayer({...layerItem})
                        })
                    }
                </group>
        }

    }, []);


    return <group {...props} >
        {generateLayer(scene)}
    </group>
}
