import { ParagraphAPI } from "../src"

const api = new ParagraphAPI()

api.getPost({postSlug: "coins", publicationSlug: "blog"}, {
  "includeContent": true
}).then(post => {
    console.log(post)
})
