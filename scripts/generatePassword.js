export const generatePassword = (length, options) => {
  const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMERIC = "0123456789";
  const SPECIAL = "!@#$%^&*()_-+=<>?/{}~";

  let characters = "";

  if (options.lowercase) characters += LOWERCASE;
  if (options.uppercase) characters += UPPERCASE;
  if (options.numeric) characters += NUMERIC;
  if (options.special) characters += SPECIAL;

  if (characters.length === 0) {
    return "";
  }

  let result = "";

  for (let index = 0; index < length; index++) {
    const randomNumber = Math.floor(Math.random() * characters.length);
    result += characters[randomNumber];
  }

  return result;
};
