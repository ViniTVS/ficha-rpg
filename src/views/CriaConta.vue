<template>
    <v-container>
        <v-row>
            <v-col
            cols="12"
            sm="6">
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        type="password"
                        name="input-10-1"
                        hint="A senha deve conter ao menos 8 caracteres"
                        counter
                        :rules="passwordRules"
                        label="Senha"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="passwordCheck"
                        type="password"
                        name="input-10-2"
                        counter
                        :rules="[(this.password === this.passwordCheck) || 'As senhas não batem']"
                        label="Senha"
                        required
                    ></v-text-field>

                    <div class="d-flex justify-space-around flex-wrap">
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="ma-4"
                            @click="register()"
                            >
                            criar conta
                        </v-btn>
                    </div>
                </v-form>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            class="d-flex justify-center">
                <p class=" align-self-center">
                    Aqui quem leu o cu já deu.
                    <br>
                    kkkkkkkkk
                </p>
            </v-col>
        </v-row>


        <v-row
        elevation="0"
        justify="center"
        >

            <v-alert
                border="bottom"
                :value="alertShow"
                :color="alertType"
            >
                {{alertMessage}}
            </v-alert>
        </v-row>
    </v-container>
	
</template>

<script>
// @ is an alias to /src
// import _ from 'lodash';
import firebase from "firebase";


export default{
	name: 'Login',
	components: {
	},
    data: () => ({
      valid: true,
      password: '',
      passwordCheck: '',
      passwordRules: [
        v => !!v || 'Senha inválida',
        v => (v && v.length >= 8) || 'A senha deve ter ao menos 8 caracteres',
      ],
      passwordCheckRules: [
        v => (v && v == this.password) || 'As senhas não batem',
        v => (v && v == this.password) || 'As senhas não batem',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é necessário',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      select: null,
      alertShow: false,
      alertMessage: null,
      alertType: 'success'
    }),

    methods: {
        register() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.alertMessage = "Conta criada!";
                    this.alertType = "success";
                    this.alertShow = true;
                    setTimeout(() => {
                        this.alertShow = false;
                        this.$router.push('/');
                    }, 2000);
                    console.log(this.$teste);
                })
                .catch(error => {
                    this.alertType = "error";
                    this.alertMessage = error.message;
                    this.alertShow = true;
                    setTimeout(() => {
                        this.alertShow = false;
                    }, 2000);
                    console.log(this.$teste);
                })
            ;

        },
    },
}
</script>

<style scoped>

</style>