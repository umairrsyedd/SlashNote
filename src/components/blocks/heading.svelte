<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { ContentType } from "../../constants/content-type";
  import {
    contentManager,
    addBlockAfterIndex,
    deleteBlock,
    focusedBlock as focusedBlockStore,
    changeBlockType,
    matchStringToBlockType,
    createBlock,
  } from "../../stores/page-manager";
  import SlashMenu from "../slash-menu.svelte";
  import { focusAndMoveCursorToEnd } from "../../common/block-functionality";

  export let content,
    index,
    isFocusedBlock = false,
    headingType: ContentType;

  let editableRef;
  let showInstructions = false;
  let showSlashMenu = false;
  let slashMenuInput: string = "";
  let lastSlashIndex = -1;

  // Event Handlers
  function handleFocus() {
    showInstructions = content.trim() === "";
  }

  function handleBlur() {
    showInstructions = false;
    turnOffSlashMenu();
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" || event.key === " ") {
      turnOffSlashMenu();
    }
  }

  function handleBeforeInput(event) {
    if (event.inputType === "insertParagraph") {
      event.preventDefault();
      handleInsertParagraph();
    } else if (event.inputType === "deleteContentBackward") {
      handleDeleteContentBackward(event);
    }
  }

  function handleInsertParagraph() {
    if (showSlashMenu) {
      handleSlashMenuInsertParagraph();
    } else {
      addBlockAfterIndex(index);
      focusedBlockStore.set(index + 1);
    }
  }

  function updateBlockInContentManager(blockIndex, content) {
    $contentManager[blockIndex].content = content;
  }

  function handleSlashMenuInsertParagraph() {
    lastSlashIndex = content.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      slashMenuInput = content.substring(lastSlashIndex + 1);
      if (lastSlashIndex == 0) {
        changeBlockType(index, matchStringToBlockType(slashMenuInput));
        typeChangesCount++;
        focusedBlockStore.set(index);
      } else {
        createBlock(index, matchStringToBlockType(slashMenuInput));
        focusedBlockStore.set(index + 1);
      }
      updateBlockInContentManager(index, content.substring(0, lastSlashIndex));
      turnOffSlashMenu();
    }
  }

  function handleDeleteContentBackward(event) {
    if (event.target.innerText === "") {
      turnOffSlashMenu();
      event.preventDefault();
      deleteBlock(index);
      focusedBlockStore.set(index - 1);
    }
    if (showSlashMenu && slashMenuInput.length > 0) {
      slashMenuInput = slashMenuInput.slice(0, -1);
    }
  }

  function handleInput(event) {
    let content = event.target.innerText;
    showInstructions = content.trim() === "";
    handleSlashMenu(event, content);
  }

  function handleSlashMenu(event, content) {
    if (event.data === "/") {
      showSlashMenu = true;
    }
    if (showSlashMenu) {
      if (content.trim() === "") {
        turnOffSlashMenu();
      }
      if (event.data !== "/" && event.data !== null) {
        slashMenuInput = slashMenuInput + event.data;
      }
    }

    updateBlockInContentManager(index, content);
  }
  function turnOffSlashMenu() {
    showSlashMenu = false;
    slashMenuInput = "";
  }

  $: typeChangesCount = 0;

  afterUpdate(() => {
    if (isFocusedBlock) {
      focusAndMoveCursorToEnd(editableRef);
    }
  });

  onMount(() => {
    if (isFocusedBlock) {
      focusAndMoveCursorToEnd(editableRef);
    }
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="headingContainer">
  {#key typeChangesCount}
    {#if headingType == ContentType.Heading1}
      <h2
        class="heading1 block"
        contenteditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="heading"
        bind:this={editableRef}
        on:input={handleInput}
        on:beforeinput={handleBeforeInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
      >
        {content}
      </h2>
      {#if showInstructions}
        <div class="overlay heading1">Heading 1</div>
      {/if}
    {:else if headingType == ContentType.Heading2}
      <h3
        class="heading2 block"
        contenteditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="heading"
        bind:this={editableRef}
        on:input={handleInput}
        on:beforeinput={handleBeforeInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
      >
        {content}
      </h3>
      {#if showInstructions}
        <div class="overlay heading2">Heading 2</div>
      {/if}
    {:else}
      <h4
        class="heading3 block"
        contenteditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="heading"
        bind:this={editableRef}
        on:input={handleInput}
        on:beforeinput={handleBeforeInput}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
      >
        {content}
      </h4>
      {#if showInstructions}
        <div class="overlay heading3">Heading 3</div>
      {/if}
    {/if}
  {/key}
</div>

{#key slashMenuInput}
  {#if showSlashMenu}
    <SlashMenu
      blockIndex={index}
      currentInput={slashMenuInput.trim()}
      {lastSlashIndex}
    />
  {/if}
{/key}

<style>
  .headingContainer {
    position: relative;
  }
  .heading1 {
    font-size: 2em;
    line-height: 2;
    font-weight: 650;
  }

  .heading2 {
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: 650;
  }
  .heading3 {
    font-size: 1.25rem;
    line-height: 1.3;
    font-weight: 650;
  }

  .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    color: #373737;
  }
</style>
