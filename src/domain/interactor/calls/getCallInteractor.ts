import { CallEntity } from '../../entity/CallEntity';

interface HasId {
  id: string;
}

export async function getCallInteractor(
  {
    getCallPersistence,
  }: {
    getCallPersistence: ({ id }: HasId) => any;
  },
  { id }: HasId
): Promise<CallEntity> {
  const call = await getCallPersistence({ id });

  return call;
}
