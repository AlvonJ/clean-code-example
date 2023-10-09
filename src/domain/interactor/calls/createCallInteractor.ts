import { CallEntity, CallInterface } from '../../entity/CallEntity.js';

export async function createCallInteractor(
  {
    createCallPersistence,
  }: {
    createCallPersistence: (call: CallInterface) => Promise<any>;
  },
  call: CallInterface
): Promise<CallInterface> {
  const callObject = new CallEntity(call);

  callObject.validate();

  const newCall = await createCallPersistence(call);

  return newCall;
}
