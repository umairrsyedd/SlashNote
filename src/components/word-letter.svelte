<script>
  export let words;
  export let letters;
</script>

<div class="word-letter-info">
  <span class="word-count">
    words
    <span class="word-letter-number">{words}</span>
  </span>
  <span class="letter-count"
    >letters
    <span class="word-letter-number">{letters}</span>
  </span>
</div>

<style>
  .word-letter-info {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #333333;
    opacity: 0.6;
    border-radius: 4px;
    padding: 2px 6px;
    font-weight: 500;
    font-size: 0.7rem;
  }

  .word-letter-number {
    font-size: 0.9rem;
  }

  .word-count,
  .letter-count {
    padding: 2px;
  }
</style>
