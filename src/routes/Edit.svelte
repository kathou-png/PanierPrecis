<script lang="ts">
    import { Card, Flex, Button } from "@svelteuidev/core";
    let productName = "";
    let productReference = "";
    let productPrice = 0;

    let products = [
        {
            name: "Produit 1",
            reference: "abc",
            price: 10
        },
        {
            name: "Produit 2",
            reference: "abc",
            price: 5
        }
    ];
    let showAddItem : boolean= false;
    function addItem(){
        products = [
            ...products,
            {
                name: productName,
                reference: productReference,
                price: productPrice
            }
        ]
        showAddItem=false;
        console.log(products);
    }
</script>

    <h1>Titre de la facture</h1>

    {#each products as product}
    <Card style="margin:10px;">
        <Flex direction="rows" justify="space-around" >
            <p>{product.name}</p>
            <p>{product.reference}</p>
            <p>{product.price}</p>
        </Flex>
    </Card>
    {/each}
    {#if !showAddItem}
    <Button on:click={() => showAddItem = !showAddItem}>Ajouter un item</Button>

    {:else}

        <input type="text" placeholder="Nom du produit" bind:value={productName}/>
        <input type="text" placeholder="Reference" bind:value={productReference}/>
        <input type="number" placeholder="Prix" bind:value={productPrice}/>

        <Button on:click={addItem}>Ajouter</Button>
    {/if}
<style>

</style>