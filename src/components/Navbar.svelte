<!-- Navbar.svelte -->
<script>
   import { navigate } from 'svelte-routing';
   const navigateTo = (route) => {
        navigate(route);
    };
</script>

<nav>
    <ul style="list-style-type: none; padding: 0; margin: 0; display: inline;">
        <li style="display: inline;"><button on:click={() => navigateTo('/')}>Home</button></li>
        <li style="display: inline;"><button on:click={() => navigateTo('/edit_invoice')}>Editer une facture</button></li>
        <li style="display: inline;"><button on:click={() => navigateTo('/')}>Evolution des prix</button></li>
        <li style="display: inline;"><button on:click={() => navigateTo('/')}>Historique</button></li>
    </ul>
</nav>