import "../../css/app.css"
import './navigation-top';

document.querySelectorAll('.section-header').forEach((header) => {
    header.addEventListener('click', function () {
        this.parentNode.classList.toggle('active');
    });
});

// LiveReload server
if (ENV === 'development') {
  const script = document.createElement('script');
  script.src = `http://${
  (location.host || 'localhost').split(':')[0]
  }:35729/livereload.js?snipver=1`;
  document.head.append(script);
  console.log('Reload script added');
}
