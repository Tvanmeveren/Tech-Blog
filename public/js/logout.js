let logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", async () => {
  console.log("you logged out bro")
  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  
})
