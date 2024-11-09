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

  const body = Object.fromEntries(inputs.map((i) => [i.name, i.value]));
  const args = Object.values(body);

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
  const pixels = await pixel.getAllPixels();
  const listItems = pixels.map(createPixelListItem);

  document.querySelector("#pixel-list").replaceChildren(...listItems);
};

document
  .querySelector("button#refresh-list")
  .addEventListener("click", listAllPixels);

listAllPixels();
