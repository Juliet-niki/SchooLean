// export const capitalizeFirstLetter = (name: string | undefined) =>
//   name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

export const CapitalizeFirstLetter = (word: unknown): string | undefined => {
  if (typeof word === "string" && word.length > 0) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
  }
  return undefined;
};
