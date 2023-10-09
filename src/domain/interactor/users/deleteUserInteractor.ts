interface HasId {
  id: string;
}

export async function deleteUserInteractor(
  {
    deleteUserPersistence,
  }: {
    deleteUserPersistence: ({ id }: HasId) => Promise<void>;
  },
  { id }: HasId
): Promise<void> {
  await deleteUserPersistence({ id });
}
