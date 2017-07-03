///<reference path="../typings/babylon.d.ts"/>

declare var ClipperLib;

export class ShapePlank {

   public scene: any;
   protected plankData: Array<BABYLON.Vector3>;
   protected faceUV: Array<BABYLON.Vector4>;
   protected plank: any;

   public constructor() {
      this.plankData = [
         new BABYLON.Vector3(-3.5, 0, 0),
         new BABYLON.Vector3(3.5, 0, 0),
         new BABYLON.Vector3(3.5, 0, 1.5),
         new BABYLON.Vector3(2, 0, 1.5),
         new BABYLON.Vector3(2, 0, 2.85),
         new BABYLON.Vector3(3.5, 0, 2.85),
         new BABYLON.Vector3(3.5, 0, 4),
         new BABYLON.Vector3(-3.5, 0, 4)
      ];

      this.faceUV = new Array(3);
      this.faceUV[0] = new BABYLON.Vector4(0, 0, 0.5, 1);
      this.faceUV[2] = new BABYLON.Vector4(0.5, 0, 1, 1);

      this.plank = BABYLON.MeshBuilder.ExtrudePolygon("plank", { shape: this.plankData, depth: 0.1, faceUV: this.faceUV }, this.scene);
      this.plank.position.y = 0.21;
      this.plank.position.z = 0.15;
      this.plank
   }

   public drawPolygon(): void {
      var cpr = new ClipperLib.Clipper();
      var subj = [[{ X: 10, Y: 10 }, { X: 110, Y: 10 }, { X: 110, Y: 110 }, { X: 10, Y: 110 }],
      [{ X: 20, Y: 20 }, { X: 20, Y: 100 }, { X: 100, Y: 100 }, { X: 100, Y: 20 }]];

      var clip = [[{ X: -50, Y: 50 }, { X: 150, Y: 50 }, { X: 150, Y: 52 }, { X: -50, Y: 52 }]
      ];

      for (var i in subj) {
         var s = subj[i];
         var pts = [];
         for (var j in s) {
            var p = s[j];
            pts.push(new BABYLON.Vector3(p.X, p.Y, 0));
         }
         var js1 = BABYLON.LinesMesh.CreateLines('sj1', pts, this.scene);
         js1.color = new BABYLON.Color3(1, 0, 0);
      }

      for (var i in clip) {
         var s = clip[i];
         var pts = [];
         for (var j in s) {
            var p = s[j];
            pts.push(new BABYLON.Vector3(p.X, p.Y, 1));
         }
         var js2 = BABYLON.LinesMesh.CreateLines('sj2', pts, this.scene);
         js2.color = new BABYLON.Color3(0, 1, 0);
      }



      var solution = new ClipperLib.Paths();
      cpr.AddPaths(subj, ClipperLib.PolyType.ptSubject, true);
      cpr.AddPaths(clip, ClipperLib.PolyType.ptClip, true);
      cpr.Execute(ClipperLib.ClipType.ctIntersection, solution);
      cpr.AddPaths(solution, ClipperLib.PolyType.ptClip, true);
      cpr.Execute(ClipperLib.ClipType.ctDifference, solution);

      var lod = 3;
      for (var i in solution) {
         var s = solution[i] as { X: number; Y: number }[];
         var pts = [];
         for (var j in s) {
            var p = s[j];
            pts.push(new BABYLON.Vector3(p.X, p.Y, lod));
         }
         lod ++;
         var js3 = BABYLON.LinesMesh.CreateLines('sj3', pts, this.scene);
         js3.color = new BABYLON.Color3(Math.random(),Math.random(), Math.random());
         js3.edgesWidth = 2;

         var wall = BABYLON.MeshBuilder.ExtrudePolygon("wall", {shape:solution, depth: 0.15}, this.scene);
      }
   }

   /**
    * var cliptype = ClipperLib.ClipType.ctIntersection;
var cliptype = ClipperLib.ClipType.ctUnion;
var cliptype = ClipperLib.ClipType.ctDifference;
var cliptype = ClipperLib.ClipType.ctXor;
    */

   /**画横板 */
   public drawHorzPlank(): void {

   }

   /**画侧板 */
   public drawVertPlank(): void {

   }

   /**画背板 */
   public drawRearPlank(): void {

   }



   public update(): void {
      //   this.drawHorzPlank();
      this.drawPolygon();
   }

   private computeArc(start: BABYLON.Vector3, end: BABYLON.Vector3, stepAngle: number): Array<BABYLON.Vector3> {
      var v = new Array();
      return v;
   }

}