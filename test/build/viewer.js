define("node", ["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyNode = (function () {
        function MyNode() {
        }
        MyNode.prototype.update = function () {
        };
        return MyNode;
    }());
    exports.MyNode = MyNode;
});
///<reference path="../typings/babylon.d.ts"/>
define("plank", ["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShapePlank = (function () {
        function ShapePlank() {
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
            this.plank;
        }
        ShapePlank.prototype.drawPolygon = function () {
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
                var s = solution[i];
                var pts = [];
                for (var j in s) {
                    var p = s[j];
                    pts.push(new BABYLON.Vector3(p.X, p.Y, lod));
                }
                lod++;
                var js3 = BABYLON.LinesMesh.CreateLines('sj3', pts, this.scene);
                js3.color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
                js3.edgesWidth = 2;
                var wall = BABYLON.MeshBuilder.ExtrudePolygon("wall", { shape: solution, depth: 0.15 }, this.scene);
            }
        };
        /**
         * var cliptype = ClipperLib.ClipType.ctIntersection;
     var cliptype = ClipperLib.ClipType.ctUnion;
     var cliptype = ClipperLib.ClipType.ctDifference;
     var cliptype = ClipperLib.ClipType.ctXor;
         */
        /**画横板 */
        ShapePlank.prototype.drawHorzPlank = function () {
        };
        /**画侧板 */
        ShapePlank.prototype.drawVertPlank = function () {
        };
        /**画背板 */
        ShapePlank.prototype.drawRearPlank = function () {
        };
        ShapePlank.prototype.update = function () {
            //   this.drawHorzPlank();
            this.drawPolygon();
        };
        ShapePlank.prototype.computeArc = function (start, end, stepAngle) {
            var v = new Array();
            return v;
        };
        return ShapePlank;
    }());
    exports.ShapePlank = ShapePlank;
});
///<reference path="../typings/babylon.d.ts"/>
define("viewer", ["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Viewer = (function () {
        function Viewer(canvasElement) {
            this._canvas = document.getElementById(canvasElement);
            this._engine = new BABYLON.Engine(this._canvas, true);
            this._scene = new BABYLON.Scene(this._engine);
            this._camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 25, new BABYLON.Vector3(0, 5, -10), this._scene);
            this._camera.attachControl(this._canvas, true);
            this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), this._scene);
            this._children = new Array;
        }
        Viewer.prototype.animate = function () {
            var _this = this;
            // run the render loop
            this._engine.runRenderLoop(function () {
                _this._scene.render();
            });
            window.addEventListener('resize', function () {
                _this._engine.resize();
            });
        };
        Viewer.prototype.addChild = function (child) {
            var index = this._children.indexOf(child);
            if (index < 0) {
                child.scene = this._scene;
                this._children.push(child);
                child.update();
            }
        };
        Viewer.prototype.removeChild = function (child) {
            var index = this._children.indexOf(child);
            if (index >= 0) {
                if (index != this._children.length - 1) {
                    var temp = this._children[index];
                    this._children[index] = this._children.pop();
                    this._children.push(temp);
                    child.update();
                }
            }
        };
        Viewer.prototype.getChild = function (index) {
            var child = null;
            if (index < this._children.length) {
                child = this._children[index];
            }
            return child;
        };
        Viewer.prototype.init = function () {
        };
        Viewer.prototype.update = function () {
            for (var ch in this._children) {
                var child = this._children[ch];
                child.update();
            }
        };
        return Viewer;
    }());
    exports.Viewer = Viewer;
});
define("index", ["require", "exports", "node", "plank", "viewer"], function (require, exports, node_1, plank_1, viewer_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(node_1);
    __export(plank_1);
    __export(viewer_1);
});
define("main", ["require", "exports", "index", "viewer", "plank"], function (require, exports, view, Viewer_1, plank_2) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var sk_curve = window.sk_curve = window.sk_curve || {};
    sk_curve.view = view;
    function start() {
        var viewer = new Viewer_1.Viewer("renderCanvas");
        var plank = new plank_2.ShapePlank();
        viewer.addChild(plank);
        viewer.update();
        viewer.animate();
    }
    exports.start = start;
});
//# sourceMappingURL=viewer.js.map