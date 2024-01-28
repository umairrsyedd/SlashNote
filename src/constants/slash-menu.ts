  import textImage from "../assets/text-selection.png";
  import headingImage from "../assets/heading1-selection.png";
  import heading2Image from "../assets/heading2-selection.png";
  import heading3Image from "../assets/heading3-selection.png";
  import todoImage from "../assets/todo-selection.png";
  import codeImage from "../assets/code-selection.png";
import { ContentType } from "./content-type";


  type SlashMenu = {
    image: string,
    type: ContentType,
    description: String
    keywords: String[]
  }

  export const slashMenuData: SlashMenu[]  = [
    {
      image: textImage,
      type: ContentType.Text,
      description: "Just start writing with plain text.",
      keywords: ["text"]
    },
    {
      image: headingImage,
      type: ContentType.Heading1,
      description: "Big section heading.",
      keywords: ["h1", "1", "Heading1"]
    },
    {
      image: heading2Image,
      type: ContentType.Heading2,
      description: "Medium Section heading.",
      keywords: ["h2", "2" , "Heading2"]
    },
    {
      image: heading3Image,
      type: ContentType.Heading3,
      description: "Small Section heading.",
      keywords: ["h3", "3" , "Heading3"]
    },
    {
      image: todoImage,
      type: ContentType.TodoList,
      description: "Track tasks with a to-do list.",
      keywords: ["todo"]
    },
    {
      image: codeImage,
      type: ContentType.Code,
      description: "Capture a code snippet.",
      keywords: ["code"]
    },
  ];