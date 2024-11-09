import { AuthService } from "./api/AuthService.js";
import { PixelService } from "./api/PixelService.js";

const safely = (value) => {
  if (!value) throw new Error("No value.");
  return value;
};

const form = (formName) =>
  safely(document.querySelector(`form#${formName}-form`));

const auth = new AuthService();
const pixel = new PixelService();

console.log("user@user.com");

const handlers = [
  auth.register.bind(auth),
  auth.login.bind(auth),
  auth.logout.bind(auth),
  auth.getCurrentUser.bind(auth),
  auth.changeUsersName.bind(auth),
  auth.changeUsersEmail.bind(auth),
  pixel.createPixel.bind(pixel),
  pixel.getAllPixels.bind(pixel),
  pixel.deletePixel.bind(pixel),
];

const Forms = Object.fromEntries(
  [
    "register",
    "login",
    "logout",
    "current-user",
    "change-name",
    "change-email",
    "pixel-create",
    "pixel-all",
    "pixel-delete",
  ].map((name, i) => [name, { form: form(name), handler: handlers[i] }])
);

const submitForm = (handler) => async (event) => {
  event.preventDefault();

  const inputs = [...event.target.elements].filter(
    (e) => e instanceof HTMLInputElement
  );

  // const body = Object.fromEntries(inputs.map((i) => [i.name, i.value]));
  // const args = Object.values(body);

  const args = inputs.map((i) => i.value);

  event.target.reset();

  const data = await handler(...args);
  console.log(data);
};

for (const name in Forms) {
  const { form, handler } = Forms[name];

  form.addEventListener("submit", submitForm(handler));
}

const createPixelListItem = ({ id, name, visits, created_at }) => {
  const li = document.createElement("li");
  li.id = id;

  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify({ name, visits, id, created_at }, null, 2);

  li.append(pre);

  return li;
};

const listAllPixels = async () => {
  const pixels = (await pixel.getAllPixels()) ?? [];
  const listItems = pixels.map(createPixelListItem);

  document.querySelector("#pixel-list").replaceChildren(...listItems);
};

document
  .querySelector("button#refresh-list")
  .addEventListener("click", listAllPixels);

listAllPixels();

const copyTextToClipboard = async (text) => {
  if (!navigator.clipboard) return;
  return navigator.clipboard.writeText(text);
};

const createCopyExample = (sourceElement, textToCopy = null) => {
  sourceElement.parentElement
    .querySelector("button#copy-btn")
    .addEventListener("click", () =>
      copyTextToClipboard(textToCopy ?? sourceElement.textContent)
    );
};

const createPixelLink = (pixelId = "EXAMPLE-PIXEL-ID-REPLACE-WITH-YOURS") =>
  `${window.location.origin}/p.png?id=${pixelId}`;
const createPixelTag = (pixelId) =>
  `<img src="${createPixelLink(
    pixelId
  )}" alt="" width="1" height="1" style="display: none" />`;

const examplePixelId = "EXAMPLE-PIXEL-ID-REPLACE-WITH-YOURS";
const examplePixelUrl = createPixelLink(examplePixelId);
const examplePixelTag = createPixelTag(examplePixelId);

const linkExample = document.querySelector(
  "section#how-to #example-link pre#link"
);
linkExample.textContent = examplePixelUrl;
createCopyExample(linkExample);

const tagExample = document.querySelector(
  "section#how-to #example-tag pre#example"
);
tagExample.textContent = examplePixelTag;
createCopyExample(tagExample);

const exampleGenerator = document.querySelector("#example-generator");
const generatedExampleSourceElement = exampleGenerator.querySelector("pre");
exampleGenerator.querySelector("input").addEventListener("input", (event) => {
  const pixelId = event.target.value;
  if (pixelId.length !== 32) return;
  generatedExampleSourceElement.textContent = createPixelTag(
    pixelId || examplePixelId
  );
});
createCopyExample(generatedExampleSourceElement);
