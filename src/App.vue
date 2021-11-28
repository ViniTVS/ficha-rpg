<template>
	
	<v-app v-on:scroll="updateScroll">
		<v-app-bar 
			app
			v-ripple="{ center: true }"
			:class="bar_class"
			:rounded=bar_round
			id="top-bar"
			height="56px"
			:max-width=bar_width
		>
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title>Title</v-toolbar-title>
		</v-app-bar>

    <v-navigation-drawer 
      app
      v-model="drawer"
      
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
        >

          <v-list-item>
			<v-switch
				v-model="$vuetify.theme.dark"
				hint="Altere entre temas claro e escuro"
				inset
				label="Dark Theme"
				persistent-hint
			></v-switch>
          </v-list-item>

          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>

          <div v-if="userLogged">
            <router-link to="/account">
              <v-list-item>						
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </router-link>
          </div>
          <div v-else>
            <router-link to="/login">
              <v-list-item>						
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item>
            </router-link>
          </div>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

		<!-- Sizes your content based upon application components -->
		<v-main class="home background">

			<!-- Provides the application the proper gutter -->
			<!-- <v-container fluid> -->

				<!-- If using vue-router -->
			<router-view></router-view>
			<!-- </v-container> -->
		</v-main>

	</v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      group: null,
      bar_width: '',
      bar_round: 'false',
      bar_class: 'primary',
      userLogged: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroy() {
      window.removeEventListener('scroll', this.updateScroll)
  },
	methods: {
		updateScroll() {
			if (window.pageYOffset === 0 ){
				this.bar_width = "";
				this.bar_round = false
				this.bar_class='primary'
			}
			else {
				this.bar_width = "56px";
				this.bar_round = ""
				this.bar_class='primary ma-2'
			}
		}
	}
}

</script>