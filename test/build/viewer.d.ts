/// <reference path="../typings/babylon.d.ts" />
declare module "node" {
    export class MyNode {
        scene: any;
        constructor();
        update(): void;
    }
}
declare module "plank" {
    export class ShapePlank {
        scene: any;
        protected plankData: Array<BABYLON.Vector3>;
        protected faceUV: Array<BABYLON.Vector4>;
        protected plank: any;
        constructor();
        drawPolygon(): void;
        /**
         * var cliptype = ClipperLib.ClipType.ctIntersection;
     var cliptype = ClipperLib.ClipType.ctUnion;
     var cliptype = ClipperLib.ClipType.ctDifference;
     var cliptype = ClipperLib.ClipType.ctXor;
         */
        /**画横板 */
        drawHorzPlank(): void;
        /**画侧板 */
        drawVertPlank(): void;
        /**画背板 */
        drawRearPlank(): void;
        update(): void;
        private computeArc(start, end, stepAngle);
    }
}
declare module "viewer" {
    import { ShapePlank } from "plank";
    export class Viewer {
        protected _canvas: HTMLCanvasElement;
        protected _engine: BABYLON.Engine;
        protected _scene: BABYLON.Scene;
        protected _camera: BABYLON.ArcRotateCamera;
        protected _light: BABYLON.Light;
        protected _children: Array<ShapePlank>;
        constructor(canvasElement: string);
        animate(): void;
        addChild(child: ShapePlank): void;
        removeChild(child: ShapePlank): void;
        getChild(index: number): ShapePlank;
        init(): void;
        update(): void;
    }
}
declare module "index" {
    export * from "node";
    export * from "plank";
    export * from "viewer";
}
declare module "main" {
    export function start(): void;
}
