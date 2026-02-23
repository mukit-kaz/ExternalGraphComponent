import { Shape } from "../types/constant";
import type { ShapeColor, ShapeStyle, TableBodyColor } from "../types/type";

export function TableViewUi(table?: TableBodyColor) {
    const t = table ?? {
        titleColor: "#333",
        titleBgColor: "#f8f9fa",
        tableBgColor: "#fff",
        tableColTextColor: "#666",
        tableTextColor: "#333",
        tableBorderColor: "#dee2e6"
    };
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', fontFamily: 'Arial, Helvetica, sans-serif', borderWidth: '2px', borderStyle: 'solid', borderColor: '${t.tableBorderColor}', borderTopWidth: '5px', borderTopStyle: 'solid', borderTopColor: tag?.value?.tableBorderColor, borderRadius: '4px' }}>
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', height: '32px' }}>
        <h5 style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: '${t.titleColor}', padding: '3px', marginBottom: '0', backgroundColor: '${t.titleBgColor}', borderBottom: '1px solid #dee2e6', fontSize: '16px', marginTop: '0' }}>{tag.name}</h5>
    </div>
    <div style={{ position: 'absolute', top: '27px', left: '0', bottom: '0', right: '0', padding: '3px', backgroundColor: '${t.tableBgColor}' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed', fontSize: '13px' }}>
            <tbody>
                <tr>
                    <td style={{ color: '${t.tableColTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>Entity Code</td>
                    <td style={{ color: '${t.tableTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>{tag.entityCode}</td>
                </tr>
                <tr>
                    <td style={{ color: '${t.tableColTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>Business Type</td>
                    <td style={{ color: '${t.tableTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>{tag.businessType}</td>
                </tr>
                <tr>
                    <td style={{ color: '${t.tableColTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>Inc. Jurisdiction</td>
                    <td style={{ color: '${t.tableTextColor}', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: '3px', textAlign: 'left' }}>{tag.incorporationJurisdiction}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

    `;
}

export function ShapeRectangle(style:ShapeStyle) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0',overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: tag?.value?.shapeBorderColor, borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeCircle(style:ShapeStyle) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: tag?.value?.shapeBorderColor, borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeRhombus(style:ShapeStyle) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: tag?.value?.shapeBorderColor, transform: 'rotate(45deg)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', inset:'15%'}}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', transform: 'rotate(-45deg)' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeTriangle() {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBorderColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginTop: '2px',marginBottom: '1.5px',marginLeft: '3px',marginRight: '3px', }}>
        <span style={{ textAlign:'center' ,paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width:'40%' }}>
        {tag.name}
        </span>
      </div>
    </div>
    `;
}

export function ShapeHexagon() {
    return `
    <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBorderColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
  <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
  <span
    style={{ paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
    {tag.name}
  </span>
</div>
</div>
    `;
}

export function ShapePentagon() {
    return `
    <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBorderColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
  <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
  <span
    style={{ paddingLeft: '8px', paddingRight: '8px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
    {tag.name}
  </span>
</div>
</div>
    `;
}

export function ShapeOctagon() {
    return `
    <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBorderColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
  <div
  style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: tag?.value?.shapeBgColor, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
  <span
    style={{ paddingLeft: '5px', paddingRight: '5px', color: tag?.value?.shapeTextColor, fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
    {tag.name}
  </span>
</div>
</div>
    `;
}

export function ShapeRectangleFilterd(style:ShapeStyle,color: ShapeColor) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0',overflow: 'hidden', backgroundColor:'${color?.shapeBgColor}', borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: '${color?.shapeBorderColor}', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeCircleFilterd(style:ShapeStyle,color: ShapeColor) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: '${color?.shapeBorderColor}', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeRhombusFilterd(style:ShapeStyle,color: ShapeColor) {
    return `
    <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', borderWidth: '2px', borderStyle: '${style.borderStyle}', borderColor: '${color?.shapeBorderColor}', transform: 'rotate(45deg)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', inset:'15%'}}>
      <span style={{paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', transform: 'rotate(-45deg)' }}>{tag.name}</span>
    </div>
    `;
}

export function ShapeTriangleFilterd(color: ShapeColor) {
  return `
  <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBorderColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginTop: '2px',marginBottom: '1.5px',marginLeft: '3px',marginRight: '3px', }}>
      <span style={{ textAlign:'center' ,paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width:'40%' }}>
      {tag.name}
      </span>
    </div>
  </div>
  `;
}

export function ShapeHexagonFilterd(color: ShapeColor) {
  return `
  <div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBorderColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
<div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
<span
  style={{ paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
  {tag.name}
</span>
</div>
</div>
  `;
}

export function ShapePentagonFilterd(color: ShapeColor) {
  return `
  <div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBorderColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
<div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
<span
  style={{ paddingLeft: '8px', paddingRight: '8px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
  {tag.name}
</span>
</div>
</div>
  `;
}

export function ShapeOctagonFilterd(color: ShapeColor) {
  return `
  <div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBorderColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
<div
style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', overflow: 'hidden', backgroundColor: '${color?.shapeBgColor}', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin:'2px' }}>
<span
  style={{ paddingLeft: '5px', paddingRight: '5px', color: '${color?.shapeTextColor}', fontFamily: 'Arial', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
  {tag.name}
</span>
</div>
</div>
  `;
}

export function ShapeViewUi() {
  const solidBorder:ShapeStyle = {borderStyle:"solid"};
  const dottedBorder:ShapeStyle = {borderStyle:"dotted"};

  return `
      {tag.shape==='${Shape.Rectangle}' ? ${ShapeRectangle(solidBorder)}
      :tag.shape==='${Shape.Rectangle_Dot}' ? ${ShapeRectangle(dottedBorder)}
      :tag.shape==='${Shape.Circle}' ? ${ShapeCircle(solidBorder)}
      :tag.shape==='${Shape.Circle_Dot}' ? ${ShapeCircle(dottedBorder)}
      :tag.shape==='${Shape.Rhombus}' ? ${ShapeRhombus(solidBorder)}
      :tag.shape==='${Shape.Rhombus_Dot}' ? ${ShapeRhombus(dottedBorder)}
      :tag.shape==='${Shape.Triangle}' ? ${ShapeTriangle()}
      :tag.shape==='${Shape.Hexagon}' ? ${ShapeHexagon()}
      :tag.shape==='${Shape.Pentagon}' ? ${ShapePentagon()}
      :tag.shape==='${Shape.Octagon}' ? ${ShapeOctagon()}
      :${ShapeRectangle(solidBorder)}}
    `;
}

export function ShapeFilterdViewUi(color: ShapeColor) {
  const solidBorder:ShapeStyle = {borderStyle:"solid"};
  const dottedBorder:ShapeStyle = {borderStyle:"dotted"};

  return `
      {tag.shape==='${Shape.Rectangle}' ? ${ShapeRectangleFilterd(solidBorder,color)}
      :tag.shape==='${Shape.Rectangle_Dot}' ? ${ShapeRectangleFilterd(dottedBorder,color)}
      :tag.shape==='${Shape.Circle}' ? ${ShapeCircleFilterd(solidBorder,color)}
      :tag.shape==='${Shape.Circle_Dot}' ? ${ShapeCircleFilterd(dottedBorder,color)}
      :tag.shape==='${Shape.Rhombus}' ? ${ShapeRhombusFilterd(solidBorder,color)}
      :tag.shape==='${Shape.Rhombus_Dot}' ? ${ShapeRhombusFilterd(dottedBorder,color)}
      :tag.shape==='${Shape.Triangle}' ? ${ShapeTriangleFilterd(color)}
      :tag.shape==='${Shape.Hexagon}' ? ${ShapeHexagonFilterd(color)}
      :tag.shape==='${Shape.Pentagon}' ? ${ShapePentagonFilterd(color)}
      :tag.shape==='${Shape.Octagon}' ? ${ShapeOctagonFilterd(color)}
      :${ShapeRectangleFilterd(solidBorder,color)}}
    `;
}
