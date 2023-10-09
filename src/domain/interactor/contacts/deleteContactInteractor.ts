interface HasId {
  id: string;
}

export async function deleteContactInteractor(
  {
    deleteContactPersistence,
  }: {
    deleteContactPersistence: ({ id }: HasId) => Promise<void>;
  },
  { id }: HasId
): Promise<void> {
  await deleteContactPersistence({ id });
}
