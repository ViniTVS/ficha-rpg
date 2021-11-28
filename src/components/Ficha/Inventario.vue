<template>

	<v-card
		class="mx-auto"
		elevation="0"
		rounded="0"
	>

		<v-card-actions>
			<v-container @click="show = !show" class="mx-2" style="cursor: pointer;">
				<v-row>
					<h1 class="mx-2 text-capitalize">						
						{{ title }}
					</h1>

					<v-spacer></v-spacer>

					<v-btn icon >
						<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
					</v-btn>
				</v-row>
			</v-container >

		</v-card-actions>
		
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-container  >
						
					<div
						v-for="(itens, nome) in lista"
						:key="nome"
					>
						<h2 class="text-capitalize">
							{{nome}}
						</h2>
						<div
							v-for="(item, i) in itens"
							:key="item[i]"
						>
							<v-row>
								<v-col
									cols="12"
									
								>	
									<div
										v-if="nome === 'armas'"
									>
										{{item.arma}} <br>
										Dano: 
										<v-btn
											left
											class="mx-2"
											icon
											@click="rool(item.dano)"
										>
											<v-icon> mdi-dice-multiple </v-icon>
										</v-btn>
										{{item.dano}} <br>
										Munição:
										<v-btn
											left
											class="mx-2"
											icon
											color="red"
											@click="item.munição--"
										>
											<v-icon> mdi-minus </v-icon>
										</v-btn>

										<v-divider vertical></v-divider>
											{{item.munição}}
										<v-divider vertical></v-divider>
										<v-btn
											left
											class="mx-2"
											icon
											right
											color="green"
											@click="item.munição++"
										>
											<v-icon> mdi-plus </v-icon>
										</v-btn>
									</div>

									<div
										v-else-if="nome === 'peso'"
									>
										pesadão!
										{{item[0]}}/{{item[1]}}
									</div>

									<div
										v-else
									>
										{{item.item}}
										{{item.quantidade}}
										{{item.peso !== undefined? "peso: " + item.peso : null}}
									</div>
								</v-col>
							</v-row>
						</div>
					</div>
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
	name: 'Inventario',
	components: {
	},
	data(){
		return{
			// ficha: ficha_json.ficha,
			show: true,
			valDados: 0
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
		getDice(dadoString) {
			var aux = []; 
			aux = dadoString.split("+");
			
			var valores = [];
			var dados = 0;
			// fazer chamas recursivas:
			if (aux.length > 1){
				for (let i of aux){
					
					dados = this.rool(i);
					valores.push(...dados)
					dados += this.rool(i);
				}
			}
			else {
				// fazer roll de cada dado:
				aux = dadoString.split("d");
				if (aux.length > 1){
					for (let i = 0; i < aux[0]; i++){
						
						valores.push(Math.floor(Math.random() * aux[1]) + 1);
						dados += (Math.floor(Math.random() * aux[1]) + 1);
					}
				}
				// add do valor solo:
				else {
					
					valores.push(parseInt(aux));
				}
			}
			return valores;
		},
		rool(dadoString) {
			var dados = this.getDice(dadoString);
			// console.log("dados: " + dados);
			var soma = 0;
			for (let i of dados){
				soma += i;
			}
			this.$emit('showButton', {
				success: "teste",
				dado: dados,
				skill: dadoString,
				total: soma
			});

			return dados;
		}
	}
	
}
</script>

<style>


</style>