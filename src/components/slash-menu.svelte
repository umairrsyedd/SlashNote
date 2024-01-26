<script lang="ts">
  import { ContentType } from "../constants/content-type";
  import { slashMenuData } from "../constants/slash-menu";
  import {
    changeBlockType,
    createBlock,
    focusedBlock,
  } from "../stores/page-manager";

  export let blockIndex;
  export let currentInput: String;
  export let lastSlashIndex;

  const filteredSlashMenuArray = slashMenuData.filter((option) => {
    const inputUpperCase = currentInput.toUpperCase();

    return (
      currentInput === "" ||
      currentInput === "null" ||
      option.keywords?.some((keyword) =>
        keyword.toUpperCase().includes(inputUpperCase)
      )
    );
  });

  function handleMouseDown(optionType: ContentType) {
    if (lastSlashIndex == 0) {
      changeBlockType(blockIndex, optionType);
      focusedBlock.set(blockIndex);
    } else {
      createBlock(blockIndex, optionType);
      focusedBlock.set(blockIndex + 1);
    }
  }
</script>

<div class="selector">
  <div class="basic-blocks">Basic blocks</div>
  <div class="options">
    {#each filteredSlashMenuArray as option, optionIndex (option.image)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="option {optionIndex === 0 ? 'selected' : ''}"
        on:mousedown={() => {
          handleMouseDown(option.type);
        }}
      >
        <img class="option-image" src={option.image} alt={option.type} />
        <div class="option-right">
          <div class="option-right-top">{option.type}</div>
          <div class="option-right-bottom">{option.description}</div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .selector {
    position: absolute;
    font-size: 1rem;
    z-index: 999;
    background-color: #252525;
    color: white;
    width: 250px;
    height: 275px;
    padding: 0.5rem;
    border-radius: 1rem;
    overflow-y: scroll;
    cursor: pointer;
  }

  .basic-blocks {
    font-size: 0.75rem;
    text-align: left;
    font-weight: 800;
    padding: 0.4rem;
    color: #8e8e8e;
  }

  .options {
    display: flex;
    flex-direction: column;
  }

  .option {
    display: flex;
    border-radius: 0.25rem;
  }

  .option:hover,
  .selected {
    background-color: #333333;
  }

  .option-image {
    height: 46px;
    border-radius: 0.5rem;
    padding: 4px;
  }

  .option-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px 0px 4px 4px;
  }

  .option-right-top {
    font-size: 14px;
  }

  .option-right-bottom {
    font-size: 12px;
    color: #7f7f7f;
  }
</style>
