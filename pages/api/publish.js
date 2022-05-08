import axios from "axios";

export default async function handler(req, res) {
  const { apiKey, userId, article } = req.body;
  const { title, content, tags, publishStatus } = article;

  const response = await axios.post(
    `https://api.medium.com/v1/users/${userId}/posts`,
    {
      title,
      content,
      tags,
      publishStatus,
      contentFormat: "markdown",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (response.status === 401) {
    return res.status(401).json({ error: "Invalid API Key" });
  } else if (response.status === 201) {
    return res.status(200).json(response.data);
  } else {
    return res.status(response.status).json({ error: "Something went wrong" });
  }
}
