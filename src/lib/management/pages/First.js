import { Button, Stack } from '@mui/material';
import { useDeleteUser, useGetUsers, useUpdateUser } from 'src/hooks/firebase.hooks';

const First = () => {
  const users = useGetUsers();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  if (users.isLoading) {
    return <div>Loading...</div>;
  }
  console.log(users.data);

  return (
    <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
      {users.data.map((user) => {
        const { newUser, formValues } = user;
        return (
          <Stack key={user.id} direction="row">
            {newUser?.fullName ?? formValues?.fullName}
            <Button onClick={() => deleteUser.mutate(user)}>Delete</Button>
            <Button
              onClick={() =>
                updateUser.mutate({
                  userId: user.id,
                  updatedData: { ...user, newUser: { ...newUser, fullName: 'John Doe' } },
                })
              }
            >
              Update
            </Button>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default First;
