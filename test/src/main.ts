import * as view from './index';
import { Viewer } from './Viewer';
import { ShapePlank } from './plank';
var sk_curve = (window as any).sk_curve = (window as any).sk_curve || {};
sk_curve.view = view;
export function start() {
   var viewer = new Viewer("renderCanvas");
   var plank = new ShapePlank();
   viewer.addChild(plank);
   viewer.update();
   viewer.animate();
}
