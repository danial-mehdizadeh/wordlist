document.querySelector("#email-submit").addEventListener("click", () => {
  let [emailValue, subject, message] = [
    document.querySelector("#email").value,
    document.querySelector("#subject").value,
    document.querySelector("#message").value,
  ];
  [
    document.querySelector("#email").value,
    document.querySelector("#subject").value,
    document.querySelector("#message").value,
  ] = ["", "", ""];
  window.open(`mailto:${emailValue}?subject=${subject}&body=${message}`);
});
