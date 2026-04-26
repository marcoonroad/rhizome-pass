const copy = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('String copied to clipboard!');
      return true;
    } catch (reason) {
      console.error('Failed to copy: ' + reason);
      return false;
    }
  }
  return false;
};

export default {copy};
