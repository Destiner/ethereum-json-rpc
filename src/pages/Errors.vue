<template>
  <Head>
    <title>Error Codes | Ethereum JSON-RPC API</title>
    <meta
      name="description"
      content="A list of error codes for the Ethereum JSON-RPC API."
    />
  </Head>
  <div class="page">
    <div class="content">
      <h1>Error Codes</h1>
      <div class="codes">
        <div class="code">
          <h2>-32700</h2>
          <div class="title">Parse error</div>
          <div class="description">Invalid JSON</div>
        </div>
        <div class="code">
          <h2>-32600</h2>
          <div class="title">Invalid request</div>
          <div class="description">
            This can happen when your request is malformed. Additionally, some
            of the provides use this code to signal that a particular method is
            not available or requires switching to a paid tier.
          </div>
        </div>
        <div class="code">
          <h2>-32601</h2>
          <div class="title">Method not found</div>
          <div class="description">
            This usually happens when the method is not available with a given
            provider. If you need to use a specific method that's not supported
            by the provider, try changing the provider or consider switching to
            a more expensive tier.
          </div>
        </div>
        <div class="code">
          <h2>-32602</h2>
          <div class="title">Invalid params</div>
          <div class="description">
            This happens when the request parameters are invalid. To fix, double
            check the parameters that you pass with the request and make sure
            they comply with the spec.
          </div>
        </div>
        <div class="code">
          <h2>-32603</h2>
          <div class="title">Internal error</div>
          <div class="description">Internal JSON-RPC error</div>
        </div>
        <div class="code">
          <h2>-32000</h2>
          <div class="title">Invalid input</div>
          <div class="description">Missing or invalid parameters</div>
        </div>
        <div class="code">
          <h2>-32001</h2>
          <div class="title">Resource not found</div>
          <div class="description">
            This usually happens when calling a method that's not supported. Try
            using a different method or switch providers.
          </div>
        </div>
        <div class="code">
          <h2>-32002</h2>
          <div class="title">Resource unavailable</div>
          <div class="description">Requested resource not available</div>
        </div>
        <div class="code">
          <h2>-32003</h2>
          <div class="title">Transaction rejected</div>
          <div class="description">Transaction creation failed</div>
        </div>
        <div class="code">
          <h2>-32004</h2>
          <div class="title">Method not supported</div>
          <div class="description">Method is not implemented</div>
        </div>
        <div class="code">
          <h2>-32005</h2>
          <div class="title">Limit exceeded</div>
          <div class="description">Request exceeds defined limit</div>
        </div>
        <div class="code">
          <h2>-32006</h2>
          <div class="title">JSON-RPC version not supported</div>
          <div class="description">
            Version of JSON-RPC protocol is not supported
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head } from '@unhead/vue/components';
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 16px;
}

@media (width >= 768px) {
  .page {
    padding: 32px 0;
  }
}

.content {
  display: flex;
  gap: var(--spacing-large);
  flex-direction: column;
  width: 100%;
}

@media (width >= 768px) {
  .content {
    width: 960px;
  }
}

h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1;
}

.codes {
  display: grid;
  gap: var(--spacing-large);
  flex-direction: column;
}

.code {
  display: flex;
  gap: var(--spacing-small);
  flex-direction: column;
}

h2 {
  margin: 0;
  font-size: 20px;
  line-height: 1;
}

.title {
  font-size: var(--font-size-big);
}

.description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-normal);
}
</style>
