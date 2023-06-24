from dotenv import load_dotenv
import os

import flood

load_dotenv()

methods = [
  'eth_call',
  'eth_getBalance',
  'eth_getBlockByNumber',
  'eth_getCode',
  'eth_getLogs',
  'eth_getStorageAt',
  'eth_getTransactionByHash',
  'eth_getTransactionCount',
  'eth_getTransactionReceipt',
]

endpoint_list = os.getenv('ENDPOINTS')
if not endpoint_list:
  raise Exception('ENDPOINTS env var not found')
nodes = endpoint_list.split(',')

metrics = ['success', 'throughput', 'mean', 'p50', 'p90', 'p95', 'p99']
for method in methods:
  print(method)
  for node in nodes:
    print(node)
    flood.run(method, nodes=[node], dry=False, metrics=metrics)
