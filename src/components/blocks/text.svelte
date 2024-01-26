<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { ContentType } from "../../constants/content-type";
  import {
    contentManager,
    matchStringToBlockType,
    addBlockAfterIndex,
    deleteBlock,
    focusedBlock as focusedBlockStore,
    changeBlockType,
    createBlock,
  } from "../../stores/page-manager";
  import SlashMenu from "../slash-menu.svelte";
  import { focusAndMoveCursorToEnd } from "../../common/block-functionality";

  export let content,
    index,
    isFocusedBlock = false;

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
      if (index != 1) {
        handleDeleteContentBackward(event);
      }
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
      event.preventDefault();
      turnOffSlashMenu();
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

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div class="textContainer">
  {#key typeChangesCount}
    <div
      class="text block"
      contenteditable="true"
      role="textbox"
      aria-multiline="true"
      aria-label="textbox"
      bind:this={editableRef}
      on:input={handleInput}
      on:beforeinput={handleBeforeInput}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:keydown={handleKeyDown}
    >
      {content}
    </div>

    {#if showInstructions}
      <div class="overlay text">Press ‘/‘ for commands…</div>
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
  .textContainer {
    position: relative;
  }
  .text {
    font-size: 1rem;
    line-height: 2rem;
    font-weight: 450;
  }

  .overlay {
    position: absolute;
    width: 100%;
    top: 0;
    color: #5a5a5a;
  }
</style>
