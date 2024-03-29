export default {
  rpc: {
    crossChainAccount: {
      description: 'Find xcmp account id',
      params: [
        { name: 'accountId', type: 'AccountId32' }
      ],
      type: 'AccountId32',
    },
    fees: {
      description: 'Determine fees for a scheduled xcmp task',
      params: [
        { name: 'encodedXt', type: 'Bytes' },
      ],
      type: 'u64',
    }
  },
  types: {},
  runtime: {
    XcmpHandlerApi: [
      {
        methods: {
          get_time_automation_fees: {
            description: 'Determine fees for a scheduled xcmp task',
            params: [{ name: 'encodedXt', type: 'Bytes' }],
            type: 'u64'
          },
        },
        version: 1
      }
    ]
  }
}
