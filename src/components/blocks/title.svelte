<script>
  import { onMount } from "svelte";
  import { ContentType } from "../../constants/content-type";
  import {
    addBlockAfterIndex,
    contentManager,
    focusedBlock,
  } from "../../stores/page-manager";
  import { focusAndMoveCursorToEnd } from "../../common/block-functionality";

  export let content;
  export let index;

  export let isFocusedBlock = false;
  let showInstructions = false;
  let editableRef;

  function handleBeforeInput(event) {
    if (event.inputType === "insertParagraph") {
      event.preventDefault();
      addBlockAfterIndex(0);
      focusedBlock.set(1);
    }
  }

  function handleInput(event) {
    content = event.target.innerText;

    showInstructions = content.trim() === "";

    $contentManager[index] = {
      type: ContentType.Title,
      content: content,
    };
  }

  function handleKeyDown(event) {
    if (event.data == "Enter") {
      event.preventDefault();
      return;
    }
  }

  function handleContainerClick() {
    editableRef.focus();
  }

  function handleBlur() {
    editableRef.blur();
  }

  onMount(() => {
    if (isFocusedBlock || content.trim() === "") {
      focusAndMoveCursorToEnd(editableRef);
    }

    if (content.trim() === "") {
      showInstructions = true;
    }
  });
</script>

<svelte:head>
  <title>{content.trim() === "" ? "Untitled" : content}</title>
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-autofocus -->
<div class="titleContainer" on:click={handleContainerClick}>
  <h1
    class="title block"
    contenteditable="true"
    bind:this={editableRef}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:blur={handleBlur}
    on:beforeinput={handleBeforeInput}
  >
    {content}
  </h1>
  {#if showInstructions}
    <div class="overlay title">Untitled</div>
  {/if}
</div>

<style>
  .titleContainer {
    position: relative;
  }

  .title {
    font-weight: 700;
    font-size: 2.5rem;
    line-height: 3rem;
    /* padding: 5px; // Add for Container click from outside  */
  }

  .overlay {
    position: absolute;
    top: 0;
    opacity: 0.1;
    display: inline-block;
  }
</style>
