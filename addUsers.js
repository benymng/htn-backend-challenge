const axios = require("axios");
const fs = require("fs").promises;

const API_ENDPOINT = "http://localhost:3003/new-user";

async function loadUsersFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading user data file:", error);
    process.exit(1);
  }
}

async function addUser(user) {
  try {
    const response = await axios.post(API_ENDPOINT, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Added user ${user.name} successfully:`, response.data);
  } catch (error) {
    console.error(
      `Error adding user ${user.name}:`,
      error.response ? error.response.data : error.message
    );
  }
}

async function main() {
  const filePath = "./data.json";
  const users = await loadUsersFromFile(filePath);

  for (const user of users) {
    await addUser(user);
  }
}

main();