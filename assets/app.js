let sections = document.querySelectorAll('.section-header');
function handleClick(event) {
  const isActive = event.currentTarget.parentNode.classList.contains("active");
  if (!isActive) {
    event.currentTarget.parentNode.classList.add("active");
  } else {
    event.currentTarget.parentNode.classList.remove("active");
  }
}
sections.forEach(function(section) {
  section.addEventListener("click", handleClick);
});
