/**
SPDX-FileCopyrightText: syuilo and other misskey contributors, web component port by easrng
SPDX-License-Identifier: AGPL-3.0-only
*/
const svgNS = "http://www.w3.org/2000/svg";
class Sparkle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }
  connectedCallback() {
    const span = Object.assign(document.createElement("span"), {
      style: "display:inline-block",
    });
    span.append(document.createElement("slot"));
    this.shadowRoot.append(
      Object.assign(document.createElement("style"), {
        textContent: ":host{position:relative;display:inline-block;}",
      }),
      span,
    );
    const colors = ["#FF1493", "#00FFFF", "#FFE202", "#FFE202", "#FFE202"];
    let stop = false;
    let ro;
    let width = 0;
    let height = 0;
    ro = new ResizeObserver((entries, observer) => {
      width = this.offsetWidth + 64;
      height = this.offsetHeight + 64;
    });
    ro.observe(this);
    const add = () => {
      if (stop) return;
      const x = Math.random() * (width - 64);
      const y = Math.random() * (height - 64);
      const sizeFactor = Math.random();
      const particle = {
        id: Math.random().toString(),
        x,
        y,
        size: 0.2 + (sizeFactor / 10) * 3,
        dur: 1000 + sizeFactor * 1000,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      svg.setAttribute(
        "style",
        "position:absolute;top:-32px;left:-32px;pointer-events:none",
      );
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute(
        "style",
        "transform-origin:center;transform-box:fill-box",
      );
      path.setAttribute(
        "transform",
        "translate(" + particle.x + " " + particle.y + ")",
      );
      path.setAttribute("fill", particle.color);
      path.setAttribute(
        "d",
        "M29.427,2.011C29.721,0.83 30.782,0 32,0C33.218,0 34.279,0.83 34.573,2.011L39.455,21.646C39.629,22.347 39.991,22.987 40.502,23.498C41.013,24.009 41.653,24.371 42.354,24.545L61.989,29.427C63.17,29.721 64,30.782 64,32C64,33.218 63.17,34.279 61.989,34.573L42.354,39.455C41.653,39.629 41.013,39.991 40.502,40.502C39.991,41.013 39.629,41.653 39.455,42.354L34.573,61.989C34.279,63.17 33.218,64 32,64C30.782,64 29.721,63.17 29.427,61.989L24.545,42.354C24.371,41.653 24.009,41.013 23.498,40.502C22.987,39.991 22.347,39.629 21.646,39.455L2.011,34.573C0.83,34.279 0,33.218 0,32C0,30.782 0.83,29.721 2.011,29.427L21.646,24.545C22.347,24.371 22.987,24.009 23.498,23.498C24.009,22.987 24.371,22.347 24.545,21.646L29.427,2.011Z",
      );
      const animateTransform1 = document.createElementNS(
        svgNS,
        "animateTransform",
      );
      animateTransform1.setAttribute("attributeName", "transform");
      animateTransform1.setAttribute("attributeType", "XML");
      animateTransform1.setAttribute("type", "rotate");
      animateTransform1.setAttribute("from", "0 0 0");
      animateTransform1.setAttribute("to", "360 0 0");
      animateTransform1.setAttribute("dur", particle.dur + "ms");
      animateTransform1.setAttribute("repeatCount", "1");
      animateTransform1.setAttribute("additive", "sum");
      animateTransform1.addEventListener("endEvent", () => svg.remove());
      const animateTransform2 = document.createElementNS(
        svgNS,
        "animateTransform",
      );
      animateTransform2.setAttribute("attributeName", "transform");
      animateTransform2.setAttribute("attributeType", "XML");
      animateTransform2.setAttribute("type", "scale");
      animateTransform2.setAttribute("values", "0;" + particle.size + ";0");
      animateTransform2.setAttribute("dur", particle.dur + "ms");
      animateTransform2.setAttribute("repeatCount", "2");
      animateTransform2.setAttribute("additive", "sum");
      path.append(animateTransform1, animateTransform2);
      svg.append(path);
      this.shadowRoot.append(svg);
      window.setTimeout(
        () => {
          add();
        },
        500 + Math.random() * 500,
      );
    };
    add();
    this.disconnectedCallback = () => {
      if (ro) ro.disconnect();
      stop = true;
      this.shadowRoot.textContent = "";
    };
  }
}
customElements.define("easrng-sparkle", Sparkle);
