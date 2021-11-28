<template>
	<div>
		<v-container class=" my-4 rounded-lg">
			<Cartao
			title="aliens"
			:descricao=getLista(desc)
			:vida=getLista(life)
			:sorte=getLista(luck)
			:sanidade=getLista(sanity)
			:lista=getLista(armaz)
			:edition="edit"
			/>

			<v-card
			:elevation="3"
			>
				<Inventario
				class="rounded-t-lg"
				:title=armaz
				:lista=getLista(armaz)
				:edition="edit"
				@showButton="updateButton"
				/>
				<Divisoria
				:title=carac
				:lista=getLista(carac)
				:edition="edit"
				@showButton="updateButton"
				/>
				
				<Divisoria
				class="rounded-b-lg"
				:title=hab
				:lista=null
				:edition="edit"
				>

					<Divisoria
					class="my-4"
					:title="titulo"
					v-for="(el, titulo) in getLista(hab)"
					:key="titulo"
					:lista="el"
					:edition="edit"
					@showButton="updateButton"
					/>
				</Divisoria>
			</v-card>
			<v-row class="my-4">
				<v-col>
					<v-btn
					depressed
					color="blue "
					@click="download()"
					>
						Baixar ficha
					</v-btn>

				</v-col>
				<v-col>
					<v-btn
					depressed
					color="accent"
					@click="edit = !edit"
					>
						<div v-if="edit === true">
							sair da edição
						</div>
						<div v-else>
							editar
						</div>
					</v-btn>

				</v-col>
				
			</v-row>

			<v-row
			elevation="0"
			justify="center"
			
			>
				<v-dialog 
				v-model="toggle"
				width="70vw"
				dark
				elevation="0">
					<v-card
				dark
					class="lancamento"
					elevation="0">
						{{toggleObj.total}}
						{{toggleObj['dado'].lenght}}
						<div v-if="toggleObj.dado.length > 1" >
							<div
								v-for="(dado, index) in toggleObj.dado"
								:key="dado + '-' + index"
								cols="12"
								sm="6"
							>
								{{dado}} {{index}}
							</div>
						</div>
					</v-card>
				</v-dialog>
			</v-row>
		</v-container>


	</div>
	
</template>

<script>
// @ is an alias to /src
import ficha_json from '@/data/Matheus.json';
import Divisoria from '@/components/Ficha/Divisoria.vue';
import Cartao from '@/components/Ficha/Cartao.vue';
import Inventario from '@/components/Ficha/Inventario.vue';
// import _ from 'lodash';

export default{
	name: 'Ficha',
	components: {
		Divisoria,
		Cartao,
		Inventario
	},
	data(){
		return{
			ficha: ficha_json.ficha,
			show: true,
			carac: "Características",
			desc: "Descrição",
			hab: "Habilidades",
			armaz: "Inventário",
			life: "Vida",
			sanity: "Sanidade",
			luck: "Sorte",
			edit: false,
			toggle: false,
			toggleObj: {dado: [0]}
		}
	},
	methods: {
		getLista (data) {
			// this.ficha[data1][data2] = "download"
			return (this.ficha[data]);
		},
		download (){
			/* roubado de:
			https://stackoverflow.com/a/48612128
			*/			
			const data = JSON.stringify(this.ficha, (key, value) => (value || ''), 4).replace(/"([^"]+)":/g, '$1:');
			const blob = new Blob([data], {type: 'text/plain'})
			const e = document.createEvent('MouseEvents'),
			
			a = document.createElement('a');
			a.download = "Ficha.json";
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			a.dispatchEvent(e);

		},
		updateButton (toggleText) {
			var aux = toggleText;

			this.toggle = true;
			this.toggleObj = aux;
			
			setTimeout(() => {
				this.toggle = false;
			}, 2500);

			return this.toggle;
		}
	}
	
}
</script>

<style scoped>

.over-button {
	position: fixed;
	width: auto;
	bottom: 10px;
	right: 10px;
	left: 10px;
	background-color: var(--v-secondary-base);
}

.ficha {
	/* background-image: url("https://i.pinimg.com/originals/93/d7/cb/93d7cb574892db951ff84c168d978698.jpg"); */
	background-position: top ;
	background-repeat: no-repeat;
	background-size: 100% auto ;
  /* background-attachment: fixed; */
}

.lancamento{
	height: 400px;
	background-color: #222;
}

</style>