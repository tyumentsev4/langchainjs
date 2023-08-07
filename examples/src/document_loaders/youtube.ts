import { YoutubeLoader } from "langchain/document_loaders/web/youtube";

const loader = new YoutubeLoader({
  urlOrId: "https://youtu.be/bZQun8Y4L2A",
  language: "en",
});

const docs = await loader.load();

console.log(docs);
