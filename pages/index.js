import { useState } from "react";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import { getMe, publishArticle } from "../services/medium";

const MAX_TAGS = 5;
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "public", label: "Public" },
  { value: "unlisted", label: "Unlisted" },
];

export default function Home() {
  const [key, setKey] = useState("");
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState({ value: "draft", label: "Draft" });
  const [article, setArticle] = useState({ tags: [] });

  const handleChangeArticle = (event) => {
    if (event.target == null) return;

    const { name, value } = event.target;
    setArticle((obj) => ({ ...obj, [name]: value }));
  };

  const handleChangeTags = (tags) => {
    setArticle((obj) => ({ ...obj, tags }));
  };

  const handleChangeKey = (event) => {
    const { value } = event.target;
    setKey(value);
  };

  const handleCheckApiKey = () => {
    getMe(key)
      .then((data) => {
        setUserData(data);
        toast.success("Medium API Key is valid");
        return true;
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handlePublish = () => {
    if (userData?.id == null) {
      return alert("Please check your API key");
    }

    const { id: userId } = userData;
    const { title, content, tags } = article;
    const { value } = status;
    const data = { title, content, tags, publishStatus: value };

    publishArticle(key, userId, data)
      .then(() => {
        toast.success("Article published successfully");
        return true;
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  let keyInputState = "";
  if (key.length === 0) {
    keyInputState = "";
  } else if (key.length > 0 && Object.keys(userData).length === 0) {
    keyInputState = "is-loading";
  } else {
    keyInputState = "is-right";
  }

  return (
    <main className="h-100vh">
      <div className="box is-flex is-justify-content-center is-transparent no-shadow pt-6 m-0">
        <h1 className="title is-1">Markdown2Medium</h1>
        <title>Markdown to Medium</title>
      </div>
      <div className="container is-fluid py-6">
        <div className="box">
          <div className="block is-flex is-narrow">
            <input
              className={`input ${keyInputState}`}
              type="text"
              name="title"
              placeholder="API key from Medium.."
              onChange={handleChangeKey}
            />
            <button className="button is-info ml-5" onClick={handleCheckApiKey}>
              validate
            </button>
          </div>
        </div>

        <div className="box is-flex">
          <Select
            className="mr-5 react-select-container"
            options={STATUS_OPTIONS}
            onChange={setStatus}
            value={status}
          />
          <div className="w-100">
            <TagsInput
              value={article.tags}
              onChange={handleChangeTags}
              name="tags"
              placeHolder="max 5 tags.."
            />
            {article.tags.length > MAX_TAGS && (
              <span className="tag is-danger is-light">
                Only the first 5 tags will be used.
              </span>
            )}
          </div>
        </div>

        <div className="box">
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Title of your post.."
            onChange={handleChangeArticle}
          />
        </div>

        <div className="box">
          <textarea
            className="textarea"
            name="content"
            rows={20}
            placeholder="Write your markdown content here.."
            onChange={handleChangeArticle}
          />
        </div>

        <div className="block is-flex is-justify-content-center">
          <button
            className="button is-medium is-primary is-light"
            onClick={handlePublish}
          >
            PUBLISH
          </button>
        </div>
      </div>
    </main>
  );
}
