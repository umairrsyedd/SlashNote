import type { ContentType } from "../constants/block.svelte";

export type SampleData = {
  data: Array<{
    type: ContentType,
    content: string,
  }>,
};

export const sampleData: SampleData = {
  data: [
    {
      type: "Title",
      content: "",
    },
    // {
    //   type: "Text",
    //   content:
    //     "Welcome to the Awesome Adventures Blog! Join us on a journey through thrilling stories, exciting discoveries, and unforgettable moments.",
    // },
    // {
    //   type: "Heading1",
    //   content: "Travel Escapades",
    // },
    // {
    //   type: "Heading2",
    //   content: "Exploring Exotic Islands",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Embark on a virtual tour with us as we explore the breathtaking beauty of undiscovered islands. Crystal-clear waters and lush landscapes await!",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Our team ventured into the heart of the islands, uncovering hidden gems and sharing travel tips for fellow adventurers.",
    // },
    // {
    //   type: "Heading2",
    //   content: "City Lights and Urban Delights",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Dive into the vibrant energy of bustling cities around the world. From iconic landmarks to hidden local gems, we've got the inside scoop.",
    // },
    // {
    //   type: "Heading1",
    //   content: "Foodie Chronicles",
    // },
    // {
    //   type: "Heading2",
    //   content: "Global Gastronomy",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Indulge your taste buds as we traverse the globe in search of the most delectable dishes. From street food to fine dining, our culinary adventures never cease.",
    // },
    // {
    //   type: "Heading2",
    //   content: "Cooking Experiments",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Join us in the kitchen as we share our culinary experiments. From savory to sweet, we explore new recipes and cooking techniques for food enthusiasts.",
    // },
    // {
    //   type: "Heading3",
    //   content: "Spicy Delights",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "In this section, we delve into the world of spicy cuisine. From hot sauces to fiery recipes, brace yourself for a taste bud tingling experience.",
    // },
    // {
    //   type: "Heading3",
    //   content: "Sweet Sensations",
    // },
    // {
    //   type: "Text",
    //   content:
    //     "Discover the art of dessert-making in Sweet Sensations. Indulge in mouthwatering treats and learn the secrets behind crafting the perfect sweets.",
    // },
  ],
};

