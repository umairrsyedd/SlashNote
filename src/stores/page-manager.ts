import { writable } from "svelte/store";
import { ContentType } from "../constants/content-type";
import { slashMenuData } from "../constants/slash-menu";
import type SlashMenu from "../components/slash-menu.svelte";

type ContentBlock = {
  type: ContentType,
  content: string,
}


export const contentManager = writable<ContentBlock[]>([])
export const focusedBlock = writable<number>(-1);



export function addBlockAfterIndex(index: Number, contentType? : ContentType) {

  let newContentType = contentType
  
  if (typeof(contentType) == 'undefined'){
    newContentType = ContentType.Text
  }
  const newBlock = {
    type: newContentType,
    content: "",
  };

  contentManager.update((blocks) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock); 
    return newBlocks;
  });
}




export function deleteBlock(index) {
  contentManager.update((blocks) => {
    if (index >= 0 && index < blocks.length && blocks.length > 2) {
      const newBlocks = [...blocks];
      newBlocks.splice(index, 1);
      return newBlocks;
    }
    return blocks;
  });
}

export function matchStringToBlockType(inputString: String){
    const matchedOption = slashMenuData.find(
    (option) => 
      option.keywords?.some(keyword => keyword.toUpperCase().includes(inputString.toUpperCase()))
  );

  return matchedOption.type
}


export function createBlock(index, matchedOption:ContentType) {
  let newBlockType: ContentType;
  if (matchedOption) {
    newBlockType = matchedOption;
  } else {
    newBlockType = ContentType.Text;
  }

  addBlockAfterIndex(index, newBlockType);
}


export function changeBlockType(index, matchedOption:ContentType) {
  let newBlockType: ContentType;
  if (matchedOption) {
    newBlockType = matchedOption;
  } else {
    newBlockType = ContentType.Text;
  }

  contentManager.update((blocks) => {
    if (index >= 0 && index < blocks.length) {
      const newBlocks = [...blocks];
      newBlocks[index] = {
        ...newBlocks[index],
        type: newBlockType,
      };
      return newBlocks;
    }
    return blocks;
  });
}
