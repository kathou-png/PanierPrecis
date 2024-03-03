
<script lang="ts">
    import { Button, Flex, Center, Card } from '@svelteuidev/core';
    import { navigate } from 'svelte-routing';

    let invoiceName : string = "Nouvelle facture";
    let invoiceDate : string = "2022-01-01";
    let storeName  : string= "Auchan";
	let invoices=[{
                name: "Auchan",
                date: "2022-01-01",
                storeName: "Auchan"
            }];
    let isVisible : boolean = false;

    function toggleVisibility() {
        isVisible = !isVisible;
    }

    async function createInvoice() { 
        invoices = [
            ...invoices,
            {
                name: invoiceName,
                date: invoiceDate,
                storeName: storeName
            }
        ];
        toggleVisibility();
        console.log(invoices);
    }
    async function handleClick () {
    // Navigate to the desired page
        console.log("navigating");
        navigate('/edit_invoice');
    };
</script>

<div>
    <Center>
        <Flex direction="column" gap="lg">   
            <Button type="button"  on:click={toggleVisibility}>Créer une nouvelle facture</Button>
            {#if isVisible}

                <Flex direction="column" gap="lg">   
                <input type="text" placeholder="Nom de la facture" bind:value={invoiceName}/>
                <input type="date" bind:value={invoiceDate}/>
                <input type="text" placeholder="Supermarché" bind:value={storeName}/>
                </Flex>
        <Button on:click={createInvoice}>Créer</Button>
        {/if}
        {#each invoices as invoice}
        <Card>
            <div>
                <h2>{invoice.name}</h2>
                <p>Date: {invoice.date}</p>
                <p>Store: {invoice.storeName}</p>
                <Button on:click={handleClick}>Editer</Button>
                <Button>Supprimer</Button>
            </div>
        </Card>
        {/each}
        </Flex>
    </Center>
</div>

<style>
</style>