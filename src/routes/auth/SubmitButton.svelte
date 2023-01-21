<script lang="ts">
	export let button_text: string = 'submit';
	export let loading: boolean;
</script>

<div class="form-control w-full">
	<label for="" class="label" />
	<button class="w-full btn btn-primary" disabled={loading}>{button_text}</button>
</div>
