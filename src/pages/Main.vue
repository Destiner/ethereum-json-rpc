<template>
  <header>
    <div>Eth API</div>
  </header>
  <main>
    <nav class="methods">
      <input
        class="methods-filter"
        placeholder="Filter"
      />
      <div class="method-list">
        <div class="method-item">eth_blockNumber</div>
        <div class="method-item">eth_getBlockByNumber</div>
        <div class="method-item">eth_getBlockByHash</div>
      </div>
    </nav>
    <article class="method">
      <div class="method-header">
        <h1 class="method-title">Get block number</h1>
        <div class="method-meta">
          <div class="method-type">Standard</div>
          <div class="method-id">eth_blockNumber</div>
        </div>
      </div>
      <div class="method-description">
        Returns the number of the latest included block.
      </div>
      <div class="method-params">
        <div class="method-param-header">Params</div>
        <div class="method-param-list">
          <div class="method-param">
            <div class="method-param-meta">
              <div class="method-param-name">number</div>
              <div class="method-param-type">int</div>
              <div class="method-param-required">*</div>
            </div>
            <div>
              <input class="method-param-value" />
            </div>
          </div>
        </div>
      </div>
    </article>
    <div class="execution">
      <div class="execution-request">
        <div class="execution-request-label">Request</div>
        <div>
          <button class="execution-request-body">Execute</button>
        </div>
      </div>
      <div class="execution-response">
        <div class="execution-response-label">Response</div>
        <div class="execution-response-body">
          { "jsonrpc":"2.0", "result":"0x44", "id":1 }
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border-primary);
}

main {
  display: flex;
  min-height: calc(100vh - 64px);
}

.methods {
  display: flex;
  gap: 8px;
  flex: 1;
  flex-direction: column;
  padding: 15px 20px 10px;
}

.methods-filter {
  margin: 0;
  padding: 2px 4px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

.methods-filter:focus {
  border: 1px solid var(--color-border-secondary);
}

.method-list {
  display: flex;
  gap: 2px;
  flex-direction: column;
}

.method-item {
  padding: 4px;
  border-radius: 4px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.method-item:hover {
  background: var(--color-bg-secondary);
  cursor: pointer;
}

.method {
  display: flex;
  gap: 16px;
  flex: 3;
  flex-direction: column;
  padding: 30px;
  border-right: 1px solid var(--color-border-primary);
  border-left: 1px solid var(--color-border-primary);
}

.method-header {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.method-title {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
}

.method-meta {
  display: flex;
  gap: 4px;
  align-items: center;
}

.method-type {
  padding: 2px 4px;
  border-radius: 2px;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-size: 11px;
  text-transform: uppercase;
}

.method-id {
  color: var(--color-text-secondary);
}

.method-params {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.method-param-header {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-transform: uppercase;
}

.method-param-list {
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  background: var(--color-bg-secondary);
}

.method-param {
  display: flex;
  padding: 10px;
}

.method-param:not(:first-child) {
  border-top: 1px solid var(--color-border-primary);
}

.method-param-meta {
  display: flex;
  gap: 4px;
  flex: 1;
  align-items: baseline;
}

.method-param-name {
  font-size: 14px;
  font-weight: bold;
}

.method-param-type {
  color: var(--color-text-secondary);
  font-size: 12px;
}

.method-param-required {
  color: var(--color-error);
}

.method-param-value {
  width: 140px;
  padding: 4px 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  text-align: right;
}

.method-param-value:focus {
  border: 1px solid var(--color-border-secondary);
}

.execution {
  display: flex;
  gap: 16px;
  flex: 2;
  flex-direction: column;
  padding: 15px 20px 10px;
}

.execution-request,
.execution-response {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.execution-request-label,
.execution-response-label {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-transform: uppercase;
}

.execution-request-body {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: var(--color-accent);
  color: var(--color-bg-primary);
  font-weight: bold;
  cursor: pointer;
}

.execution-request-body:hover {
  background: var(--color-accent-dark);
}

.execution-response-body {
  padding: 8px;
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  background: var(--color-bg-secondary);
  font-family: var(--font-mono);
  font-size: 12px;
}
</style>
