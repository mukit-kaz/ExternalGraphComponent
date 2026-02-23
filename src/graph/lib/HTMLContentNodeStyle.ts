import { NodeStyleBase, SvgVisual, SvgVisualGroup } from "@yfiles/yfiles";

class HTMLContentNodeStyle extends NodeStyleBase {
  constructor() {
    super();
  }

  /** @override */
  createVisual(_context, node) {
    const container = new SvgVisualGroup();

    // Create a new SVG text element with the HTML content
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    const div = document.createElement('div');
    div.innerHTML = node.tag.div;
    foreignObject.append(div);

    // Set the position and size of the foreignObject
    foreignObject.setAttribute('x', String(node.layout.x));
    foreignObject.setAttribute('y', String(node.layout.y));
    foreignObject.setAttribute('width', String(node.layout.width));
    foreignObject.setAttribute('height', String(node.layout.height));

    // Add the foreignObject to the SVG container
    container.add(new SvgVisual(foreignObject));

    return container;
  }

  /** @override */
  updateVisual(_context, oldVisual, node) {
    // Reuse the old visual if the layout hasn't changed
    if (oldVisual instanceof SvgVisualGroup) {
      const foreignObject = oldVisual.children.first();
      if (foreignObject instanceof SvgVisual) {
        const div = foreignObject.svgElement.firstChild;
        if (div instanceof HTMLDivElement) {
          div.innerHTML = node.tag.div;
          foreignObject.svgElement.setAttribute('x', String(node.layout.x));
          foreignObject.svgElement.setAttribute('y', String(node.layout.y));
          foreignObject.svgElement.setAttribute('width', String(node.layout.width));
          foreignObject.svgElement.setAttribute('height', String(node.layout.height));
        }
      }
    }

    // Return the updated visual
    return oldVisual;
  }
}

export { HTMLContentNodeStyle };
