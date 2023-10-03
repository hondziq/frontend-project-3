const userCardsElement = document.getElementById("userCards");
const searchInput = document.getElementById("searchInput");

let usersData = [];

// Fetch user data from API:
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    usersData = users;
    displayUserCards(users);
  })
  .catch((error) => console.error("Oops, an error occured:", error));

// Function to create user cards:
function displayUserCards(users) {
  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.id = `userCard${user.id}`; // Gives a unique ID to each user card
    userCard.innerHTML = `
                <h2>${user.name}</h2>
                <img src="https://robohash.org/${user.name}" alt="user avatar">
                <p><b>Company:</b> ${user.company.name}</p>               
                <p><b>Job:</b> ${user.company.catchPhrase}</p>
                <p><b>Phone:</b> ${user.phone}</p>
                <p><b>E-mail:</b> <a href="mailto:${user.email}">${user.email}</a></p>
                <p><b>Web:</b> <a href="${user.website}">${user.website}</a></p>
            `;
    userCardsElement.appendChild(userCard);
  });
}

// Event listener for dynamic filtering based on user input:
searchInput.addEventListener("input", (event) => {
  const searchString = event.target.value.toLowerCase();
  usersData.forEach((user) => {
    const filterCard = document.getElementById(`userCard${user.id}`);
    const shouldDisplay = user.name.toLowerCase().includes(searchString);
    filterCard.style.display = shouldDisplay ? "block" : "none";
  });
});
