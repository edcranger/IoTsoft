<template>
  <div class="login pa-3">
    <v-container class="elevation-5">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center green--text">Vertive Home Connect</h1>
          <form ref="form">
            <!-- Name-->

            <!-- email-->
            <v-text-field
              class="mt-2"
              v-model="email"
              :rules="[rules.email]"
              color="deep-purple"
              label="Email address"
              type="email"
            ></v-text-field>
            <!-- password-->
            <v-text-field
              class="mt-2"
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn class="mt-4" @click="reset">Clear</v-btn>
            <v-btn class="mt-4 purple darken-4 white--text" @click="register">Submit</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        email: v => (v || "").match(/@/) || "Please enter a valid email"
      }
    };
  },
  methods: {
    logOut() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
          console.log("signed out");
        })
        .catch(err => console.log(err));
    },
    reset() {
      this.$refs.form.reset();
      this.email = "";
      this.password = "";
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.reset();
          this.$router.replace("/panel");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
