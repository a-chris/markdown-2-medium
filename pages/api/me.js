import axios from "axios";

export default async function handler(req, res) {
  const apiKey = req.headers.authorization;

  const response = await axios.get("https://api.medium.com/v1/me/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.status === 401) {
    return res.status(401).json({ error: "Invalid API Key" });
  } else if (response.status === 200) {
    return res.status(200).json(response.data.data);
  } else {
    return res.status(response.status).json({ error: "Something went wrong" });
  }
}
