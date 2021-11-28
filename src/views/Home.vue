<template>
	<v-container >
		<v-row>
			<v-col cols='12'>

				Este é um site em teste para que o nosso RPG possa acontecer. 
				Ainda está longe de ser perto do produto final que pretendo fazer.
				<br>
				<br>
				Isso ainda tá longe de ser um pré-alpha kkkkkkkkk
				<br>
			
				<router-link to="/login">
					<v-btn
						color="error"
						dark
						large
						@click="this.$router.go({ path: 'login' })"
					>
						fazer login
					</v-btn>
				</router-link>
				
			</v-col>

			
			<v-col>

			</v-col>

		</v-row>
	</v-container>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {
	},
}
</script>

<style>

.home {
	/* background-image: url("https://i.pinimg.com/originals/93/d7/cb/93d7cb574892db951ff84c168d978698.jpg"); */
	background-position: center ;
	background-repeat: no-repeat;
	background-size: auto ;
}

</style>