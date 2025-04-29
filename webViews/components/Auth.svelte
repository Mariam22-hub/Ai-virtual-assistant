<script lang="ts">
  import { onMount } from "svelte";
  let accessToken = "";
  let loading = true;
  let user: { name: string; id: number } | null = null;

  onMount(async () => {
    window.addEventListener("message", async (event) => {
      switch (event.data.type) {
        case "token":
          accessToken = event.data.value;
          const response = await fetch(`${apiBaseUrl}/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          user = data.user;
          loading = false;
          break;
      }
    });

    tsvscode.postMessage({ type: "get-token", value: undefined });
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if user}
  <pre> {JSON.stringify(user, null, 2)} </pre>
{:else}
  <p>Not logged in</p>
{/if}
