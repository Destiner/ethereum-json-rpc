<template>
  <header>
    <div>Eth API</div>
  </header>
  <main>
    <section class="methods">
      <input />
      <div>
        <div>eth_blockNumber</div>
        <div>eth_getBlockByNumber</div>
        <div>eth_getBlockByHash</div>
      </div>
    </section>
    <section class="method">
      <h1 class="method-title">Get block number</h1>
      <div>
        <div class="method-type">Standard</div>
        <div class="method-id">eth_blockNumber</div>
      </div>
      <div class="method-description"></div>
      <div class="method-params">
        <h2>Params</h2>
        <div class="method-param-list">
          <div class="method-param">
            <div class="method-param-meta">
              <div class="method-param-name"></div>
              <div class="method-param-type"></div>
              <div class="method-param-required" />
            </div>
            <input class="method-param-value" />
          </div>
        </div>
      </div>
    </section>
    <section class="execution">
      <div class="execution-request">
        <button class="execution-request-run">Execute</button>
      </div>
      <div class="execution-response"></div>
    </section>
  </main>
</template>
