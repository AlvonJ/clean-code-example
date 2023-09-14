export async function deleteUserInteractor(
  {
    deleteUserPersistence,
  }: {
    deleteUserPersistence: ({ id }: { id: string }) => Promise<void>;
  },
  { id }: { id: string }
): Promise<void> {
  await deleteUserPersistence({ id });
}
