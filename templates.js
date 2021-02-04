import { bytesToSize } from "./utils";

export function buttonTemplate(type = "") {
  return `
        <span class="btn-text">${type === "Open" ? "Open" : "Upload"}</span>
        <span class="material-icons btn-icon">
            ${type === "Open" ? "explore" : "cloud_upload"}
        </span>
    `;
}

export function previewImageTemplate(src, name, size) {
  return `
        <div class="preview-image" id="pr-img">
            <div class="preview-remove" data-name="${name}">&times;</div>
            <img src="${src}" alt="${name}" />
            <div class="preview-info">
                <span>${name}</span>
                ${bytesToSize(size)}
            </div>
        </div>
    `;
}

export function loader() {
  return `
    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
}

export function startText() {
  return `
        <div class="start-text">
            <h1>Click the Open button to upload the photo. You can upload one or more photos</h1>
        </div>
    `;
}

export function previewProgressTemplate() {
  return `
        <div class="preview-info-progress"></div>
    `;
}
