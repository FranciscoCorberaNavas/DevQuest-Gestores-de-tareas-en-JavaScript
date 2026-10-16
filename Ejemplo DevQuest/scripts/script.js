document.addEventListener("DOMContentLoaded", () => {
  // Ocultar y eliminar el spinner de carga después de 3 segundos
  const spinner = document.getElementById("spinner");
  setTimeout(() => {
    spinner.classList.add("fade-out");
    setTimeout(() => {
      spinner.remove();
    }, 500);
  }, 3000);

  // Animación de aparición de secciones usando IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
  });

  // Actualización de la barra de progreso en el formulario
  const form = document.getElementById("registerForm");
  const inputs = form.querySelectorAll(".form__input");
  const progressBar = document.getElementById("progressBar");

  function updateProgress() {
    let filled = 0;
    inputs.forEach((input) => {
      if (input.value.trim() !== "") filled++;
    });
    progressBar.style.width = `${(filled / inputs.length) * 100}%`;
  }
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      updateProgress();
      const errorSpan = input.nextElementSibling;
      if (input.value.trim() === "") {
        errorSpan.style.display = "block";
      } else {
        errorSpan.style.display = "none";
      }
      if (input.id === "confirmPassword") {
        const password = document.getElementById("password").value;
        if (input.value !== password) {
          errorSpan.style.display = "block";
          errorSpan.textContent = "Las contraseñas deben coincidir.";
        } else {
          errorSpan.style.display = "none";
          errorSpan.textContent = "Las contraseñas deben coincidir.";
        }
      }
    });
  });

  // Modal de confirmación en el formulario
  const confirmModal = document.getElementById("confirmModal");
  const modalConfirm = document.getElementById("modalConfirm");
  const modalCancel = document.getElementById("modalCancel");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    inputs.forEach((input) => {
      const errorSpan = input.nextElementSibling;
      if (input.value.trim() === "") {
        errorSpan.style.display = "block";
        valid = false;
      }
    });
    if (valid) {
      // Mostrar modal de confirmación
      confirmModal.style.display = "flex";
    }
  });

  modalConfirm.addEventListener("click", () => {
    alert("Registro completado con éxito.");
    form.reset();
    updateProgress();
    confirmModal.style.display = "none";
  });

  modalCancel.addEventListener("click", () => {
    confirmModal.style.display = "none";
  });

  // Funcionalidad para tarjetas de Técnicas: alternar visibilidad del texto al hacer clic
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const text = card.querySelector(".card__text");
      text.classList.toggle("visible");
    });
  });

  // Filtros para la sección de Técnicas
  const filterButtons = document.querySelectorAll(".filter__btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      cards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});