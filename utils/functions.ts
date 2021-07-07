export const redirect = (destination) => {
  return {
    redirect: {
      permanent: false,
      destination,
    },
    props: {},
  };
};

export const isVowel = (text: string) => {
  const a = text.toLowerCase().startsWith("a");
  const e = text.toLowerCase().startsWith("e");
  const i = text.toLowerCase().startsWith("i");
  const o = text.toLowerCase().startsWith("o");
  const u = text.toLowerCase().startsWith("u");
  if (a || e || i || o || u) {
    return true;
  }

  return false;
};
