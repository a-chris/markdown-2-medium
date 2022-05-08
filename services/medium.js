import axios from "axios";

export async function getMe(key) {
  const response = await fetch("api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
  });

  if (response.status !== 200) {
    throw new Error("Invalid API Key");
  }

  return response.json();
}

export async function publishArticle(apiKey, userId, article) {
  const response = await axios.post("api/publish", { apiKey, userId, article });

  if (response.status !== 200) {
    throw new Error("Something went wrong");
  }

  return response.data;
}
