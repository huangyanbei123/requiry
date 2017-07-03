///<reference path="../typings/babylon.d.ts"/>

import { ShapePlank } from './plank';

export class Viewer {
   protected _canvas: HTMLCanvasElement;
   protected _engine: BABYLON.Engine;
   protected _scene: BABYLON.Scene;
   protected _camera: BABYLON.ArcRotateCamera;
   protected _light: BABYLON.Light;

   protected _children: Array<ShapePlank>;

   constructor(canvasElement: string) {
      this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
      this._engine = new BABYLON.Engine(this._canvas, true);
      this._scene = new BABYLON.Scene(this._engine);
      this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 25, new BABYLON.Vector3(0, 5, -10), this._scene);
      this._camera.attachControl(this._canvas, true);
      this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), this._scene);
      
      this._children = new Array;
   }

   public animate(): void {
      // run the render loop
      this._engine.runRenderLoop(() => {
         this._scene.render();
      });

      window.addEventListener('resize', () => {
         this._engine.resize();
      });
   }

      public addChild(child: ShapePlank): void {
       
         var index = this._children.indexOf(child);
         if (index < 0) {
            child.scene = this._scene;
            this._children.push(child);
            child.update();
         }
      }
   
      public removeChild(child: ShapePlank): void {
         var index = this._children.indexOf(child);
         if (index >= 0) {
            if (index != this._children.length - 1) {
               var temp = this._children[index];
               this._children[index] = this._children.pop();
               this._children.push(temp);
               child.update();
            }
         }
      }
   
      public getChild(index: number): ShapePlank {
         var child = null;
         if (index < this._children.length) {
            child = this._children[index];
         }
   
         return child;
      }
   
      public init(): void {
      }
   
      public update(): void {
         for (var ch in this._children) {
            var child = this._children[ch];
            child.update();
         }
      }
}