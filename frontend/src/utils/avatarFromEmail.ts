export function getAvatarFromEmail(email: string) {
  if (!email || !email.includes("@")) {
    return "https://api.dicebear.com/9.x/adventurer/svg?seed=MaleDefault";
  }

  const name = email.split("@")[0].toLowerCase();

  const maleNames = [
    "alex", "brian", "john", "mohammad", "muhammad",
    "ahmed", "owais", "owaiz", "ali", "david", "sam"
  ];

  const femaleNames = [
    "maria", "sara", "sarah", "fatima",
    "ayesha", "emma", "aisha", "noor", "olivia", "grace"
  ];

  if (femaleNames.some(n => name.includes(n))) {
    return "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria";
  }

  if (maleNames.some(n => name.includes(n))) {
    return "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian";
  }

  return "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian";
}
