import {
  buttonTemplate,
  previewImageTemplate,
  previewProgressTemplate,
  loader,
  startText,
} from "./templates";
import { createElement, noop } from "./utils";

export function upload(selector, options = {}) {
  let files = [];
  const onUpload = options.onUpload ?? noop;
  const input = document.querySelector(selector);
  const card = document.querySelector(".card");
  const preview = createElement("div", ["preview", "hide"]);
  const loading = createElement("div", ["loader"], loader());
  const start = createElement("div", ["start-text"], startText());
  const open = createElement(
    "button",
    ["btn", "accent"],
    buttonTemplate("Open")
  );
  const upload = createElement(
    "button",
    ["btn", "primary", "hide"],
    buttonTemplate("Upload")
  );

  if (options.multi) {
    input.setAttribute("multiple", true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute("accept", options.accept.join(","));
  }

  input.insertAdjacentElement("afterend", preview);
  input.insertAdjacentElement("afterend", upload);
  preview.insertAdjacentElement("afterend", start);
  input.insertAdjacentElement("afterend", open);

  const triggerInput = () => input.click();

  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }

    files = Array.from(event.target.files);

    card.classList.remove("center");
    upload.classList.remove("hide");
    preview.innerHTML = "";
    preview.classList.add("hide");
    start.remove();
    preview.insertAdjacentElement("afterend", loading);

    files.forEach((file) => {
      if (!file.type.match("image")) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (ev) => {
        const src = ev.target.result;
        loading.remove();
        preview.classList.remove("hide");
        preview.insertAdjacentHTML(
          "afterbegin",
          previewImageTemplate(src, file.name, file.size)
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const removeHandler = (event) => {
    if (!event.target.dataset.name) {
      return;
    }

    const { name } = event.target.dataset;
    files = files.filter((file) => file.name !== name);

    if (!files.length) {
      preview.insertAdjacentElement("afterend", start);
      upload.classList.add("hide");
      preview.classList.add("hide");
      card.classList.add("center");
    }

    const block = preview
      .querySelector(`[data-name="${name}"]`)
      .closest("#pr-img");

    block.classList.add("removing");
    setTimeout(() => block.remove(), 300);
  };

  const clearPreview = (el) => {
    el.style.bottom = "4px";
    el.innerHTML = previewProgressTemplate();
  };

  const uploadHandler = (event) => {
    preview.querySelectorAll(".preview-remove").forEach((e) => e.remove());
    const previewInfo = preview.querySelectorAll(".preview-info");
    previewInfo.forEach(clearPreview);
    onUpload(files, previewInfo);
  };

  open.addEventListener("click", triggerInput);
  input.addEventListener("change", changeHandler);
  preview.addEventListener("click", removeHandler);
  upload.addEventListener("click", uploadHandler);
}
