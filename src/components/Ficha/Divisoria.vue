<template>

	<v-card
		class="mx-auto"
		elevation="0"
		rounded="0"
	>

		<v-card-actions>
			<v-container 
			@click="show = !show" 
			class="mx-2 cont rounded-lg"
			>
				<v-row>
						<h1 class="mx-2 text-capitalize">						
							{{ title }}
						</h1>

						<v-spacer></v-spacer>

						<v-btn icon class="ma-1">
							<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
						</v-btn>
				</v-row>
			</v-container >

		</v-card-actions>
		
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-container  >
					<v-row>
						
						<v-col
							v-for="(val, titulo) in lista"
							:key="titulo"
							cols="12"
							sm="6"
						>
							<v-row
									class="d-flex justify-end"
							>
								<v-col
									cols="7"
									sm="6"
								>
									<v-card-text class="text-capitalize text-h6">
										{{ titulo }}: 
									</v-card-text>
								</v-col>
								<!-- <v-spacer></v-spacer> -->
								<v-col
									cols="5"
									sm="6"
									align-self="center"
								>
									<!-- <v-hover disabled v-slot="{ hover }"> -->
									
									<v-sheet>
										<div v-if="edition === false">
											<v-btn
												left
												outlined
												class="mx-4"
												text
												icon
												color="grey"
												@click="rool(titulo)"
											>
												<v-icon> mdi-dice-multiple </v-icon>
											</v-btn>
											{{ digitos(titulo) }}
										</div>
										<div v-else>
											<v-btn
												left
												class="mx-0"
												text
												icon
												color="red"
												@click="subtrair(titulo)"
											>
												<v-icon> mdi-minus </v-icon>
											</v-btn>

											<v-divider vertical></v-divider>
											{{ digitos(titulo) }}
											<v-divider vertical></v-divider>
											<v-btn
												left
												class="mx-0"
												text
												icon
												right
												color="green"
												@click="somar(titulo)"
											>
												<v-icon> mdi-plus </v-icon>
											</v-btn>
										</div>
									</v-sheet>
									
										<!-- </v-hover> -->
									
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<slot></slot>
				</v-container>
			</div>
			
		</v-expand-transition>
	</v-card>

</template>

<script>
// import func from 'vue-editor-bridge';
// @ is an alias to /src
// import ficha_json from '@/data/Matheus.json';
// import _ from 'lodash';

export default{
	name: 'Divisoria',
	components: {
	},
	data(){
		return{
			// ficha: ficha_json.ficha,
			show: true
		}
	},
	props: {
		title: {
			required: true
		},
		lista: {
			required: true
		},
		edition: {
			required: true
		}
	},
	methods: {
		digitos: function (where) {
			var ret;
			if (this.lista[where] == '')
				ret = 0

			if (this.lista[where] < 10)
				ret = "0" + this.lista[where].toString();
			else
				ret = this.lista[where];

			return ret;
		
		},
		somar: function (where) {
			
			if (this.lista[where] == "")
				this.lista[where] = 0
			if (this.lista[where] < 99)
				this.lista[where] = parseInt(this.lista[where]) + 1
			
		},
		subtrair: function (where) {
			
			if (this.lista[where] == "")
				this.lista[where] = 0
			if (this.lista[where] > 0)
				this.lista[where] = parseInt(this.lista[where]) - 1

		},
		rool: function (valor) {

			var dado = Math.floor(Math.random() * 100) + 1;
			var val = this.lista[valor];
			// desastre = 5% de 100 - where da hab. arredondado p/ cima - 1
			var desastre = Math.ceil(1/20 * (100 - val)) - 1;
			var succ = "";


			if ( dado <= Math.ceil(val/5) || dado == 1)
				succ = "extremo";
			else if ( dado <= Math.ceil(val/2) )
				succ = "bom";
			else if ( dado <= val )
				succ = "normal";
			else if (dado >= (100 - desastre) )
				succ = "desastre";
			else
				succ = "fracasso";
			
			// var toggleText = (succ + " " + dado);
			this.$emit('showButton', {
				success: succ,
				dado: [dado],
				skill: valor,
				total: dado
			});
			// console.log("a");

		}
	}
	
}
</script>

<style>

.divisoria {
	background-image: url("https://i.pinimg.com/originals/93/d7/cb/93d7cb574892db951ff84c168d978698.jpg");
	background-position: top ;
	background-repeat: no-repeat;
	background-size: 100% auto ;
  /* background-attachment: fixed; */
}

@media(hover: hover) and (pointer: fine) {
	.cont:hover {
		cursor: pointer;
		background: rgba(0, 0, 0, 0.1);
	}
}

</style>