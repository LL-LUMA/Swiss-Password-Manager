let userId = null;

document.addEventListener("DOMContentLoaded", async () => {
  const storage = await chrome.storage.local.get(["userId"]);
  if (storage.userId) {
    userId = storage.userId;
    document.getElementById("auth").style.display = "none";
    document.getElementById("manager").style.display = "block";
    loadPasswords();
  }
});

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost/swiss/api/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.status === "ok") {
    chrome.storage.local.set({ userId: data.user_id });
    location.reload();
  } else {
    alert("Login failed.");
  }
}

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost/swiss/api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.status === "ok" ? "Registered!" : "Error registering.");
}

async function savePassword() {
  const site = document.getElementById("site").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("pwd").value;

  const res = await fetch("http://localhost/swiss/api/save_password.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, site, username, password })
  });

  const data = await res.json();
  if (data.status === "ok") {
    loadPasswords();
  }
}

async function loadPasswords() {
  const res = await fetch(`http://localhost/swiss/api/get_passwords.php?user_id=${userId}`);
  const data = await res.json();
  const container = document.getElementById("savedPasswords");
  container.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.site}: ${p.username} / ${p.password} `;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "5px";
    btn.onclick = async () => {
      await fetch("http://localhost/swiss/api/delete_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password_id: p.id, user_id: userId })
      });
      loadPasswords();
    };

    div.appendChild(btn);
    container.appendChild(div);
  });
}

function logout() {
  chrome.storage.local.clear(() => location.reload());
}
