import _ from 'lodash';
import { ApiPromise } from '@polkadot/api';

import { AutomationAction, DEFAULT_TIMEOUT_PER_TEST, DEFAULT_TIMEOUT_INITIALIZE } from '../utils/constants'
import { getPolkadotApi } from '../utils/helpFn';

let polkadotApi: ApiPromise;

const initialize = async () => {
  polkadotApi = await getPolkadotApi();
}

beforeAll(() => initialize(), DEFAULT_TIMEOUT_INITIALIZE);
afterAll(() => polkadotApi?.disconnect());

test('scheduler.getTimeAutomationFees works', async () => {
  const resultCodec = await (polkadotApi.rpc as any).automationTime.getTimeAutomationFees(AutomationAction.Notify, 3)
  const fee =  resultCodec.toJSON();

  expect(fee > 0).toEqual(true);
}, DEFAULT_TIMEOUT_PER_TEST);

test('scheduler.calculateOptimalAutostaking works', async () => {
  // Find first collator
  const pool = (await polkadotApi.query.parachainStaking.candidatePool()).toJSON() as { owner: any }[];
  const { owner } = pool[0];

  const resultCodec = await (polkadotApi.rpc as any).automationTime.calculateOptimalAutostaking(10000000000, owner);
  const result = resultCodec.toPrimitive();

  expect(Object.keys(result).sort()).toEqual(["apy", "period"].sort());
}, DEFAULT_TIMEOUT_PER_TEST);

test('scheduler.getAutoCompoundDelegatedStakeTaskIds works', async () => {
  const resultCodec = await (polkadotApi.rpc as any).automationTime.getAutoCompoundDelegatedStakeTaskIds('68vqVx27xVYeCkqJTQnyXrcMCaKADUa7Rywn9TSrUZyp4NGP')
  const result = resultCodec.toJSON();

  expect(_.isArray(result)).toEqual(true);
}, DEFAULT_TIMEOUT_PER_TEST);
