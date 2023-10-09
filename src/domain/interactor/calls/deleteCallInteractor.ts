interface HasId {
  id: string;
}

export async function deleteCallInteractor(
  {
    deleteCallPersistence,
  }: {
    deleteCallPersistence: ({ id }: HasId) => Promise<void>;
  },
  { id }: HasId
): Promise<void> {
  await deleteCallPersistence({ id });
}
