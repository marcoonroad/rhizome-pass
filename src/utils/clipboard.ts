const copy = async (text : string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('String copied to clipboard!');
    } catch (reason) {
      console.error('Failed to copy: ' + reason);
    }
  }
}

export default { copy }

