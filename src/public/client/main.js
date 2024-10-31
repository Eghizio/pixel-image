import { AuthService } from "./api/AuthService.js";

const safely = (value) => {
  if (!value) throw new Error("No value.");
  return value;
};

const form = (formName) =>
  safely(document.querySelector(`form#${formName}-form`));

const auth = new AuthService();

console.log("user@user.com");

const handlers = [
  auth.register,
  auth.login,
  auth.logout,
  auth.getCurrentUser,
  auth.changeUsersName,
  auth.changeUsersEmail,
].map((h) => h.bind(auth));

const Forms = Object.fromEntries(
  [
    "register",
    "login",
    "logout",
    "current-user",
    "change-name",
    "change-email",
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
