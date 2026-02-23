
export function ShapeRectangle(label:string,borderStyle:string='solid',border:string='#000000',background:string='#ffffff') {
    return `
    <div style="display: flex; align-items: center;margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${border}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 50px; margin:5px; overflow: hidden; background-color: ${background}; border-width: 2px; border-style: ${borderStyle}; border-color: ${border}; border-radius: 8px; display: flex; justify-content: center; align-items: center; overflow: hidden;">
    <span style="padding: 5px 0 5px 0; font-size:9px; color: ${border}; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">Rectangle</span>
    </div>
    </div>
    `;
}

export function ShapeCircle(label:string,borderStyle:string='solid',border:string='#000000',background:string='#ffffff') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${border}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 50px; margin:5px; overflow: hidden; background-color: ${background}; border-width: 2px; border-style: ${borderStyle}; border-color: ${border}; border-radius: 50%; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: flex; justify-content: center; align-items: center; overflow: hidden;">
    <span style="padding: 5px 0 5px 0; font-size:9px; color: ${border}; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">Circle</span>
    </div>
    </div>
    `;
}

export function ShapeRhombus(label:string,borderStyle:string='solid',border:string='#000000',background:string='#ffffff') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${border}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 40px; height: 40px; margin: 10px; overflow: hidden; background-color: ${background}; border-width: 2px; border-style: ${borderStyle}; border-color: ${border}; transform: rotate(45deg); display: flex; justify-content: center; align-items: center; overflow: hidden; inset: 15%;">
    <span style=" color: ${border}; font-size:9px; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; transform: rotate(-45deg);">Rhombus</span>
    </div>
    </div>
    `;
}

export function ShapeTriangle(label:string,border:string='#ffffff',background:string='#000000') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${background}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 60px;height: 30px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0, 100% 100%, 0 100%); display: flex; justify-content: center; align-items: center; overflow: hidden;">
    <div style="width: 60px;height: 30px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0, 100% 100%, 0 100%); display: flex; justify-content: center; align-items: center; overflow: hidden; margin-top: 2px; margin-bottom: 1.5px; margin-left: 3px; margin-right: 3px;">
        <span style="text-align: center; color: ${border}; font-size:9px; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; top: 8px;position: relative;">Triangle</span>
    </div>
    </div>
    </div>
    `;
}

export function ShapeHexagon(label:string,border:string='#ffffff',background:string='#000000') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${background}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display: flex; justify-content: center; align-items: center; overflow: hidden;">
  <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display: flex; justify-content: center; align-items: center; overflow: hidden; margin: 2px;">
    <span style="font-size:9px; color: ${border}; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
      Hexagon
    </span>
  </div>
  </div>
  </div>
    `;
}

export function ShapePentagon(label:string,border:string='#ffffff',background:string='#000000') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${background}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); display: flex; justify-content: center; align-items: center; overflow: hidden;">
  <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); display: flex; justify-content: center; align-items: center; overflow: hidden; margin: 2px;">
    <span style="font-size:9px; color: ${border}; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
      Pentagon
    </span>
  </div>
  </div>
  </div>
    `;
}

export function ShapeOctagon(label:string,border:string='#ffffff',background:string='#000000') {
    return `
    <div style="display: flex; align-items: center; margin: 5px;">
    <div style="margin-right: 5px;">
        <span style="font-size: 10px; color: ${background}; font-family: Arial; white-space: nowrap;">${label}:</span>
    </div>
    <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); display: flex; justify-content: center; align-items: center; overflow: hidden;">
  <div style="width: 60px;height: 25px; overflow: hidden; background-color: ${background}; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); display: flex; justify-content: center; align-items: center; overflow: hidden; margin: 2px;">
    <span style="font-size:9px; color: ${border}; font-family: Arial; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
      Octagon
    </span>
  </div>
  </div>
  </div>
    `;
}