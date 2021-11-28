<template>

	<v-card
		class="my-2 rounded-lg"
	>
		<v-container>
			<!-- Foto + título RPG  -->
			<v-row>
				<v-col cols="4"
				sm=3
				md=2
				>
					<v-avatar
						tile
						size="120"
						color="grey"
					>
						<v-img ></v-img>
					</v-avatar>
				</v-col>

				<v-col>
					<v-card-title class="headline text-h4 text-capitalize">
						{{ title }}
					</v-card-title>
				</v-col>
			</v-row>

			<!-- Resumo ficha -->
			<v-row>
				<v-col
					v-for="(valor, titulo) in descricao"
					:key="titulo"
					cols="12"	
					sm="6"	
				>
					<div class="text-h5 font-weight-medium text-capitalize">  {{ titulo }}: </div>
					<div class="text-h6 font-weight-regular">  {{ valor }} </div>
				</v-col>
				
			</v-row>
			<!-- Barras de vida, sanidade e sorte -->
			<v-row>
				<v-col
					cols="12"
					class="text-h5 font-weight-medium text-capitalize"	
				> 
					Vida:
				</v-col>


				<v-col 
					cols="2" 
					md="1"
				>
					<v-btn
						outlined
						block
						color="red"
						height="30"
						class="pa-0 rounded" 
						@click="vida.atual > 0 ? vida.atual-- : vida.atual"
					>
						<v-icon> mdi-minus </v-icon>

					</v-btn>
				</v-col>

				<v-col 
					cols="8" 
					md="10"
				>
					<v-progress-linear 
						class="rounded"
						color="red" 
						height="30" 
						:value="vida.atual/vida.total* 100"
					>
						{{ vida.atual }} / {{ vida.total }}
					</v-progress-linear>
				</v-col>
				<v-col 
					cols="2" 
					md="1"
				>
					<v-btn
						outlined
						block
						color="red"
						height="30"
						class="pa-0 rounded" 
						@click="vida.atual < vida.total ? vida.atual++ : vida.atual"
					>
						<v-icon> mdi-plus </v-icon>

					</v-btn>
				</v-col>
			</v-row>

			<v-row >
				<v-col cols="12" 
					class="text-h5 font-weight-medium text-capitalize"
					
				>
					Sanidade:

				</v-col>
				<v-col cols="2" 
					md="1"
				>
					<v-btn
						outlined
						block
						color="blue"
						height="30"
						class="pa-0 rounded" 
						@click="sanidade.atual > 0 ? sanidade.atual-- : sanidade.atual"
					>
						<v-icon> mdi-minus </v-icon>

					</v-btn>
				</v-col>
				<v-col cols="8" md="10">
					<v-progress-linear 
							class="rounded"
							color="blue" 
							height="30" 
							:value="sanidade.atual/sanidade.total* 100"
						>
							{{ sanidade.atual }} / {{ sanidade.total }}
					</v-progress-linear>
				</v-col>
				<v-col cols="2"	
					md="1"
				>

					<v-btn
						outlined
						block
						color="blue"
						height="30" 
						class="pa-0 rounded"
						@click="sanidade.atual < sanidade.total ? sanidade.atual++ : sanidade.atual"
					>
						<v-icon> mdi-plus </v-icon>

					</v-btn>
				</v-col>
			</v-row>

			<v-row>
				<v-col
					cols="12"
					class="text-h5 font-weight-medium text-capitalize"	
				>
					Sorte:
				</v-col>
				<v-col 
					cols="2" 
					md="1"
				>
					<v-btn
						outlined
						block
						color="green"
						height="30"
						class="pa-0 rounded" 
						@click="sorte.atual > 0 ? sorte.atual-- : sorte.atual"
					>
						<v-icon> mdi-minus </v-icon>
					</v-btn>
				</v-col>
				<v-col
					cols="8"
					md="10"
				>
					<v-progress-linear 
						class="rounded"
						color="green" 
						height="30" 
						:value="sorte.atual/sorte.total* 100"
					>
						{{ sorte.atual }} / {{ sorte.total }}
					</v-progress-linear>
				</v-col>
				<v-col 
					cols="2" 
					md="1"
				>
					<v-btn
						outlined
						block
						color="green"
						height="30"
						class="pa-0 rounded" 
						@click="sorte.atual < sorte.total ? sorte.atual++ : sorte.atual"
					>
						<v-icon> mdi-plus </v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-card-actions>
				<v-btn
					outlined
					rounded
					text
				>
					Button
				</v-btn>
			</v-card-actions>

		</v-container>
	</v-card>

</template>

<script>
// import func from 'vue-editor-bridge';
// @ is an alias to /src
// import ficha_json from '@/data/Matheus.json';
// import _ from 'lodash';

export default{
	name: 'Cartao',
	components: {
	},
	data(){
		return{
			show: true,
			carac:	"Características",
			desc:	"Descrição",
			hab:	"Habilidades",
			armaz:	"Inventário"
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
		},
		descricao: {
			required: true
		},
		vida: {
			required: true
		},
		sorte: {
			required: true
		},
		sanidade: {
			required: true
		}
	},
	methods: {
		somar: function (valor) {
			
			if (this.lista[valor] == "")
				this.lista[valor] = 0
			if (this.lista[valor] < 99)
				this.lista[valor] = parseInt(this.lista[valor]) + 1
			
		},
		subtrair: function (valor) {
			
			if (this.lista[valor] == "")
				this.lista[valor] = 0
			if (this.lista[valor] > 0)
				this.lista[valor] = parseInt(this.lista[valor]) - 1

		},
		rool: function (valor) {

			var dado = Math.floor(Math.random() * 100) + 1;
			var val = this.lista[valor];
			// desastre = 5% de 100 - valor da hab. arredondado p/ cima - 1
			var desastre = Math.ceil(1/20 * (100 - val)) - 1;



			if ( dado <= Math.ceil(val/5) || dado == 1)
				console.log("extremo", dado, val, (100 - desastre));
			else if ( dado <= Math.ceil(val/2) )
				console.log("bom", dado, val, (100 - desastre));
			else if ( dado <= val )
				console.log("normal", dado, val, (100 - desastre));
			else if (dado >= (100 - desastre) )
				console.log("desastre", dado, val, (100 - desastre));
			else
				console.log("falha", dado, val, (100 - desastre));

		},
		getLista: function (data) {
			// this.ficha[data1][data2] = "teste"
			return (this.ficha[data]);
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

</style>