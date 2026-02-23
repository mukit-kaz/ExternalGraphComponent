import { Shape } from "../../graph/type/constant";

const Rect = { height: 80, width: 150 };
const Circle = { height: 80, width: 150 };
const Rhombus = { height: 120, width: 120 };
const Triangle = { height: 100, width: 150 };
const Hexagon = { height: 100, width: 150 };
const Pentagon = { height: 100, width: 150 };
const Octagon = { height: 100, width: 150 };

export function CalculateShapeHeight(type:string,scale:number=1) {
    switch (type) {
        case Shape.Rectangle:
        case Shape.Rectangle_Dot:
            return Rect.height*scale;
        case Shape.Circle:
        case Shape.Circle_Dot:
            return Circle.height*scale;
        case Shape.Rhombus:
        case Shape.Rhombus_Dot:
            return Rhombus.height*scale;
        case Shape.Hexagon:
            return Hexagon.height*scale;
        case Shape.Pentagon:
            return Pentagon.height*scale;
        case Shape.Octagon:
            return Octagon.height*scale;
        case Shape.Triangle:
            return Triangle.height*scale;
        default:
            return Rect.height*scale;
    }
}

export function CalculateShapeWidth(type:string,scale:number=1) {
    switch (type) {
        case Shape.Rectangle:
        case Shape.Rectangle_Dot:
            return Rect.width*scale;
        case Shape.Circle:
        case Shape.Circle_Dot:
            return Circle.width*scale;
        case Shape.Rhombus:
        case Shape.Rhombus_Dot:
            return Rhombus.width*scale;
        case Shape.Hexagon:
            return Hexagon.width*scale;
        case Shape.Pentagon:
            return Pentagon.width*scale;
        case Shape.Octagon:
            return Octagon.width*scale;
        case Shape.Triangle:
                return Triangle.width*scale;
        default:
            return Rect.width*scale;
    }
}