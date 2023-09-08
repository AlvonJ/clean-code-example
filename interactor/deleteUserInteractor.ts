export const deleteUserInteractor = async (
  {
    deleteUserPersistence,
  }: {
    deleteUserPersistence: ({ id }: { id: string }) => Promise<void>;
  },
  { id }: { id: string }
): Promise<void> => {
  await deleteUserPersistence({ id });
};
