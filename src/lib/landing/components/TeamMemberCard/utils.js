export const checkImagePermission = async (profileImage) => {
  return fetch(profileImage)
    .then((response) => {
      console.log(response);
      return response.ok;
    })
    .catch((error) => {
      console.error('Error while checking image permission:', error);
    });
};
