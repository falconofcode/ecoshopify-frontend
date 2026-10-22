const templateDemoBaseUrl = "https://ecomusnext-themesflat.vercel.app";

export function templateDemoImage(path) {
  return `${templateDemoBaseUrl}${path}`;
}

export const groceryDemoImage = templateDemoImage;
