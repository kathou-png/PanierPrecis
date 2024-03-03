<script lang="ts">
  import { SvelteUIProvider, Tabs } from '@svelteuidev/core';
  import Main from './routes/Main.svelte';
  import Edit from './routes/Edit.svelte';
  import { Router, Route } from 'svelte-routing';
    import Navbar from './components/Navbar.svelte';
</script>
<SvelteUIProvider>
<Navbar />
<Router>
  <Route path="/" component={Main} />
  <Route path="/edit_invoice" component={Edit} />
</Router>
</SvelteUIProvider>