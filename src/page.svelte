<script lang="ts">
  import TitleView from "./components/blocks/title.svelte";
  import TextView from "./components/blocks/text.svelte";
  import HeadingView from "./components/blocks/heading.svelte";

  import { contentManager, focusedBlock } from "./stores/page-manager";
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import { sampleData } from "./utils/sample-page";
  import { ContentType } from "./constants/content-type";
  import WordLetterCount from "./components/word-letter.svelte";

  let letters = 0;
  let words = 0;

  // Function to calculate total characters and words
  function calculateTotallettersAndWords() {
    let totalletters = 0;
    let totalWords = 0;

    $contentManager.forEach((block) => {
      totalletters += block.content.length;

      // Skip counting words for empty blocks
      if (block.content.trim() !== "") {
        totalWords += block.content.split(/\s+/).length;
      }
    });

    letters = totalletters;
    words = totalWords;
  }

  onMount(() => {
    sampleData.data.forEach((item) => {
      contentManager.update((blocks) => [
        ...blocks,
        {
          type: item.type,
          content: item.content,
        },
      ]);
    });
  });

  // Use afterUpdate to ensure the calculation is triggered after contentManager is updated
  afterUpdate(() => {
    calculateTotallettersAndWords();
  });

  onDestroy(() => {
    contentManager.set([]);
  });
</script>

<main>
  <div>
    {#each $contentManager as block, index}
      {#if block.type == ContentType.Title}
        {#if $contentManager.length === 1}
          <TitleView content={block.content} {index} isFocusedBlock={true} />
        {:else}
          <TitleView content={block.content} {index} />
        {/if}
        <!-- {TODO: Fix this and have seperate Todo-list and Code Component} -->
      {:else if block.type == ContentType.Text || block.type == ContentType.TodoList || block.type == ContentType.Code}
        {#if index == $focusedBlock}
          <TextView content={block.content} {index} isFocusedBlock={true} />
        {:else}
          <TextView content={block.content} {index} />
        {/if}
      {:else if block.type == ContentType.Heading1 || block.type == ContentType.Heading2 || block.type == ContentType.Heading3}
        {#if index == $focusedBlock}
          <HeadingView
            content={block.content}
            {index}
            isFocusedBlock={true}
            headingType={block.type}
          />
        {:else}
          <HeadingView
            content={block.content}
            {index}
            headingType={block.type}
          />
        {/if}
      {/if}
    {/each}
  </div>

  <WordLetterCount {letters} {words} />
</main>
