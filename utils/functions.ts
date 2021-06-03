export const redirect = (destination) => {
  return {
    redirect: {
      permanent: false,
      destination,
    },
    props: {},
  };
};
