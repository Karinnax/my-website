// Функція пошуку рецептів
function searchRecipes() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const ul = document.getElementById('recipeList');

  if (ul) {
    const li = ul.getElementsByTagName('li');
    let found = false;

    for (let i = 0; i < li.length; i++) {
      const a = li[i].getElementsByTagName('a')[0];
      const txtValue = a.textContent || a.innerText;

      if (txtValue.toLowerCase().includes(filter) && filter !== "") {
        li[i].style.display = "";
        found = true;
      } else {
        li[i].style.display = "none";
      }
    }

    if (filter === "") {
      for (let i = 0; i < li.length; i++) {
        li[i].style.display = "";
      }
    }

    // Замість заміни innerHTML показуємо повідомлення у додатковому елементі
    const noResults = document.getElementById('noResults');
    if (!found && filter !== "") {
      if (!noResults) {
        const message = document.createElement('li');
        message.id = 'noResults';
        message.textContent = "Рецепт не знайдено 😞";
        message.style.fontStyle = 'italic';
        ul.appendChild(message);
      }
    } else {
      if (noResults) {
        noResults.remove();
      }
    }
  } else {
    // Якщо на сторінці немає списку рецептів — перенаправляємо з параметром пошуку
    window.location.href = `catalog.html?search=${encodeURIComponent(filter)}`;
  }
}

// Оновлення меню навігації залежно від статусу користувача
function updateNav() {
  const nav = document.getElementById("navMenu");
  const user = localStorage.getItem("user");
  const currentPage = window.location.pathname.split("/").pop() || 'index.html';

  // Створюємо посилання з класом active замість інлайн-стилів
  function navLink(href, text) {
    const isActive = href === currentPage;
    return `<a href="${href}" class="${isActive ? 'active' : ''}">${text}</a>`;
  }

  if (user) {
    nav.innerHTML = `
      ${navLink('index.html', 'Головна')}
      ${navLink('catalog.html', 'Каталог рецептів')}
      ${navLink('add.html', 'Додати рецепт')}
      <a href="profile.html" class="active-profile">Профіль (${user})</a>
      <a href="#" id="logoutLink" class="active-profile" style="cursor:pointer;">Вихід</a>
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="Пошук рецептів...">
        <button onclick="searchRecipes()">Шукати</button>
      </div>
    `;

    document.getElementById("logoutLink").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      updateNav();
      window.location.href = "index.html";
    });
  } else {
    nav.innerHTML = `
      ${navLink('index.html', 'Головна')}
      ${navLink('catalog.html', 'Каталог рецептів')}
      ${navLink('add.html', 'Додати рецепт')}
      ${navLink('login.html', 'Вхід')}
      ${navLink('register.html', 'Реєстрація')}
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="Пошук рецептів...">
        <button onclick="searchRecipes()">Шукати</button>
      </div>
    `;
  }
}

// Обробка реєстрації
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (name && email && pass) {
    localStorage.setItem("user", name);
    alert("Реєстрація успішна!");
    window.location.href = "index.html";
  } else {
    alert("Заповніть усі поля");
  }
}

// Обробка входу
function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById("loginName").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (name && pass) {
    localStorage.setItem("user", name);
    alert("Вхід успішний!");
    window.location.href = "index.html";
  } else {
    alert("Заповніть усі поля");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNav();

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
