import { ParagraphAPI } from "./src"

const api = new ParagraphAPI()

const ok = api.getPost({postSlug: "coins", publicationSlug: "blog"}, {
  "includeContent": true,
  
}).then(post => {
    console.log(post)
})

console.log(ok)
