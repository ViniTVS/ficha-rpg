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
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        name="input-10-1"
                        @click:append="showPassword = !showPassword"
                        :rules="passwordRules"
                        label="Senha"
                        required
                    ></v-text-field>
                </v-form>

                <div class="d-flex justify-space-around flex-wrap">
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="ma-4"
                        @click="register()"
                        >
                        entrar
                    </v-btn>

                    <router-link to="/criarconta">
                        <v-btn
                            color="teal"
                            class="ma-4"
                            dark
                            >
                            criar conta
                        </v-btn>
                    </router-link>

                    <v-btn
                        color="blue"
                        class="ma-4"
                        dark
                        >
                        entrar com google
                    </v-btn>

                </div>

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
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Senha inválida',
        v => (v && v.length >= 8) || 'A senha tem ao menos 8 chars',
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
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.alertMessage = "Login realizado";
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