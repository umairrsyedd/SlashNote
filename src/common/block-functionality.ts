export function focusAndMoveCursorToEnd(editableRef) {
  editableRef.focus();

  // Move the cursor to the end of the element
  const range = document.createRange();
  range.selectNodeContents(editableRef);
  range.collapse(false); // Set to end of the selection
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}